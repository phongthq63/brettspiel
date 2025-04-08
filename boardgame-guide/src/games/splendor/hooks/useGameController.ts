import {useThree} from "@react-three/fiber";
import {Action, Card, Gem, Noble, PhysicsObjectAction} from "@/games/splendor/types/game";
import {Euler, MathUtils, Quaternion, Vector3} from "three";
import gsap from "gsap";
import {NobleCardSize} from "@/games/splendor/component/3d/NobleCard";
import {GemCardSize} from "@/games/splendor/component/3d/GemCard";
import {toast} from "react-toastify";
import {CardPosition, GemPosition, NoblePosition, PlayerPosition} from "@/games/splendor/constants/game";
import {GemTokenSize} from "@/games/splendor/component/3d/GemToken";
import {CardDictionary} from "@/games/splendor/constants/card";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {TokenGemType} from "@/games/splendor/types/gem";
import {useSharedRef} from "@/games/splendor/store/ref.context";
import {useUser} from "@/store/user";
import {useGameActions} from "@/games/splendor/hooks/useGameActions";
import {useGameStore} from "@/games/splendor/store/game.store";
import {getPlayerLocate} from "@/games/splendor/utils/game";


export function useGameController() {
    const {camera} = useThree()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {user} = useUser()
    const {gatherGem, buyCard, reserveCard, takeNoble} = useGameActions()
    const {
        status, setStatus,
        playerIds,
        currentPlayer, setCurrentPlayer,
        setNextPlayer,
        deckNoble, setDeckNoble,
        setFieldNoble, removeNobleFieldNoble,
        deckCard, setDeckCard, removeCardDeckCard,
        setFieldCard, removeCardFieldCard,
        gems, setGems, addGem, addGems, removeGem,
        players, setPlayers, setPlayerGems, addPlayerGem, removePlayerGem, removePlayerGems, addPlayerCard, addPlayerReserveCard, removePlayerReserveCard, addPlayerNoble,
        currentAction, setCurrentAction,
        physicsObjectActions, setPhysicsObjectActions,
        isMyTurn,
        dialog, setDialog
    } = useGameStore();


    const rollbackPhysicsObjects = () => {
        const animation = gsap.timeline()
        const timelineReverse = gsap.timeline()

        // Reserve animation action
        {
            physicsObjectActions.reverse()
                .forEach((object: PhysicsObjectAction) => {
                    switch (object.type) {
                        case "noble":
                        case "card":
                            if (object.animation) {
                                timelineReverse.add(gsap.timeline()
                                    .call(() => {
                                        // Stop physics
                                        object.ref.stopPhysics()
                                    })
                                    .add(object.animation.reverse())
                                    .call(() => {
                                        // Start physics
                                        object.ref.startPhysics()
                                    }))
                            }
                            break
                        case "gem":
                        case "gem-player":
                            const instance = gemRefs.current[object.id]
                            const startPosition: Vector3 = instance.position.clone()
                            const targetPosition: [number, number, number] = object.state.position
                            const targetRotation: [number, number, number] = object.state.rotation
                            const arcHeight = 1.5
                            timelineReverse.add(gsap.timeline()
                                .call(() => {
                                    // Stop physics
                                    instance.stopPhysics()
                                })
                                .to(instance.position, {
                                    x: targetPosition[0],
                                    y: targetPosition[1],
                                    duration: 0.3,
                                    onUpdate: function () {
                                        const progress = this.progress() // Progress from 0 → 1
                                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition[2], progress) + arcHeight * Math.sin(progress * Math.PI)
                                    }
                                })
                                .to(instance.rotation, {
                                    x: targetRotation[0],
                                    y: targetRotation[1],
                                    z: targetRotation[2],
                                    duration: 0.3
                                }, "<")
                                .call(() => {
                                    // Start physics
                                    instance.startPhysics()
                                }))
                            break
                    }
                })
        }

        animation
            .add(timelineReverse)
            .call(() => {
                // Update state
                const idTypeCount: Record<string, Record<string, number>> = {};
                physicsObjectActions.forEach(physicsObjectAction => {
                    (idTypeCount[physicsObjectAction.id] ??= {})[physicsObjectAction.type] = (idTypeCount[physicsObjectAction.id][physicsObjectAction.type] || 0) + 1
                })
                const seen = new Set();
                let newStateGems = gems
                let newStatePlayers = players
                physicsObjectActions
                    .filter(physicsObjectAction => {
                        const typeCount = idTypeCount[physicsObjectAction.id];
                        if (typeCount['gem'] === typeCount['gem-player']) {
                            return false
                        }
                        if (seen.has(physicsObjectAction.id)) {
                            return false
                        } else {
                            seen.add(physicsObjectAction.id)
                            return true
                        }
                    })
                    .forEach(physicsObjectAction => {
                        switch (physicsObjectAction.type) {
                            case "gem":
                            {
                                const gem: Gem = physicsObjectAction.state as Gem
                                newStateGems = {
                                    ...newStateGems,
                                    [gem.type]: [
                                        ...newStateGems[gem.type],
                                        {
                                            ...gem,
                                            id: physicsObjectAction.id
                                        }
                                    ],
                                }
                                newStatePlayers = {
                                    ...newStatePlayers,
                                    [currentPlayer]: {
                                        ...newStatePlayers[currentPlayer],
                                        gems: {
                                            ...newStatePlayers[currentPlayer].gems,
                                            [gem.type]: newStatePlayers[currentPlayer].gems[gem.type].filter(gem => gem.id != physicsObjectAction.id)
                                        }
                                    }
                                }
                                break
                            }
                            case "gem-player":
                            {
                                const gem: Gem = physicsObjectAction.state as Gem
                                newStateGems = {
                                    ...newStateGems,
                                    [gem.type]: newStateGems[gem.type].filter(gem => gem.id != physicsObjectAction.id)
                                }
                                newStatePlayers = {
                                    ...newStatePlayers,
                                    [currentPlayer]: ({
                                        ...newStatePlayers[currentPlayer],
                                        gems: {
                                            ...newStatePlayers[currentPlayer].gems,
                                            [gem.type]: [
                                                ...newStatePlayers[currentPlayer].gems[gem.type],
                                                {
                                                    ...gem,
                                                    id: physicsObjectAction.id
                                                }
                                            ]
                                        }
                                    })
                                }
                                break
                            }
                        }
                    })
                setGems(newStateGems)
                setPlayers(newStatePlayers)
                setPhysicsObjectActions([])
            })
    }

    const selectAction = (action: Action) => {
        setCurrentAction(action)
    }

    const cancelAction = () => {
        setCurrentAction(undefined)
        setDialog({
            open: false,
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        })
        rollbackPhysicsObjects()
    }

    const confirmAction = (action: Action) => {
        switch (action.type) {
            case "gather-gem":
                gatherGem(action)
                break
            case "buy-card":
                buyCard(action)
                break
            case "reserve-card":
                reserveCard(action)
                break
            case "take-noble":
                takeNoble(action)
                break
        }
    }

    const onClickNoble = (noble: Noble) => {
        if (currentAction) {
            return
        } else {
            // Update action if in turn
            if (isMyTurn) {
                setCurrentAction({
                    type: "take-noble",
                    noble: {id: noble.id}
                })
            }

            // Animation
            const instance = nobleRefs.current[noble.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
            const targetPosition: Vector3 = camera.position.clone().add(direction) // Calculate position in front of the camera
            const targetRotation: Euler = camera.rotation.clone()
            const animation = gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.3
                })
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.3
                }, "<")
            setPhysicsObjectActions([
                {
                    id: noble.id,
                    type: "noble",
                    ref: instance,
                    animation: animation,
                    state: {
                        ...noble,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                }
            ])

            // Show action board
            if (isMyTurn) {
                setDialog({
                    open: true,
                    position: targetPosition.clone().addScaledVector(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion), NobleCardSize.width / 2 + 0.4).toArray(),
                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                })
            }
        }
    }

    const onClickNotCurrentNoble = (noble: Noble) => {

    }

    const onClickDeckCard = (card: Card) => {
        if (status != 1 || !isMyTurn) return
        if (currentAction) {
            return
        } else {
            setCurrentAction({
                type: "reserve-card",
                card: {
                    id: card.id,
                    level: card.level,
                    deck: true,
                    cost: card.cost
                }
            })

            // Animation
            const instance = cardRefs.current[card.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
            const targetPosition: Vector3 = camera.position.clone().add(direction) // Calculate position in front of the camera
            const cameraQuaternion: Quaternion = camera.quaternion.clone().multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI))
            const targetRotation: Euler = new Euler().setFromQuaternion(cameraQuaternion)
            const animation = gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.3
                })
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.3
                }, "<")
            setPhysicsObjectActions([
                {
                    id: card.id,
                    type: "card",
                    ref: instance,
                    animation: animation,
                    state: {
                        ...card,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                }
            ])

            // Show action board
            const cameraRotation = camera.rotation.clone()
            setDialog({
                open: true,
                position: targetPosition.clone().addScaledVector(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion), GemCardSize.width / 2 + 0.4).toArray(),
                rotation: [cameraRotation.x, cameraRotation.y, cameraRotation.z]
            })
        }
    }

    const onClickCard = (card: Card) => {
        if (currentAction) {
            return
        } else {
            // Update action if in turn
            if (isMyTurn) {
                setCurrentAction({
                    type: "option-action",
                    card: {
                        id: card.id,
                        level: card.level,
                        deck: false,
                        cost: card.cost
                    },
                    option: ["buy-card", "reserve-card"]})
            }

            // Move to front camera
            const instance = cardRefs.current[card.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
            const targetPosition: Vector3 = camera.position.clone().add(direction) // Calculate position in front of the camera
            const targetRotation: Euler = camera.rotation.clone()
            const animation = gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.3
                }, "0.1")
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.3
                }, "<")

            // Save animation
            setPhysicsObjectActions([
                {
                    id: card.id,
                    type: "card",
                    ref: instance,
                    animation: animation,
                    state: {
                        ...card,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                }
            ])

            // Show action board
            if (isMyTurn) {
                setDialog({
                    open: true,
                    position: targetPosition.clone().addScaledVector(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion), GemCardSize.width / 2 + 0.5).toArray(),
                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                })
            }
        }
    }

    const onClickNotCurrentCard = (card: Card) => {

    }

    const onClickGem = (gem: Gem) =>  {
        if (status != 1 || !isMyTurn) return
        if (currentAction && currentAction.type != "gather-gem") {
            return
        } else {
            // Verify rule game
            const tookGems = currentAction?.gem?.filter(tookGem => tookGem.count > 0) || []
            if (tookGems.length >= 3) {
                toast("Can't take more than 3 game in 1 turn", {
                    autoClose: 2000,
                })
                return
            }
            if (tookGems.length == 2 &&
                (tookGems[0].type == tookGems[1].type || tookGems[0].type == gem.type || tookGems[1].type == gem.type)) {
                toast("Only take 2 gem same type or 3 gem different type", {
                    autoClose: 2000,
                })
                return
            }

            //
            const playerLocate = getPlayerLocate(playerIds, currentPlayer)
            if (!playerLocate) {
                // Ko tim thay config vi tri player
                console.log(`Config player is not found - ${playerIds} ${currentPlayer}`)
                return
            }

            //
            const deckGems: Gem[] = gems[gem.type]
            const playerGems: Gem[] = players[currentPlayer].gems[gem.type]
            let tookGem: Gem = deckGems[deckGems.length - 1]
            for (let i = deckGems.length - 1; i >= 0; i--) {
                if (!currentAction?.gem?.some(gem => gem.id == tookGem.id && gem.count > 0)) {
                    break
                }

                tookGem = deckGems[i]
            }
            const gemPosition: Vector3 = new Vector3().fromArray(PlayerPosition[gem.type])

            // Update action if in turn
            setCurrentAction({
                type: "gather-gem",
                gem: [...(currentAction?.gem || []), {
                    id: tookGem.id,
                    type: gem.type,
                    count: 1
                }]
            })

            // Animation
            const instance = gemRefs.current[tookGem.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const playerPosition: Vector3 = new Vector3().fromArray(playerLocate.position)
            const targetPosition: Vector3 = gemPosition
                .add(playerPosition)
                .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
                .setZ((playerGems.length + 0.5) * GemTokenSize.depth)
            const targetRotation = new Euler().setFromQuaternion(new Quaternion().setFromEuler(startRotation)
                .multiply(new Quaternion().setFromEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))))
            const arcHeight = 2 // Adjust this value for a bigger/smaller arc
            gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.4,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                })
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.4,
                }, "<")
                .call(() => {
                    // Start physics
                    instance.startPhysics()
                })
                .call(() => {
                    // Update state
                    removeGem({id: tookGem.id, type: gem.type})
                    addPlayerGem(currentPlayer, {
                        ...gem,
                        id: tookGem.id,
                        position: targetPosition.toArray(),
                        rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                    })
                })
            setPhysicsObjectActions([
                ...physicsObjectActions,
                {
                    id: tookGem.id,
                    type: "gem",
                    ref: instance,
                    state: {
                        ...gem,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                },
            ])

            // Show action board
            if (!dialog.open) {
                const direction = new Vector3()
                camera.getWorldDirection(direction) // Get the camera's forward direction
                direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
                const centerScenePosition: Vector3 = camera.position.clone().add(direction) // Calculate position in front of the camerac
                const cameraRotation: Euler = camera.rotation.clone()
                setDialog({
                    open: true,
                    position: centerScenePosition.toArray(),
                    rotation: [cameraRotation.x, cameraRotation.y, cameraRotation.z]
                })
            }
        }
    }

    const onClickPlayerGem = (playerId: string, gem: Gem) => {
        if (user?.user_id != playerId) return
        if (!isMyTurn) return
        if (currentAction && currentAction.type != "gather-gem") {
            return
        } else {
            //
            const player = (playerIds.indexOf(playerId) ?? 0) + 1
            if (player == 0) return         // Không phải người chơi
            const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player]
            if (!playerLocate) return       // Ko tim thay config vi tri player

            const deckGems: Gem[] = gems[gem.type]
            const playerDeckGems: Gem[] = players[playerId].gems[gem.type]
            const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[gem.type])
            let gemReturn: Gem = playerDeckGems[playerDeckGems.length - 1]
            for (let i = playerDeckGems.length - 1; i >= 0; i--) {
                if (!currentAction?.gem?.some(gem => gem.id == gemReturn.id && gem.count < 0)) {
                    break
                }

                gemReturn = playerDeckGems[i]
            }

            // Update action if in turn
            setCurrentAction({
                type: "gather-gem",
                gem: [...(currentAction?.gem || []), {
                    id: gemReturn.id,
                    type: gem.type,
                    count: -1
                }]
            })

            // Animation
            const instance = gemRefs.current[gemReturn.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const targetPosition: Vector3 = gemPosition
                .setZ((deckGems.length + 0.5) * GemTokenSize.depth)
            const arcHeight = 1.5 // Adjust this value for a bigger/smaller arc
            gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.4,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                })
                .call(() => {
                    // Start physics
                    instance.startPhysics()
                })
                .call(() => {
                    // Update state
                    addGem({
                        ...gem,
                        id: gemReturn.id,
                        position: targetPosition.toArray(),
                        rotation: gemReturn.rotation
                    })
                    removePlayerGem(playerId, {id: gemReturn.id, type: gem.type})
                })
            setPhysicsObjectActions([
                ...physicsObjectActions,
                {
                    id: gemReturn.id,
                    type: "gem-player",
                    ref: instance,
                    state: {
                        ...gem,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                }
            ])

            // Show action board
            if (!dialog.open) {
                const direction = new Vector3()
                camera.getWorldDirection(direction) // Get the camera's forward direction
                direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
                const centerScenePosition = camera.position.clone().add(direction) // Calculate position in front of the camera
                const cameraRotation = camera.rotation.clone()
                setDialog({
                    open: true,
                    position: centerScenePosition.toArray(),
                    rotation: [cameraRotation.x, cameraRotation.y, cameraRotation.z]
                })
            }
        }
    }

    const onClickPlayerReserveCard = (playerId: string, card: Card) => {
        if (user?.user_id != playerId) return
        if (currentAction) {
            return
        } else {
            // Update action if in turn
            if (isMyTurn) {
                setCurrentAction({
                    type: "buy-card",
                    card: {
                        id: card.id,
                        level: card.level,
                        ownerId: playerId,
                        cost: card.cost
                    }
                })
            }

            // Move to front camera
            const instance = cardRefs.current[card.id]
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
            const targetPosition: Vector3 = camera.position.clone().add(direction) // Calculate position in front of the camera
            const targetRotation: Euler = camera.rotation.clone()
            const animation = gsap.timeline()
                .call(() => {
                    // Stop physics
                    instance.stopPhysics()
                })
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.3
                }, "0.1")
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.3
                }, "<")

            // Save animation
            setPhysicsObjectActions([
                {
                    id: card.id,
                    type: "card",
                    ref: instance,
                    animation: animation,
                    state: {
                        ...card,
                        position: startPosition.toArray(),
                        rotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                }
            ])

            // Show action board
            if (isMyTurn) {
                setDialog({
                    open: true,
                    position: targetPosition.clone().addScaledVector(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion), GemCardSize.width / 2 + 0.5).toArray(),
                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                })
            }
        }
    }

    const onStartGame = (data: any) => {
        const fieldCard3 = data.field_card_3.filter((field_card: any) => field_card.card)
            .sort((a: any, b: any) => a.position - b.position)
        const fieldCard2 = data.field_card_2.filter((field_card: any) => field_card.card)
            .sort((a: any, b: any) => a.position - b.position)
        const fieldCard1 = data.field_card_1.filter((field_card: any) => field_card.card)
            .sort((a: any, b: any) => a.position - b.position)
        const fieldNoble = data.field_noble.filter((field_noble: any) => field_noble.noble)
            .sort((a: any, b: any) => a.position - b.position)

        //
        const animation = gsap.timeline()
        const timelineDeckCard3 = gsap.timeline()
        const timelineDeckCard2 = gsap.timeline()
        const timelineDeckCard1 = gsap.timeline()
        const timelineDeckNoble = gsap.timeline()
        const timelineOpenField3 = gsap.timeline()
        const timelineOpenField2 = gsap.timeline()
        const timelineOpenField1 = gsap.timeline()
        const timelineOpenNoble = gsap.timeline()


        const card3Opens: Card[] = fieldCard3.map((field: any) => {
            return {
                ...field.card,
                ...CardDictionary[field.card.id],
                position: CardPosition.level[3].field[field.position],
                rotation: [0, 0, 0]
            }
        })
        const card2Opens: Card[] = fieldCard2.map((field: any) => {
            return {
                ...field.card,
                ...CardDictionary[field.card.id],
                position: CardPosition.level[2].field[field.position],
                rotation: [0, 0, 0]
            }
        })
        const card1Opens: Card[] = fieldCard1.map((field: any) => ({
            ...field.card,
            ...CardDictionary[field.card.id],
            position: CardPosition.level[1].field[field.position],
            rotation: [0, 0, 0]
        }))
        const nobleOpens: Noble[] = fieldNoble.map((field: any) => {
            return {
                ...field.noble,
                ...NobleDictionary[field.noble.id],
                position: NoblePosition.field[field.position],
                rotation: [0, 0, 0]
            }
        })

        // Animation description
        {
            // Timeline shuffle deck card 3
            {
                deckCard[3]?.forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];
                    const height = 0.8
                    timelineDeckCard3.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + CardPosition.level[card.level].desk[2],
                            duration: 0.35
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + ((deckCard[3].length - 1) / 2 - index * 2) * GemCardSize.depth,
                            duration: 0.2
                        })
                        .to(instance.rotation, {
                            y: Math.PI,
                            duration: 0.2
                        }, "<")
                        .to(instance.position, {
                            z: (deckCard[3].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2],
                            duration: 0.25
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }), 0)
                })
                timelineDeckCard3
                    .call(() => {
                        // Update new position + rotation
                        (fieldCard3
                            .map((cardOpen: any) => deckCard[3].find((card: Card) => card.id == cardOpen.card.id))
                            .concat(deckCard[3].filter((card: Card) => !fieldCard3.some((cardOpen: any) => card.id == cardOpen.card.id)))
                            .map((card: Card, index: number) => ({
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[3].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            })) as Card[])
                            .forEach((card) => {
                                cardRefs.current[card.id].setPosition(card.position)
                                cardRefs.current[card.id].setRotation(card.rotation)
                            })
                    })
            }
            // Timeline shuffle deck card 2
            {
                deckCard[2].forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];
                    const height = 0.8
                    timelineDeckCard2.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + CardPosition.level[card.level].desk[2],
                            duration: 0.35
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + ((deckCard[2].length - 1) / 2 - index * 2) * GemCardSize.depth,
                            duration: 0.2
                        })
                        .to(instance.rotation, {
                            y: Math.PI,
                            duration: 0.2
                        }, "<")
                        .to(instance.position, {
                            z: (deckCard[2].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2],
                            duration: 0.25
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }), 0)
                });
                timelineDeckCard2.call(() => {
                    // Update new position + rotation
                    (fieldCard2
                        .map((cardOpen: any) => deckCard[2].find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard[2].filter((card: Card) => !fieldCard2.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: any) => ({
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[2].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        })) as Card[])
                        .forEach((card) => {
                            cardRefs.current[card.id].setPosition(card.position)
                            cardRefs.current[card.id].setRotation(card.rotation)
                        })
                })
            }
            // Timeline shuffle deck card 1
            {
                deckCard[1].forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];
                    const height = 0.8
                    timelineDeckCard1.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + CardPosition.level[card.level].desk[2],
                            duration: 0.35
                        })
                        .to(instance.position, {
                            z: index * GemCardSize.depth + height + ((deckCard[1].length - 1) / 2 - index * 2) * GemCardSize.depth,
                            duration: 0.2
                        })
                        .to(instance.rotation, {
                            y: Math.PI,
                            duration: 0.2
                        }, "<")
                        .to(instance.position, {
                            z: (deckCard[1].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2],
                            duration: 0.25
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }), 0)
                });
                timelineDeckCard1.call(() => {
                    // Update new position + rotation
                    (fieldCard1
                        .map((cardOpen: any) => deckCard[1].find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard[1].filter((card: Card) => !fieldCard1.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[1].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Card[])
                        .forEach((card) => {
                            cardRefs.current[card.id].setPosition(card.position)
                            cardRefs.current[card.id].setRotation(card.rotation)
                        })
                })
            }
            // Timeline shuffle deck noble
            {
                deckNoble.forEach((noble: Noble, index: number) => {
                    const instance = nobleRefs.current[noble.id];
                    const height = 0.8
                    timelineDeckNoble.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            z: index * NobleCardSize.depth + height + NoblePosition.desk[2],
                            duration: 0.35
                        })
                        .to(instance.position, {
                            z: index * NobleCardSize.depth + height + ((deckNoble.length - 1) / 2 - index * 2) * NobleCardSize.depth,
                            duration: 0.2
                        })
                        .to(instance.rotation, {
                            y: Math.PI,
                            duration: 0.2
                        }, "<")
                        .to(instance.position, {
                            z: (deckNoble.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2],
                            duration: 0.25
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }), 0)
                });
                timelineDeckNoble.call(() => {
                    // Update new position + rotation
                    (fieldNoble
                        .map((nobleOpen: any) => deckNoble.find((noble: Noble) => noble.id == nobleOpen.noble.id))
                        .concat(deckNoble.filter((noble: Noble) => !fieldNoble.some((nobleOpen: any) => noble.id == nobleOpen.noble.id)))
                        .map((noble: Noble, index: number) => {
                            return {
                                ...noble,
                                position: [NoblePosition.desk[0], NoblePosition.desk[1], (deckNoble.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Noble[])
                        .forEach((noble) => {
                            nobleRefs.current[noble.id].setPosition(noble.position)
                            nobleRefs.current[noble.id].setRotation(noble.rotation)
                        })
                })
            }
            // Timeline open card 3
            {
                fieldCard3.forEach((field: any) => {
                    const instance = cardRefs.current[field.card.id]
                    const startPosition = instance.position
                    const targetPosition = CardPosition.level[3].field[field.position]
                    const arcHeight = 0.4
                    timelineOpenField3.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: function () {
                                const progress = this.progress() // Progress from 0 → 1
                                instance.position.z = MathUtils.lerp(startPosition.z, targetPosition[2], progress) + arcHeight * Math.sin(progress * Math.PI)
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            z: targetPosition[2],
                            duration: 0.1,
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }))
                })
                timelineOpenField3.call(() => {
                    // Update new position + rotation
                    card3Opens.forEach((card) => {
                        cardRefs.current[card.id].setPosition(card.position)
                        cardRefs.current[card.id].setRotation(card.rotation)
                    })
                })
            }
            // Timeline open card 2
            {
                fieldCard2.forEach((field: any) => {
                    const instance = cardRefs.current[field.card.id]
                    const startPosition = instance.position
                    const targetPosition = CardPosition.level[2].field[field.position]
                    const arcHeight = 0.4
                    timelineOpenField2.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: function () {
                                const progress = this.progress() // Progress from 0 → 1
                                instance.position.z = MathUtils.lerp(startPosition.z, targetPosition[2], progress) + arcHeight * Math.sin(progress * Math.PI)
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            z: targetPosition[2],
                            duration: 0.1,
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }))
                })
                timelineOpenField2.call(() => {
                    // Update new position + rotation
                    card2Opens.forEach((card) => {
                        cardRefs.current[card.id].setPosition(card.position)
                        cardRefs.current[card.id].setRotation(card.rotation)
                    })
                })
            }
            // Timeline open card 1
            {
                fieldCard1.forEach((field: any) => {
                    const instance = cardRefs.current[field.card.id]
                    const startPosition = instance.position
                    const targetPosition = CardPosition.level[1].field[field.position]
                    const arcHeight = 0.4
                    timelineOpenField1.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: function () {
                                const progress = this.progress() // Progress from 0 → 1
                                instance.position.z = MathUtils.lerp(startPosition.z, targetPosition[2], progress) + arcHeight * Math.sin(progress * Math.PI)
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            z: targetPosition[2],
                            duration: 0.1,
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }))
                })
                timelineOpenField1.call(() => {
                    // Update new position + rotation
                    card1Opens.forEach((card) => {
                        cardRefs.current[card.id].setPosition(card.position)
                        cardRefs.current[card.id].setRotation(card.rotation)
                    })
                })
            }
            // Timeline open noble
            {
                fieldNoble.forEach((field: any) => {
                    const instance = nobleRefs.current[field.noble.id]
                    const startPosition = instance.position
                    const targetPosition = NoblePosition.field[field.position];
                    const arcHeight = 0.4
                    timelineOpenNoble.add(gsap.timeline()
                        .call(() => {
                            // Stop physics
                            instance.stopPhysics()
                        })
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: function() {
                                const progress = this.progress() // Progress from 0 → 1
                                instance.position.z = MathUtils.lerp(startPosition.z, targetPosition[2], progress) + arcHeight * Math.sin(progress * Math.PI)
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: targetPosition[0],
                            y: targetPosition[1],
                            z: targetPosition[2],
                            duration: 0.1,
                        })
                        .call(() => {
                            // Start physics
                            instance.startPhysics()
                        }))
                })
                timelineOpenNoble.call(() => {
                    // Update new position + rotation
                    nobleOpens.forEach((noble) => {
                        nobleRefs.current[noble.id].setPosition(noble.position)
                        nobleRefs.current[noble.id].setRotation(noble.rotation)
                    })
                })
            }
        }

        animation
            .add(timelineDeckCard3)
            .add(timelineDeckCard2, "<")
            .add(timelineDeckCard1, "<")
            .add(timelineDeckNoble, "<")
            .add(timelineOpenField3, ">1")
            .add(timelineOpenField2)
            .add(timelineOpenField1)
            .add(timelineOpenNoble)
            .call(() => {
                // Save state
                const newDeckCard1 = deckCard[1].filter((card: Card) => !fieldCard1.some((field: any) => card.id == field.card.id))
                const newDeckCard2 = deckCard[2].filter((card: Card) => !fieldCard2.some((field: any) => card.id == field.card.id))
                const newDeckCard3 = deckCard[3].filter((card: Card) => !fieldCard3.some((field: any) => card.id == field.card.id))
                setDeckCard({
                    [1]: newDeckCard1.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeckCard1.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    }),
                    [2]: newDeckCard2.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeckCard2.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    }),
                    [3]: newDeckCard3.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeckCard3.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setFieldCard({
                    [3]: card3Opens,
                    [2]: card2Opens,
                    [1]: card1Opens,
                })
                // Noble
                const newDeckNoble = deckNoble.filter((noble: Noble) => !fieldNoble.some((field: any) => noble.id == field.noble.id))
                setDeckNoble(newDeckNoble.map((noble: Noble, index: number) => {
                    return {
                        ...noble,
                        position: [NoblePosition.desk[0], NoblePosition.desk[1], (newDeckNoble.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2]],
                        rotation: [0, Math.PI, 0]
                    }
                }))
                setFieldNoble(nobleOpens)

                //
                setStatus(data.status)
                setCurrentPlayer(data.current_player)
                setNextPlayer(data.next_player)
            })
    }

    const onTurnEnd = (data: any) => {
        setCurrentPlayer(data.current_player)
        setNextPlayer(data.next_player)
    }

    const onPlayerGatherGem = (data: any) => {
        const currentPlayer: string = data.current_player
        const goldCount: number = data.gold
        const onyxCount: number = data.onyx
        const rubyCount: number = data.ruby
        const emeraldCount: number = data.emerald
        const sapphireCount: number = data.sapphire
        const diamondCount: number = data.diamond

        const playerLocate = getPlayerLocate(playerIds, currentPlayer)
        if (!playerLocate) {
            // Ko tim thay config vi tri player
            console.log(`Config player is not found - ${playerIds} ${currentPlayer}`)
            return
        }

        // Clear action + disable dialog
        if (isMyTurn) {
            setCurrentAction(undefined)
            setPhysicsObjectActions([])
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })
        }

        const timelineGems = gsap.timeline()
        let newGems = {...gems}
        let newPlayerGems = {...players[currentPlayer].gems}
        {
            function takeGem(tookGem: Gem) {
                const playerDeckGems: Gem[] = players[currentPlayer].gems[tookGem.type]
                const gemPosition: Vector3 = new Vector3().fromArray(PlayerPosition[tookGem.type])

                // Animation
                const instance = gemRefs.current[tookGem.id]
                const startPosition: Vector3 = instance.position.clone()
                const playerPosition = new Vector3().fromArray(playerLocate?.position as [number, number, number])
                const targetPosition = gemPosition
                    .add(playerPosition)
                    .applyEuler(new Euler(playerLocate?.rotation[0], playerLocate?.rotation[1], playerLocate?.rotation[2]))
                    .setZ((playerDeckGems.length - 1 + 0.5) * GemTokenSize.depth)
                const arcHeight = 1.5 // Adjust this value for a bigger/smaller arc
                return gsap.timeline()
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.4,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .call(() => {
                        // Start physics
                        instance.startPhysics()

                        //
                        newGems = {
                            ...newGems,
                            [tookGem.type]: newGems[tookGem.type].filter(typeGem => typeGem.id != tookGem.id)
                        }
                        newPlayerGems = {
                            ...newPlayerGems,
                            [tookGem.type]: [
                                ...newPlayerGems[tookGem.type],
                                {
                                    ...tookGem,
                                    position: targetPosition.toArray(),
                                    rotation: tookGem.rotation
                                }
                            ],
                        }
                    })
            }
            function returnGem(returnGem: Gem) {
                const deckGems: Gem[] = gems[returnGem.type]
                const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[returnGem.type])

                // Animation
                const instance = gemRefs.current[returnGem.id]
                const startPosition = instance.position.clone()
                const targetPosition = gemPosition
                    .setZ((deckGems.length - 1 + 0.5) * GemTokenSize.depth)
                const arcHeight = 2 // Adjust this value for a bigger/smaller arc
                return gsap.timeline()
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.4,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .call(() => {
                        // Start physics
                        instance.startPhysics()

                        //
                        newGems = {
                            ...newGems,
                            [returnGem.type]: [
                                ...newGems[returnGem.type],
                                {
                                    ...returnGem,
                                    position: targetPosition.toArray(),
                                    rotation: returnGem.rotation
                                }
                            ]
                        }
                        newPlayerGems = {
                            ...newPlayerGems,
                            [returnGem.type]: newPlayerGems[returnGem.type].filter(typeGem => typeGem.id != returnGem.id)
                        }
                    })
            }
            function takeGems(type: TokenGemType, total: number) {
                const deckGems: Gem[] = gems[type]
                let indexDeckGem
                for (let i = 0; i < total; i++) {
                    indexDeckGem = deckGems.length - 1 - i
                    if (indexDeckGem < 0) {
                        break
                    }

                    timelineGems.add(takeGem(deckGems[indexDeckGem]))
                }
            }
            function returnGems(type: TokenGemType, total: number) {
                const playerDeckGems: Gem[] = players[currentPlayer].gems[type]
                let indexDeckGem
                for (let i = 0; i < total; i++) {
                    indexDeckGem = playerDeckGems.length - 1 - i
                    if (indexDeckGem < 0) {
                        break
                    }

                    timelineGems.add(returnGem(playerDeckGems[indexDeckGem]))
                }
            }

            //
            if (goldCount < 0) {
                returnGems(TokenGemType.GOLD, goldCount * -1)
            }
            if (onyxCount > 0) {
                takeGems(TokenGemType.ONYX, onyxCount)
            } else if (onyxCount < 0) {
                returnGems(TokenGemType.ONYX, onyxCount * -1)
            }
            if (rubyCount > 0) {
                takeGems(TokenGemType.RUBY, rubyCount)
            } else if (rubyCount < 0) {
                returnGems(TokenGemType.RUBY, rubyCount * -1)
            }
            if (emeraldCount > 0) {
                takeGems(TokenGemType.EMERALD, emeraldCount)
            } else if (emeraldCount < 0) {
                returnGems(TokenGemType.EMERALD, emeraldCount * -1)
            }
            if (sapphireCount > 0) {
                takeGems(TokenGemType.SAPPHIRE, sapphireCount)
            } else if (sapphireCount < 0) {
                returnGems(TokenGemType.SAPPHIRE, sapphireCount * -1)
            }
            if (diamondCount > 0) {
                takeGems(TokenGemType.DIAMOND, diamondCount)
            } else if (diamondCount < 0) {
                returnGems(TokenGemType.DIAMOND, diamondCount * -1)
            }
        }

        gsap.timeline()
            .add(timelineGems)
            .call(() => {
                // Update state
                setGems(newGems)
                setPlayerGems(currentPlayer, newPlayerGems)
            })
    }

    const onPlayerBuyCard = (data: any) => {
        const currentPlayer = data.current_player
        const cardId = data.card_id
        const goldCount: number = data.gold
        const onyxCount: number = data.onyx
        const rubyCount: number = data.ruby
        const emeraldCount: number = data.emerald
        const sapphireCount: number = data.sapphire
        const diamondCount: number = data.diamond

        const playerLocate = getPlayerLocate(playerIds, currentPlayer)
        if (!playerLocate) {
            // Ko tim thay config vi tri player
            console.log(`Config player is not found - ${playerIds} ${currentPlayer}`)
            return
        }

        const cardConfig = CardDictionary[cardId]
        if (!cardConfig) {
            console.log(`Card config ${cardId} not found`)
            return
        }
        if (!PlayerPosition[cardConfig.type]) {
            console.log(`Player card position config ${cardConfig.type} not found`)
            return
        }
        // Clear action + disable dialog
        if (isMyTurn) {
            setCurrentAction(undefined)
            setPhysicsObjectActions([])
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })
        }

        const cards: Card[] = players[currentPlayer].cards[cardConfig.type]
        const cardPosition: Vector3 = new Vector3().fromArray(PlayerPosition[cardConfig.type])

        // Animation
        const instanceCard = cardRefs.current[cardId]
        const startPosition: Vector3 = instanceCard.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = cardPosition.clone()
            .setY(cardPosition.y + cards.length * PlayerPosition.distance)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ(0.5 * GemCardSize.depth)
        const targetRotation: [number, number, number] = [0, 0, 0]
        const targetSlidePosition = cardPosition.clone()
            .setY(cardPosition.y + cards.length * PlayerPosition.distance + GemCardSize.height)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ(0.5 * GemCardSize.depth)
        const timelineHoldUp = gsap.timeline()
        const timelineCard = gsap.timeline()
        const timelineGems = gsap.timeline()

        // Animation hold up
        {
            const playerGems: Gem[] = players[currentPlayer].gems[cardConfig.type]

            let instanceHoldUp = undefined
            if (cards.length > 0) {
                instanceHoldUp = cardRefs.current[cards[cards.length - 1].id]
            } else if (playerGems.length > 0) {
                instanceHoldUp = gemRefs.current[playerGems[0].id]
            }

            if (instanceHoldUp) {
                timelineHoldUp
                    .call(() => {
                        // Stop physics
                        instanceHoldUp.stopPhysics()
                    })
                    .to(instanceHoldUp.position, {
                        z: 0.2,
                        duration: 0.7
                    })
                    .call(() => {
                        // Start physics
                        instanceHoldUp.startPhysics()
                    })
            }
        }

        // Animation card
        {
            if (isMyTurn) {
                timelineCard
                    .call(() => {
                        // Stop physics
                        instanceCard.stopPhysics()
                    })
                    .to(instanceCard.position, {
                        x: targetSlidePosition.x,
                        y: targetSlidePosition.y,
                        z: targetSlidePosition.z,
                        duration: 0.5
                    }, "0.1")
                    .to(instanceCard.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.4
                    }, "<")
                    .to(instanceCard.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        z: targetPosition.z,
                        duration: 0.2,
                    })
                    .call(() => {
                        // Start physics
                        instanceCard.startPhysics()
                    })
            } else {
                const arcHeight = 1 // Adjust this value for a bigger/smaller arc
                timelineCard
                    .call(() => {
                        // Stop physics
                        instanceCard.stopPhysics()
                    })
                    .to(instanceCard.position, {
                        x: targetSlidePosition.x,
                        y: targetSlidePosition.y,
                        duration: 0.5,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instanceCard.position.z = MathUtils.lerp(startPosition.z, targetSlidePosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    }, "0.1")
                    .to(instanceCard.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.4
                    }, "<")
                    .to(instanceCard.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        z: targetPosition.z,
                        duration: 0.2,
                    })
                    .call(() => {
                        // Start physics
                        instanceCard.startPhysics()
                    })
            }

        }

        // Animation gem
        const returnedGems: Gem[] = []
        {
            function returnGem(returnGem: Gem) {
                const playerGems: Gem[] = players[currentPlayer].gems[returnGem.type]
                const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[returnGem.type])
                const instance = gemRefs.current[returnGem.id]

                // Animation
                const startPosition = instance.position.clone()
                const targetPosition = gemPosition
                    .setZ((playerGems.length - 1 + 0.5) * GemTokenSize.depth)
                const arcHeight = 2 // Adjust this value for a bigger/smaller arc

                return gsap.timeline()
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.4,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .call(() => {
                        // Start physics
                        instance.startPhysics()

                        //
                        returnedGems.push({
                            ...returnGem,
                            position: targetPosition.toArray(),
                            rotation: returnGem.rotation
                        })
                    })
            }
            function returnGems(type: TokenGemType, total: number) {
                const playerDeckGems: Gem[] = players[currentPlayer].gems[type]
                let indexDeckGem
                for (let i = 0; i < total; i++) {
                    indexDeckGem = playerDeckGems.length - 1 - i
                    if (indexDeckGem < 0) {
                        break
                    }
                    timelineGems.add(returnGem(playerDeckGems[indexDeckGem]))
                }
            }

            if (goldCount < 0) {
                returnGems(TokenGemType.GOLD, goldCount * -1)
            }
            if (onyxCount < 0) {
                returnGems(TokenGemType.ONYX, onyxCount * -1)
            }
            if (rubyCount < 0) {
                returnGems(TokenGemType.RUBY, rubyCount * -1)
            }
            if (emeraldCount < 0) {
                returnGems(TokenGemType.EMERALD, emeraldCount * -1)
            }
            if (sapphireCount < 0) {
                returnGems(TokenGemType.SAPPHIRE, sapphireCount * -1)
            }
            if (diamondCount < 0) {
                returnGems(TokenGemType.DIAMOND, diamondCount * -1)
            }
        }

        gsap.timeline()
            .add(timelineHoldUp)
            .add(timelineCard)
            .add(timelineGems)
            .call(() => {
                // Update state
                addPlayerCard(currentPlayer, {
                    ...cardConfig,
                    id: cardId,
                    position: targetPosition.toArray(),
                    rotation: targetRotation
                })

                if (players[currentPlayer].reserveCards.some(card => card.id == cardId)) {
                    removePlayerReserveCard(currentPlayer, cardId)
                } else {
                    removeCardFieldCard({id: cardId, level: cardConfig.level})
                }

                addGems(returnedGems)
                removePlayerGems(currentPlayer, returnedGems)
            })
    }

    const onPlayerReserveCard = (data: any) => {
        const cardId = data.card_id
        const currentPlayer = data.current_player
        const playerLocate = getPlayerLocate(playerIds, currentPlayer)
        if (!playerLocate) {
            // Ko tim thay config vi tri player
            console.log(`Config player is not found - ${playerIds} ${currentPlayer}`)
            return
        }

        // Clear action + disable dialog
        if (isMyTurn) {
            setCurrentAction(undefined)
            setPhysicsObjectActions([])
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })
        }

        // Animation
        const reserveCards: Card[] = players[currentPlayer].reserveCards
        const cardPosition: Vector3 = new Vector3().fromArray(PlayerPosition.reserveCard)
        const instance = cardRefs.current[cardId]
        const startPosition: Vector3 = instance.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = cardPosition.clone()
            .setX(cardPosition.x + reserveCards.length * (GemCardSize.width + 0.1))
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ((0.5 + 1 + reserveCards.length) * GemCardSize.depth)
        const targetRotation: [number, number, number] = [0, Math.PI, 0]
        const timeline = gsap.timeline()
        {
            if (isMyTurn) {
                timeline
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        z: targetPosition.z,
                        duration: 0.5,
                    })
                    .to(instance.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.5
                    }, "<")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()
                    })
            } else {
                const arcHeight = 1 // Adjust this value for a bigger/smaller arc
                timeline
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.5,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .to(instance.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.5
                    }, "<")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()
                    })
            }
        }

        gsap.timeline()
            .add(timeline)
            .call(() => {
                // Update state
                const cardConfig = CardDictionary[cardId]
                addPlayerReserveCard(currentPlayer, {
                    ...cardConfig,
                    id: cardId,
                    position: targetPosition.toArray(),
                    rotation: targetRotation
                })
                removeCardDeckCard({id: cardId, level: cardConfig.level})
                removeCardFieldCard({id: cardId, level: cardConfig.level})
            })
    }

    const onPlayerTakeNoble = (data: any) => {
        const nobleId = data.noble_id
        const currentPlayer = data.current_player
        const playerLocate = getPlayerLocate(playerIds, currentPlayer)
        if (!playerLocate) {
            // Ko tim thay config vi tri player
            console.log(`Config player is not found - ${playerIds} ${currentPlayer}`)
            return
        }

        // Clear action + disable dialog
        if (isMyTurn) {
            setCurrentAction(undefined)
            setPhysicsObjectActions([])
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })
        }

        // Animation
        const nobles: Noble[] = players[currentPlayer].nobles
        const noblePosition: Vector3 = new Vector3().fromArray(PlayerPosition.noble)
        const instance = nobleRefs.current[nobleId]
        const startPosition: Vector3 = instance.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = noblePosition.clone()
            .setX(noblePosition.x + nobles.length * PlayerPosition.distance)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ((0.5 + 1 + nobles.length) * GemCardSize.depth)
        const targetRotation: [number, number, number] = [0, 0, 0]
        const timeline = gsap.timeline()
        {
            if (isMyTurn) {
                timeline
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        z: targetPosition.z,
                        duration: 0.5,
                    })
                    .to(instance.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.5
                    }, "<")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()
                    })
            } else {
                const arcHeight = 1 // Adjust this value for a bigger/smaller arc
                timeline
                    .call(() => {
                        // Stop physics
                        instance.stopPhysics()
                    })
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.5,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .to(instance.rotation, {
                        x: targetRotation[0],
                        y: targetRotation[1],
                        z: targetRotation[2],
                        duration: 0.5
                    }, "<")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()
                    })
            }
        }

        gsap.timeline()
            .add(timeline)
            .call(() => {
                // Update state
                addPlayerNoble(currentPlayer, {
                    ...NobleDictionary[nobleId],
                    id: nobleId,
                    position: targetPosition.toArray(),
                    rotation: targetRotation
                })
                removeNobleFieldNoble(nobleId)
            })
    }

    return {
        selectAction,
        cancelAction,
        confirmAction,
        onClickNoble,
        onClickNotCurrentNoble,
        onClickDeckCard,
        onClickCard,
        onClickNotCurrentCard,
        onClickGem,
        onClickPlayerGem,
        onClickPlayerReserveCard,
        onStartGame,
        onTurnEnd,
        onPlayerGatherGem,
        onPlayerBuyCard,
        onPlayerReserveCard,
        onPlayerTakeNoble,
    }
}