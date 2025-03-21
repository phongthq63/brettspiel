import {useThree} from "@react-three/fiber";
import {Action, Card, Gem, Noble} from "@/games/splendor/types/game";
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
import {GameService} from "@/games/splendor/service/splendor.service";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSharedRef} from "@/games/splendor/store/ref";
import {useUser} from "@/store/user";

export function useGameController() {
    const {camera} = useThree()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {user} = useUser()
    const {
        gameId,
        status, setStatus,
        playerIds,
        currentPlayer, setCurrentPlayer,
        setNextPlayer,
        deckNoble, setDeckNoble,
        setFieldNoble,
        deckCard, setDeckCard,
        setFieldCard,
        gems, setGems,
        playerNobles, setPlayerNobles,
        playerCards, setPlayerCards,
        playerReserveCards, setPlayerReserveCards,
        playerGems, setPlayerGems,
        currentAction, setCurrentAction,
        focusObjects, addFocusObjects, removeFocusObjects,
        isMyTurn,
        dialog, setDialog
    } = useGameSplendor()


    const selectAction = (action: Action) => {
        setCurrentAction(action)
    }

    const cancelAction = () => {
        setDialog({
            open: false,
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        })
        setCurrentAction(undefined)
    }

    const confirmAction = (action: Action) => {
        const startActionGatherGem = (data: Action) => {
            const {
                gold = 0,
                onyx = 0,
                ruby = 0,
                emerald = 0,
                sapphire = 0,
                diamond = 0
            } = data.gem?.reduce((dict: any, { type, count }) => {
                dict[type] = (dict[type] || 0) + count;
                return dict
            }, {})
            GameService.turnActionGatherGem({
                gameId: gameId,
                body: {
                    gold: gold,
                    onyx: onyx,
                    ruby: ruby,
                    emerald: emerald,
                    sapphire: sapphire,
                    diamond: diamond
                }
            }).then(response => {
                if (response.code != 0) {
                    toast(response.msg, {
                        autoClose: 2000,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }
        const startActionBuyCard = (data: Action) => {
            GameService.turnActionBuyCard({
                gameId: gameId,
                body: {
                    card_id: data.card?.id,
                    ...(data.card?.cost ? Object.fromEntries(Object.entries(data.card.cost).map(([key, value]) => [key, value * -1])) : {})
                }
            }).then(response => {
                if (response.code != 0) {
                    toast(response.msg, {
                        autoClose: 2000,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }
        const startActionReserveCard = (data: Action) => {
            let gold = 0;
            data.gem?.forEach((gem) => {
                switch (gem.type) {
                    case TokenGemType.GOLD:
                        gold += gem.count;
                        break;
                }
            })
            GameService.turnActionReserveCard({
                gameId: gameId,
                body: {
                    desk1: data.card?.deck && data.card.level == 1 ? 1 : 0,
                    desk2: data.card?.deck && data.card.level == 2 ? 1 : 0,
                    desk3: data.card?.deck && data.card.level == 3 ? 1 : 0,
                    card_id: data.card?.deck ? undefined : data.card?.id,
                    gold: gold,
                }
            }).then(response => {
                if (response.code == 0) {
                    console.log(response)
                } else {
                    toast(response.msg, {
                        autoClose: 2000,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }
        const startActionTakeNoble = (data: Action) => {
            GameService.turnBonusActionTakeNoble({
                gameId: gameId,
                body: {
                    noble_id: data.noble?.id,
                }
            }).then(response => {
                if (response.code == 0) {
                    console.log(response)
                } else {
                    toast(response.msg, {
                        autoClose: 2000,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }

        switch (action.type) {
            case "gather-gem":
                startActionGatherGem(action)
                break
            case "buy-card":
                startActionBuyCard(action)
                break
            case "reserve-card":
                startActionReserveCard(action)
                break
            case "take-noble":
                startActionTakeNoble(action)
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

            //
            const instance = nobleRefs.current[noble.id]

            // Stop physics
            instance.stopPhysics()

            // Animation
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
            const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
            const targetRotation = camera.rotation.clone()
            const animation = gsap.timeline()
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
            addFocusObjects({
                id: noble.id,
                type: "noble",
                noble: {
                    ref: instance,
                    animation: animation
                }
            })

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

            //
            const instance = cardRefs.current[card.id]

            // Stop physics
            instance.stopPhysics()

            // Animation
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
            const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
            const cameraQuaternion = camera.quaternion.clone().multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI))
            const targetRotation = new Euler().setFromQuaternion(cameraQuaternion)
            const animation = gsap.timeline()
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
            addFocusObjects({
                id: card.id,
                type: "card",
                card: {
                    ref: instance,
                    animation: animation
                }
            })

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

            //
            const instance = cardRefs.current[card.id]

            // Stop physics
            instance.stopPhysics()

            // Move to front camera
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
            const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
            const targetRotation = camera.rotation.clone()
            const animation = gsap.timeline()
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
            addFocusObjects({
                id: card.id,
                type: "card",
                card: {
                    ref: instance,
                    animation: animation
                }
            })

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

    const onClickGem = (gem: Gem) =>  {
        if (status != 1 || !isMyTurn) return
        if (currentAction && currentAction.type != "gather-gem") {
            return
        } else {
            // Verify rule game
            const gemsTake = currentAction?.gem?.filter(gem => gem.count > 0) || []
            if (gemsTake.length >= 3) {
                toast("Can't take 3 game in 1 turn", {
                    autoClose: 2000,
                })
                return
            }
            if (gemsTake.length == 2 && (gemsTake[0].type == gemsTake[1].type || gemsTake[0].type == gem.type || gemsTake[1].type == gem.type)) {
                toast("Only take 2 gem same type or 3 gem different type", {
                    autoClose: 2000,
                })
                return
            }

            //
            const player = playerIds.indexOf(currentPlayer)
            if (player < 0) return         // Không phải người chơi
            const playerLocate = PlayerPosition.total[playerIds.length]?.player[player + 1]
            if (!playerLocate) return       // Ko tim thay config vi tri player

            //
            const deckGems: Gem[] = gems[gem.type]
            const playerDeckGems: Gem[] = playerGems[currentPlayer][gem.type]
            if (deckGems.length <= 0) return
            let gemTake: Gem = deckGems[deckGems.length - 1]
            for (let i = deckGems.length - 1; i >= 0; i--) {
                if (!currentAction?.gem?.some(gem => gem.id == gemTake.id && gem.count > 0)) {
                    break
                }

                gemTake = deckGems[i]
            }
            if (!PlayerPosition[gem.type]) return
            const gemPosition: Vector3 = new Vector3().fromArray(PlayerPosition[gem.type])

            // Update action if in turn
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: [...(prevState?.gem || []), {
                    id: gemTake.id,
                    type: gem.type,
                    count: 1
                }]
            }))

            const instance = gemRefs.current[gemTake.id]

            // Stop physics
            instance.stopPhysics()

            // Animation
            const startPosition: Vector3 = instance.position.clone()
            const startRotation: Euler = instance.rotation.clone()
            const playerPosition = new Vector3().fromArray(playerLocate.position)
            const targetPosition = gemPosition
                .add(playerPosition)
                .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
                .setZ((playerDeckGems.length - 1 + 0.5) * GemTokenSize.depth)
            const targetRotation = new Euler().setFromQuaternion(new Quaternion().setFromEuler(startRotation)
                .multiply(new Quaternion().setFromEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))))
            const arcHeight = 2 // Adjust this value for a bigger/smaller arc
            const animation = gsap.timeline()
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.4,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                }, "0.1")
                .to(instance.rotation, {
                    x: targetRotation.x,
                    y: targetRotation.y,
                    z: targetRotation.z,
                    duration: 0.4,
                }, "<")
            animation
                .then(() => {
                    // Start physics
                    instance.startPhysics()

                    // Update state
                    setGems((prevState) => ({
                        ...prevState,
                        [gem.type]: prevState[gem.type].filter(gem => gem.id != gemTake.id)
                    }))
                    setPlayerGems((prevState) => {
                        const gems: Gem[] = prevState[currentPlayer][gem.type]
                        gems.push({
                            ...gem,
                            id: gemTake.id,
                            position: targetPosition.toArray(),
                            rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                        })

                        return {
                            ...prevState,
                            [currentPlayer]: ({
                                ...prevState[currentPlayer],
                                [gem.type]: gems.map((gem, index) => ({
                                    ...gem,
                                    position: [gem.position[0], gem.position[1], (index + 0.5) * GemTokenSize.depth],
                                }))
                            })
                        }
                    })
                })
            if (focusObjects.some(focusObject => focusObject.id == gemTake.id)) {
                removeFocusObjects(gemTake.id)
            } else {
                addFocusObjects({
                    id: gemTake.id,
                    type: "gem",
                    gem: {
                        type: gem.type,
                        oldPosition: startPosition.toArray(),
                        oldRotation: [startRotation.x, startRotation.y, startRotation.z]
                    }
                })
            }

            // Show action board
            if (!dialog.open) {
                const direction = new Vector3()
                camera.getWorldDirection(direction) // Get the camera's forward direction
                direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
                const centerScenePosition = camera.position.clone().add(direction) // Calculate position in front of the camerac
                const cameraRotation = camera.rotation.clone()
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
        if (currentAction && currentAction.type != "gather-gem") return

        //
        const player = (playerIds.indexOf(playerId) ?? 0) + 1
        if (player == 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const deckGems: Gem[] = gems[gem.type]
        const playerDeckGems: Gem[] = playerGems[playerId][gem.type]
        const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[gem.type])
        if (playerDeckGems.length <= 0) return
        let gemReturn: Gem = playerDeckGems[playerDeckGems.length - 1]
        for (let i = playerDeckGems.length - 1; i >= 0; i--) {
            if (!currentAction?.gem?.some(gem => gem.id == gemReturn.id && gem.count < 0)) {
                break
            }

            gemReturn = playerDeckGems[i]
        }

        // Update action if in turn
        setCurrentAction((prevState) => ({
            type: "gather-gem",
            gem: [...(prevState?.gem || []), {
                id: gemReturn.id,
                type: gem.type,
                count: -1
            }]
        }))

        const instance = gemRefs.current[gemReturn.id]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition = instance.position.clone()
        const startRotation = instance.rotation.clone()
        const targetPosition = gemPosition
            .setZ((deckGems.length - 1 + 0.5) * GemTokenSize.depth)
        const arcHeight = 1.5 // Adjust this value for a bigger/smaller arc
        const animation = gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                duration: 0.4,
                onUpdate: function () {
                    const progress = this.progress() // Progress from 0 → 1
                    instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                }
            }, "0.1")
        animation
            .then(() => {
                // Start physics
                instance.startPhysics()

                // Update state
                setGems((prevState) => {
                    const gems = prevState[gem.type]
                    gems.push({
                        ...gem,
                        id: gemReturn.id,
                        position: targetPosition.toArray(),
                        rotation: gemReturn.rotation
                    })

                    return {
                        ...prevState,
                        [gem.type]: gems.map((gem, index) => ({
                            ...gem,
                            position: [gem.position[0], gem.position[1], (index + 0.5) * GemTokenSize.depth],
                        }))
                    }
                })
                setPlayerGems((prevState) => ({
                    ...prevState,
                    [playerId]: ({
                        ...prevState[playerId],
                        [gem.type]: prevState[playerId][gem.type].filter(gem => gem.id != gemReturn.id)
                    })
                }))
            })
        if (focusObjects.some(focusObject => focusObject.id == gemReturn.id)) {
            removeFocusObjects(gemReturn.id)
        } else {
            addFocusObjects({
                id: gemReturn.id,
                type: "gem",
                gem: {
                    type: gem.type,
                    owner: playerId,
                    oldPosition: startPosition,
                    oldRotation: startRotation
                }
            })
        }

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

    const onClickPlayerReserveCard = (playerId: string, card: Card) => {
        if (currentAction) return
        if (user?.user_id != playerId) return

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

        //
        const instance = cardRefs.current[card.id]

        // Stop physics
        instance.stopPhysics()

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetRotation = camera.rotation.clone()
        const animation = gsap.timeline()
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
        addFocusObjects({
            id: card.id,
            type: "card",
            card: {
                ref: instance,
                animation: animation
            }
        })

        // Show action board
        if (isMyTurn) {
            setDialog({
                open: true,
                position: targetPosition.clone().addScaledVector(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion), GemCardSize.width / 2 + 0.5).toArray(),
                rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
            })
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
        const animation = gsap.timeline();
        const timelineDeckCard3 = gsap.timeline();
        const timelineDeckCard2 = gsap.timeline();
        const timelineDeckCard1 = gsap.timeline();
        const timelineDeckNoble = gsap.timeline();
        const timelineOpenField3 = gsap.timeline();
        const timelineOpenField2 = gsap.timeline();
        const timelineOpenField1 = gsap.timeline();
        const timelineOpenNoble = gsap.timeline();


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
                        , 0);
                });
                timelineDeckCard3.call(() => {
                    const newDeck = fieldCard3.map((cardOpen: any) => deckCard[3].find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard[3].filter((card: Card) => !fieldCard3.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[3].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Card[]

                    // Update new position + rotation
                    newDeck.forEach((card) => {
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
                        , 0);
                });
                timelineDeckCard2.call(() => {
                    const newDeck = fieldCard2.map((cardOpen: any) => deckCard[2].find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard[2].filter((card: Card) => !fieldCard2.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: any) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[2].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Card[]

                    // Update new position + rotation
                    newDeck.forEach((card) => {
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
                        , 0);
                });
                timelineDeckCard1.call(() => {
                    const newDeck = fieldCard1.map((cardOpen: any) => deckCard[1].find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard[1].filter((card: Card) => !fieldCard1.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard[1].length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Card[]

                    // Update new position + rotation
                    newDeck.forEach((card) => {
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
                        , 0)
                });
                timelineDeckNoble.call(() => {
                    const newDeck = fieldNoble.map((nobleOpen: any) => deckNoble.find((noble: Noble) => noble.id == nobleOpen.noble.id))
                        .concat(deckNoble.filter((noble: Noble) => !fieldNoble.some((nobleOpen: any) => noble.id == nobleOpen.noble.id)))
                        .map((noble: Noble, index: number) => {
                            return {
                                ...noble,
                                position: [NoblePosition.desk[0], NoblePosition.desk[1], (deckNoble.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }) as Noble[]

                    // Update new position + rotation
                    newDeck.forEach((noble) => {
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
                    const arcHeight = 0.8
                    timelineOpenNoble.to(instance.position, {
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
            .call(() => {
                // Stop physics
                deckCard[3]?.forEach((card: Card) => {
                    cardRefs.current[card.id].stopPhysics()
                })
                deckCard[2]?.forEach((card: Card) => {
                    cardRefs.current[card.id].stopPhysics()
                })
                deckCard[1]?.forEach((card: Card) => {
                    cardRefs.current[card.id].stopPhysics()
                })
                deckNoble.forEach((noble: Noble) => {
                    nobleRefs.current[noble.id].stopPhysics()
                })
            })
            .add(timelineDeckCard3)
            .add(timelineDeckCard2, "<")
            .add(timelineDeckCard1, "<")
            .add(timelineDeckNoble, "<")
            .add(timelineOpenField3, ">1")
            .add(timelineOpenField2)
            .add(timelineOpenField1)
            .add(timelineOpenNoble)
            .call(() => {
                // Start physics
                deckCard[3].forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckCard[2].forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckCard[1].forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckNoble.forEach((noble: Noble) => {
                    nobleRefs.current[noble.id].startPhysics()
                })

                // Save state
                setDeckCard(prevState => {
                    const newDeck1 = prevState[1].filter((card: Card) => !fieldCard1.some((field: any) => card.id == field.card.id))
                    const newDeck2 = prevState[2].filter((card: Card) => !fieldCard2.some((field: any) => card.id == field.card.id))
                    const newDeck3 = prevState[3].filter((card: Card) => !fieldCard3.some((field: any) => card.id == field.card.id))

                    return {
                        [1]: newDeck1.map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck1.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }),
                        [2]: newDeck2.map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck2.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        }),
                        [3]: newDeck3.map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck3.length - 1 - index) * GemCardSize.depth + CardPosition.level[card.level].desk[2]],
                                rotation: [0, Math.PI, 0]
                            }
                        })
                    }
                })
                setFieldCard({
                    [3]: card3Opens,
                    [2]: card2Opens,
                    [1]: card1Opens,
                })
                // Noble
                setDeckNoble((oldDeckNoble: Noble[]) => {
                    const newDeck = oldDeckNoble.filter((noble: Noble) => !fieldNoble.some((field: any) => noble.id == field.noble.id))
                    return newDeck.map((noble: Noble, index: number) => {
                        return {
                            ...noble,
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], (newDeck.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
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

        if (isMyTurn) {
            // setSelectedGems([])
            setCurrentAction(undefined)

            // Disable action board
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })
        } else {
            const player = playerIds.indexOf(currentPlayer)
            if (player < 0) return         // Không phải người chơi
            const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player + 1]
            if (!playerLocate) return       // Ko tim thay config vi tri player

            const animation = gsap.timeline()

            function takeGem(type: TokenGemType, gemTake: Gem) {
                const playerDeckGems: Gem[] = playerGems[currentPlayer][type]
                if (!PlayerPosition[type]) return
                const gemPosition: Vector3 = new Vector3().fromArray(PlayerPosition[type])

                const instance = gemRefs.current[gemTake.id]

                // Stop physics
                instance.stopPhysics()

                // Animation
                const startPosition: Vector3 = instance.position.clone()
                const playerPosition = new Vector3().fromArray(playerLocate.position)
                const targetPosition = gemPosition
                    .add(playerPosition)
                    .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
                    .setZ((playerDeckGems.length - 1 + 0.5) * GemTokenSize.depth)
                const arcHeight = 1.5 // Adjust this value for a bigger/smaller arc
                animation.add(gsap.timeline()
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.4,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    }, "0.1")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()

                        // Update state
                        setGems((prevState) => ({
                            ...prevState,
                            [type]: prevState[type].filter(gem => gem.id != gemTake.id)
                        }))
                        setPlayerGems((prevState) => {
                            const gems = prevState[currentPlayer][type]
                            gems.push({
                                ...gemTake,
                                position: targetPosition.toArray(),
                                rotation: gemTake.rotation
                            })

                            return {
                                ...prevState,
                                [currentPlayer]: ({
                                    ...prevState[currentPlayer],
                                    [type]: gems.map((gem, index) => ({
                                        ...gem,
                                        position: [gem.position[0], gem.position[1], (index + 0.5) * GemTokenSize.depth],
                                    }))
                                })
                            }
                        })
                    }))
            }
            function returnGem(type: TokenGemType, gemReturn: Gem) {
                const deckGems: Gem[] = gems[type]
                const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[type])
                const instance = gemRefs.current[gemReturn.id]

                // Stop physics
                instance.stopPhysics()

                // Animation
                const startPosition = instance.position.clone()
                const targetPosition = gemPosition
                    .setZ((deckGems.length - 1 + 0.5) * GemTokenSize.depth)
                const arcHeight = 2 // Adjust this value for a bigger/smaller arc
                animation.add(gsap.timeline()
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.4,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    }, "0.1")
                    .call(() => {
                        // Start physics
                        instance.startPhysics()

                        // Update state
                        setGems((prevState) => {
                            const gems = prevState[type]
                            gems.push({
                                ...gemReturn,
                                position: targetPosition.toArray(),
                                rotation: gemReturn.rotation
                            })

                            return {
                                ...prevState,
                                [type]: gems.map((gem, index) => ({
                                    ...gem,
                                    position: [gem.position[0], gem.position[1], (index + 0.5) * GemTokenSize.depth],
                                }))
                            }
                        })
                        setPlayerGems((prevState) => ({
                            ...prevState,
                            [currentPlayer]: ({
                                ...prevState[currentPlayer],
                                [type]: prevState[currentPlayer][type].filter(gem => gem.id != gemReturn.id)
                            })
                        }))
                    }))
            }
            function takeGems(type: TokenGemType, total: number) {
                const deckGems: Gem[] = gems[type]
                if (deckGems.length <= 0) return

                let gemTake: Gem
                for (let i = 0; i < total; i++) {
                    gemTake = deckGems[deckGems.length - 1 - i]

                    takeGem(type, gemTake)
                }
            }
            function returnGems(type: TokenGemType, total: number) {
                const playerDeckGems: Gem[] = playerGems[currentPlayer][type]
                if (playerDeckGems.length <= 0) return

                let gemReturn: Gem
                for (let i = 0; i < total; i++) {
                    gemReturn = playerDeckGems[playerDeckGems.length - 1 - i]

                    returnGem(type, gemReturn)
                }
            }

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

        const player = playerIds.indexOf(currentPlayer)
        if (player < 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length]?.player[player + 1]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const cardConfig = CardDictionary[cardId]
        if (!cardConfig) return

        const cards: Card[] = playerCards[currentPlayer].filter(card => card.type == cardConfig.type)
        if (!PlayerPosition[cardConfig.type]) return
        const cardPosition: Vector3 = new Vector3().fromArray(PlayerPosition[cardConfig.type])
        const gems: Gem[] = playerGems[currentPlayer][cardConfig.type]

        //
        let instanceUp = undefined
        if (cards.length > 0) {
            instanceUp = cardRefs.current[cards[cards.length - 1].id]
        } else if (gems.length > 0) {
            instanceUp = gemRefs.current[gems[0].id]
        }
        const instance = cardRefs.current[cardId]

        // Stop physics
        instanceUp?.stopPhysics()
        instance.stopPhysics()

        // Animation
        const startPosition: Vector3 = instance.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = cardPosition.clone()
            .setY(cardPosition.y + cards.length * PlayerPosition.distance)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ(0.5 * GemCardSize.depth)
        const targetRotation = [0, 0, 0]
        const targetSlidePosition = cardPosition.clone()
            .setY(cardPosition.y + cards.length * PlayerPosition.distance + GemCardSize.height)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ(0.5 * GemCardSize.depth)
        const animation = gsap.timeline()

        function returnGem(type: TokenGemType, gemReturn: Gem) {
            const deckGems: Gem[] = playerGems[currentPlayer][type]
            const gemPosition: Vector3 = new Vector3().fromArray(GemPosition[type])
            const instance = gemRefs.current[gemReturn.id]

            // Stop physics
            instance.stopPhysics()

            // Animation
            const startPosition = instance.position.clone()
            const targetPosition = gemPosition
                .setZ((deckGems.length - 1 + 0.5) * GemTokenSize.depth)
            const arcHeight = 2 // Adjust this value for a bigger/smaller arc
            animation.add(gsap.timeline()
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.4,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                }, "0.1")
                .call(() => {
                    // Start physics
                    instance.startPhysics()

                    // Update state
                    setGems((prevState) => {
                        const gems = prevState[type]
                        gems.push({
                            ...gemReturn,
                            position: targetPosition.toArray(),
                            rotation: gemReturn.rotation
                        })

                        return {
                            ...prevState,
                            [type]: gems.map((gem, index) => ({
                                ...gem,
                                position: [gem.position[0], gem.position[1], (index + 0.5) * GemTokenSize.depth],
                            }))
                        }
                    })
                    setPlayerGems((prevState) => ({
                        ...prevState,
                        [currentPlayer]: ({
                            ...prevState[currentPlayer],
                            [type]: prevState[currentPlayer][type].filter(gem => gem.id != gemReturn.id)
                        })
                    }))
                }))
        }
        function returnGems(type: TokenGemType, total: number) {
            const playerDeckGems: Gem[] = playerGems[currentPlayer][type]
            if (playerDeckGems.length <= 0) return

            let gemReturn: Gem
            for (let i = 0; i < total; i++) {
                gemReturn = playerDeckGems[playerDeckGems.length - 1 - i]

                returnGem(type, gemReturn)
            }
        }

        if (instanceUp) {
            animation
                .to(instanceUp.position, {
                    z: 0.2,
                    duration: 0.7
                }, "0.1")
        }
        if (isMyTurn) {
            setCurrentAction(undefined)
            // setSelectedCards([])

            // Disable action board
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })

            animation
                .to(instance.position, {
                    x: targetSlidePosition.x,
                    y: targetSlidePosition.y,
                    z: targetSlidePosition.z,
                    duration: 0.5
                }, "0.1")
        } else {
            const arcHeight = 1 // Adjust this value for a bigger/smaller arc
            animation
                .to(instance.position, {
                    x: targetSlidePosition.x,
                    y: targetSlidePosition.y,
                    duration: 0.5,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetSlidePosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                }, "0.1")
        }
        animation
            .to(instance.rotation, {
                x: targetRotation[0],
                y: targetRotation[1],
                z: targetRotation[2],
                duration: 0.4
            }, "<")
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.2,
            })
            .call(() => {
                // Start physics
                instanceUp?.startPhysics()
                instance.startPhysics()

                // Update state
                setPlayerCards((prevState) => ({
                    ...prevState,
                    [currentPlayer]: [
                        ...prevState[currentPlayer],
                        {
                            ...cardConfig,
                            id: cardId,
                            position: targetPosition.toArray(),
                            rotation: targetRotation
                        }]
                }))
                if (playerReserveCards[currentPlayer].some(card => card.id == cardId)) {
                    setPlayerReserveCards((prevState) => ({
                        ...prevState,
                        [currentPlayer]: prevState[currentPlayer].filter(card => card.id == cardId)
                    }))
                } else {
                    setFieldCard((prevState) => ({
                        ...prevState,
                        [cardConfig.level]: prevState[cardConfig.level].filter(card => card.id != cardId)
                    }))
                }
            })
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

    const onPlayerReserveCard = (data: any) => {
        const cardId = data.card_id
        const currentPlayer = data.current_player

        const player = playerIds.indexOf(currentPlayer)
        if (player < 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length]?.player[player + 1]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const reserveCards: Card[] = playerReserveCards[currentPlayer]
        const cardPosition: Vector3 = new Vector3().fromArray(PlayerPosition.reserveCard)

        //
        const instance = cardRefs.current[cardId]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition: Vector3 = instance.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = cardPosition.clone()
            .setX(cardPosition.x + reserveCards.length * (GemCardSize.width + 0.1))
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ((0.5 + 1 + reserveCards.length) * GemCardSize.depth)
        const targetRotation = [0, Math.PI, 0]
        const animation = gsap.timeline()
        if (isMyTurn) {
            setCurrentAction(undefined)
            // setSelectedCards([])

            // Disable action board
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })

            animation
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.5,
                })
        } else {
            const arcHeight = 1 // Adjust this value for a bigger/smaller arc
            animation
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.5,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                })
        }
        animation
            .to(instance.rotation, {
                x: targetRotation[0],
                y: targetRotation[1],
                z: targetRotation[2],
                duration: 0.5
            }, "<")
        animation
            .then(() => {
                // Start physics
                instance.startPhysics()

                // Update state
                setPlayerReserveCards((prevState) => ({
                    ...prevState,
                    [currentPlayer]: [
                        ...prevState[currentPlayer],
                        {
                            ...CardDictionary[cardId],
                            id: cardId,
                            position: targetPosition.toArray(),
                            rotation: targetRotation
                        }
                    ]
                }))
                if (currentAction?.card?.deck) {
                    setDeckCard((prevState) => ({
                        ...prevState,
                        [currentAction.card?.level || 0]: prevState[currentAction.card?.level || 0]?.filter(card => card.id != cardId)
                    }))
                } else {
                    setFieldCard((prevState) => ({
                        ...prevState,
                        [currentAction?.card?.level || 0]: prevState[currentAction?.card?.level || 0]?.filter(card => card.id != cardId)
                    }))
                }
            })

    }

    const onPlayerTakeNoble = (data: any) => {
        const nobleId = data.noble_id
        const currentPlayer = data.current_player

        const player = playerIds.indexOf(currentPlayer)
        if (player < 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length]?.player[player + 1]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const nobles: Noble[] = playerNobles[currentPlayer]
        const noblePosition: Vector3 = new Vector3().fromArray(PlayerPosition.noble)

        //
        const instance = nobleRefs.current[nobleId]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition: Vector3 = instance.position.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = noblePosition.clone()
            .setX(noblePosition.x + nobles.length * PlayerPosition.distance)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ((0.5 + 1 + nobles.length) * GemCardSize.depth)
        const targetRotation = [0, 0, 0]
        const animation = gsap.timeline()
        if (isMyTurn) {
            setCurrentAction(undefined)
            // setSelectedNobles([])

            // Disable action board
            setDialog({
                open: false,
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            })

            animation
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    z: targetPosition.z,
                    duration: 0.5,
                })
        } else {
            const arcHeight = 1 // Adjust this value for a bigger/smaller arc
            animation
                .to(instance.position, {
                    x: targetPosition.x,
                    y: targetPosition.y,
                    duration: 0.5,
                    onUpdate: function () {
                        const progress = this.progress() // Progress from 0 → 1
                        instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                    }
                })
        }
        animation
            .to(instance.rotation, {
                x: targetRotation[0],
                y: targetRotation[1],
                z: targetRotation[2],
                duration: 0.5
            }, "<")
        animation
            .then(() => {
                // Start physics
                instance.startPhysics()

                // Update state
                setPlayerNobles((prevState) => ({
                    ...prevState,
                    [currentPlayer]: [
                        ...prevState[currentPlayer],
                        {
                            ...NobleDictionary[nobleId],
                            id: nobleId,
                            position: targetPosition.toArray(),
                            rotation: targetRotation
                        }
                    ]
                }))
                setFieldNoble((prevState) => prevState.filter(noble => noble.id != nobleId))
            })

    }

    return {
        selectAction,
        cancelAction,
        confirmAction,
        onClickNoble,
        onClickDeckCard,
        onClickCard,
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