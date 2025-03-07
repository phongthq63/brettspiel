import CardGem, {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import CardNoble, {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import React, {useCallback, useEffect, useState} from "react";
import {useThree} from "@react-three/fiber";
import {Card, Gem, Noble, useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Euler, MathUtils, Quaternion, Vector3} from "three";
import Plane from "@/games/splendor/component/3d/Plane";
import Table, {BoardSize} from "@/games/splendor/component/3d/Table";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref";
import GameController from "@/games/splendor/component/GameController";
import {TokenGemType} from "@/games/splendor/constants/gem";
import TokenGem, {TokenGemSize} from "@/games/splendor/component/3d/TokenGem";
import ActionBoard from "@/games/splendor/component/3d/ActionBoard";
import PlayerField from "@/games/splendor/component/3d/PlayerField";
import {
    CardVO,
    FieldCardVO,
    FieldNobleVO,
    GameService,
    NobleVO,
    SplendorGameDTO
} from "@/games/splendor/service/splendor.service";
import {CardDictionary, CardGemType} from "@/games/splendor/constants/card";
import {
    CardPosition,
    DiamondPosition,
    EmeraldPosition,
    GoldPosition, NoblePosition,
    OnyxPosition, PlayerPosition,
    RubyPosition,
    SapphirePosition
} from "@/games/splendor/constants/game";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {useGameAction} from "@/games/splendor/store/action";


function PlaySpace() {
    const {camera} = useThree()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        gameId,
        status, setStatus,
        playerIds, setPlayerIds,
        currentPlayer, setCurrentPlayer,
        setNextPlayer,
        deckCard3, setDeckCard3,
        deckCard2, setDeckCard2,
        deckCard1, setDeckCard1,
        fieldCard3, setFieldCard3,
        fieldCard2, setFieldCard2,
        fieldCard1, setFieldCard1,
        gems, setGems,
        deckNoble, setDeckNoble,
        fieldNoble, setFieldNoble,
        players,
        playerCards, setPlayerCards,
        playerGems, setPlayerGems,
        isMyTurn,
    } = useGameSplendor()
    const {
        currentAction, setCurrentAction,
        selectedObjects, setSelectedObjects,
        selectedGems, setSelectedGems,
    } = useGameAction()
    const [gameData, setGameData] = useState<SplendorGameDTO>()
    const [actionBoard, setActionBoard] = useState({enable: false, position: new Vector3(), rotation: new Euler()})


    //
    useEffect(() => {
        GameService.getGameInfo({ gameId: gameId })
            .then(response => {
                if (response.code == 0 && response.data) {
                    setGameData(response.data);
                } else {
                    console.log("Get game info false", response);
                }
            })
            .catch(error => {
                console.log("Get game info error", error);
            });
    }, [gameId])

    // Update state
    useEffect(() => {
        if (!gameData || !gameData.ingame_data) return

        //
        if (gameData.status) {
            setStatus(gameData.status)
        }
        if (gameData.ingame_data.player_ids) {
            setPlayerIds(gameData.ingame_data.player_ids)
        }
        if (gameData.ingame_data.current_player) {
            setCurrentPlayer(gameData.ingame_data.current_player)
        }
        if (gameData.ingame_data.next_player) {
            setNextPlayer(gameData.ingame_data.next_player)
        }

        // Deck card
        {
            if (gameData.ingame_data.deck_card3) {
                const deckCard = gameData.ingame_data.deck_card3
                setDeckCard3(deckCard.map((card: CardVO, index: number) => {
                    if (gameData.status == 0) {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[3].desk[0], CardPosition.level[3].desk[1], index * CardGemSize.depth + CardPosition.level[3].desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        };
                    } else {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[3].desk[0], CardPosition.level[3].desk[1], (deckCard.length - 1 - index) * CardGemSize.depth + CardPosition.level[3].desk[2] + 0.2],
                            rotation: [0, Math.PI, 0]
                        };
                    }
                }))
            }
            if (gameData.ingame_data.deck_card2) {
                const deckCard = gameData.ingame_data.deck_card2
                setDeckCard2(deckCard.map((card: CardVO, index: number) => {
                    if (gameData.status == 0) {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[2].desk[0], CardPosition.level[2].desk[1], index * CardGemSize.depth + CardPosition.level[2].desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        };
                    } else {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[2].desk[0], CardPosition.level[2].desk[1], (deckCard.length - 1 - index) * CardGemSize.depth + CardPosition.level[2].desk[2] + 0.2],
                            rotation: [0, Math.PI, 0]
                        };
                    }
                }))
            }
            if (gameData.ingame_data.deck_card1) {
                const deckCard = gameData.ingame_data.deck_card1
                setDeckCard1(deckCard.map((card: CardVO, index: number) => {
                    if (gameData.status == 0) {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[1].desk[0], CardPosition.level[1].desk[1], index * CardGemSize.depth + CardPosition.level[1].desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        };
                    } else {
                        return {
                            ...card,
                            ...CardDictionary[card.id],
                            position: [CardPosition.level[1].desk[0], CardPosition.level[1].desk[1], (deckCard.length - 1 - index) * CardGemSize.depth + CardPosition.level[1].desk[2] + 0.2],
                            rotation: [0, Math.PI, 0]
                        };
                    }
                }));
            }
        }
        // Card open
        {
            if (gameData.ingame_data.field_card3) {
                setFieldCard3(gameData.ingame_data.field_card3.filter((fieldCard: FieldCardVO) => fieldCard.card)
                    .map((fieldCard: FieldCardVO) => {
                        const position = CardPosition.level[3].field[fieldCard.position ?? 0]
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card?.id || ''],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.field_card2) {
                setFieldCard2(gameData.ingame_data.field_card2.filter((fieldCard: FieldCardVO) => fieldCard.card)
                    .map((fieldCard: FieldCardVO) => {
                        const position = CardPosition.level[2].field[fieldCard.position ?? 0]
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card?.id || ''],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.field_card1) {
                setFieldCard1(gameData.ingame_data.field_card1.filter((fieldCard: FieldCardVO) => fieldCard.card)
                    .map((fieldCard: FieldCardVO) => {
                        const position = CardPosition.level[1].field[fieldCard.position ?? 0]
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card?.id || ''],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
        }
        // Gem
        {
            setGems({
                [TokenGemType.GOLD]: Array.from({length: gameData.ingame_data?.gold ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [GoldPosition.desk[0], GoldPosition.desk[1], index * TokenGemSize.depth + GoldPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.ONYX]: Array.from({length: gameData.ingame_data?.onyx ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [OnyxPosition.desk[0], OnyxPosition.desk[1], index * TokenGemSize.depth + OnyxPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.RUBY]: Array.from({length: gameData.ingame_data?.ruby ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [RubyPosition.desk[0], RubyPosition.desk[1], index * TokenGemSize.depth + RubyPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.EMERALD]: Array.from({length: gameData.ingame_data?.emerald ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [EmeraldPosition.desk[0], EmeraldPosition.desk[1], index * TokenGemSize.depth + EmeraldPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.SAPPHIRE]: Array.from({length: gameData.ingame_data?.sapphire ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [SapphirePosition.desk[0], SapphirePosition.desk[1], index * TokenGemSize.depth + SapphirePosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.DIAMOND]: Array.from({length: gameData.ingame_data?.diamond ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [DiamondPosition.desk[0], DiamondPosition.desk[1], index * TokenGemSize.depth + DiamondPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    })
            })
        }
        // Noble
        {
            if (gameData.ingame_data.deck_noble) {
                const deckNoble = gameData.ingame_data.deck_noble;
                setDeckNoble(deckNoble.map((noble: NobleVO, index: number) => {
                    if (gameData.status == 0) {
                        return {
                            ...noble,
                            ...NobleDictionary[noble.id ?? ''],
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], index * CardNobleSize.depth + NoblePosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        };
                    } else {
                        return {
                            ...noble,
                            ...NobleDictionary[noble.id ?? ''],
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], (deckNoble.length - 1 - index) * CardNobleSize.depth + NoblePosition.desk[2] + 0.2],
                            rotation: [0, Math.PI, 0]
                        };
                    }
                }))
            }
        }
        // Noble open
        {
            if (gameData.ingame_data.field_noble) {
                setFieldNoble(gameData.ingame_data.field_noble.filter((fieldNoble: FieldNobleVO) => fieldNoble.noble)
                    .map((fieldNoble) => {
                        const position = NoblePosition.field[fieldNoble.position ?? 0]
                        return {
                            ...fieldNoble.noble,
                            ...NobleDictionary[fieldNoble.noble?.id || ''],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
        }

    }, [gameData])

    // Return object action select to first position
    useEffect(() => {
        if (currentAction) return

        if (selectedObjects.length > 0) {
            // Reverse animation
            let currentAnimation: gsap.core.Timeline
            selectedObjects.reverse().forEach(selectedObject => {
                if (currentAnimation) {
                    currentAnimation.eventCallback("onReverseComplete", () => {
                        selectedObject.animation
                            .call(() => {
                                // Stop physics
                                selectedObject.ref.stopPhysics()
                            })
                            .reverse()
                            .then(() => {
                                // Start physics
                                selectedObject.ref.startPhysics()
                            })
                    })
                } else {
                    selectedObject.animation
                        .call(() => {
                            // Stop physics
                            selectedObject.ref.stopPhysics()
                        })
                        .reverse()
                        .then(() => {
                            // Start physics
                            selectedObject.ref.startPhysics()
                        })
                }

                currentAnimation = selectedObject.animation
            })

            setSelectedObjects([])
        }
        if (selectedGems.length > 0) {
            const animation = gsap.timeline()
            selectedGems.reverse().forEach(selectedGem => {
                const instance = gemRefs.current[selectedGem.id]

                // Stop physics
                instance.stopPhysics()

                // Animation
                const startPosition = gemRefs.current[selectedGem.id].position.clone()
                const targetPosition = selectedGem.oldPosition
                const targetRotation = selectedGem.oldRotation
                const arcHeight = 1.5
                animation.add(gsap.timeline()
                    .to(instance.position, {
                        x: targetPosition.x,
                        y: targetPosition.y,
                        duration: 0.3,
                        onUpdate: function () {
                            const progress = this.progress() // Progress from 0 → 1
                            instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                        }
                    })
                    .to(instance.rotation, {
                        x: targetRotation.x,
                        y: targetRotation.y,
                        z: targetRotation.z,
                        duration: 0.3
                    }, "<")
                    .call(() => {
                        // Start physics
                        gemRefs.current[selectedGem.id].startPhysics()

                        // Update state
                        if (selectedGem.owner) {
                            setGems((prevState) => ({
                                ...prevState,
                                [selectedGem.type]: prevState[selectedGem.type].filter(gem => gem.id != selectedGem.id)
                            }))
                            setPlayerGems((prevState) => ({
                                ...prevState,
                                [currentPlayer]: ({
                                    ...prevState[currentPlayer],
                                    [selectedGem.type]: [
                                        ...prevState[currentPlayer][selectedGem.type],
                                        {
                                            id: selectedGem.id,
                                            position: targetPosition.toArray(),
                                            rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                                        }
                                    ]
                                })
                            }))
                        } else {
                            setGems((prevState) => ({
                                ...prevState,
                                [selectedGem.type]: [
                                    ...(prevState[selectedGem.type]),
                                    {
                                        id: selectedGem.id,
                                        position: targetPosition.toArray(),
                                        rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                                    }
                                ],
                            }))
                            setPlayerGems((prevState) => ({
                                ...prevState,
                                [currentPlayer]: ({
                                    ...prevState[currentPlayer],
                                    [selectedGem.type]: prevState[currentPlayer][selectedGem.type].filter(gem => gem.id != selectedGem.id)
                                })
                            }))
                        }
                    }))
            })

            setSelectedGems([])
        }

    }, [currentAction])

    const onClickCardDeck = useCallback((id: string, level: number) => {
        if (status != 1 || !isMyTurn || currentAction) return

        //
        const instance = cardRefs.current[id]
        setCurrentAction({
            type: "reserve-card",
            card: {
                id: id,
                level: level,
                deck: true
            }
        })

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
        setSelectedObjects([{
            id: id,
            ref: instance,
            animation: animation
        }])

        // Show action board
        if (isMyTurn) {
            const direction = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
            setActionBoard({
                enable: true,
                position: targetPosition.clone().addScaledVector(direction, CardGemSize.width / 2 + 0.4),
                rotation: camera.rotation.clone()
            })
        }

    }, [currentAction, status])

    const onClickCard = useCallback((id: string, level: number) => {
        if (currentAction) return

        // Update action if in turn
        if (isMyTurn) {
            setCurrentAction({
                type: "option-action",
                card: {
                    id: id,
                    level: level,
                    deck: false
                },
                option: ["buy-card", "reserve-card"]})
        }

        //
        const instance = cardRefs.current[id]

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
        if (!selectedObjects.some(selectedObject => selectedObject.id == id)) {
            setSelectedObjects([
                {
                    id: id,
                    ref: instance,
                    animation: animation
                }
            ])
        }

        // Show action board
        if (isMyTurn) {
            const direction = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
            setActionBoard({
                enable: true,
                position: targetPosition.clone().addScaledVector(direction, CardGemSize.width / 2 + 0.5),
                rotation: targetRotation
            })
        }

    }, [currentAction, isMyTurn, selectedObjects])

    const test = (id: string) => {
        const player = (playerIds.indexOf(currentPlayer) ?? 0) + 1
        if (player == 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const cardConfig = CardDictionary[id]
        if (!cardConfig) return

        const cards: Card[] = playerCards[currentPlayer].filter(card => card.type == cardConfig.type)
        let cardPosition: Vector3
        switch (cardConfig.type) {
            case CardGemType.DIAMOND:
                cardPosition = new Vector3().fromArray(PlayerPosition.diamond)
                break
            case CardGemType.SAPPHIRE:
                cardPosition = new Vector3().fromArray(PlayerPosition.sapphire)
                break
            case CardGemType.EMERALD:
                cardPosition = new Vector3().fromArray(PlayerPosition.emerald)
                break
            case CardGemType.RUBY:
                cardPosition = new Vector3().fromArray(PlayerPosition.ruby)
                break
            case CardGemType.ONYX:
                cardPosition = new Vector3().fromArray(PlayerPosition.onyx)
                break
        }

        //
        const instance = cardRefs.current[id]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition: Vector3 = instance.position.clone()
        const startRotation: Euler = instance.rotation.clone()
        const playerPosition = new Vector3().fromArray(playerLocate.position)
        const targetPosition = cardPosition
            .setY(cardPosition.y + cards.length * PlayerPosition.distance)
            .add(playerPosition)
            .applyEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))
            .setZ(0.5 * CardGemSize.depth)
        const targetRotation = new Euler().setFromQuaternion(new Quaternion().setFromEuler(startRotation)
            .multiply(new Quaternion().setFromEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))))
        const arcHeight = 1 // Adjust this value for a bigger/smaller arc
        const animation = gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y - CardGemSize.height,
                duration: 0.4,
                onUpdate: function () {
                    const progress = this.progress() // Progress from 0 → 1
                    instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                }
            }, "0.1")
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.4,
            }, "<")
        animation
            .then(() => {
                // Start physics
                instance.startPhysics()

                // Update state
                switch (cardConfig.level) {
                    case 1:
                        setFieldCard1((prevState) => prevState.filter(card => card.id != id))
                        setPlayerCards((prevState) => ({
                            ...prevState,
                            [currentPlayer]: [
                                ...prevState[currentPlayer],
                                {
                                    ...cardConfig,
                                    id: id,
                                    position: targetPosition.toArray(),
                                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                                }]
                        }))
                        break
                    case 2:
                        setFieldCard2((prevState) => prevState.filter(card => card.id != id))
                        setPlayerCards((prevState) => ({
                            ...prevState,
                            [currentPlayer]: [
                                ...prevState[currentPlayer],
                                {
                                    ...cardConfig,
                                    id: id,
                                    position: targetPosition.toArray(),
                                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                                }]
                        }))
                        break
                    case 3:
                        setFieldCard3((prevState) => prevState.filter(card => card.id != id))
                        setPlayerCards((prevState) => ({
                            ...prevState,
                            [currentPlayer]: [
                                ...prevState[currentPlayer],
                                {
                                    ...cardConfig,
                                    id: id,
                                    position: targetPosition.toArray(),
                                    rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                                }]
                        }))
                        break
                }
            })
    }

    const onClickNoble = useCallback((id: string) => {
        if (currentAction) return

        // Update action if in turn
        if (isMyTurn) {
            setCurrentAction({
                type: "take-noble",
                noble: {id: id}
            })
        }

        //
        const instance = nobleRefs.current[id]

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
        if (!selectedObjects.some(selectedObject => selectedObject.id == id)) {
            setSelectedObjects([
                {
                    id: id,
                    ref: instance,
                    animation: animation
                }
            ])
        }

        // Show action board
        if (isMyTurn) {
            const direction = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
            setActionBoard({
                enable: true,
                position: targetPosition.clone().addScaledVector(direction, CardNobleSize.width / 2 + 0.4),
                rotation: targetRotation
            })
        }

    }, [currentAction, selectedObjects])

    const onClickGem = useCallback((type: TokenGemType) => {
        if (status != 1) return
        if (!isMyTurn) return
        if (currentAction && currentAction.type != "gather-gem") return

        // Verify rule game
        const gemsTake = currentAction?.gem?.filter(gem => gem.count > 0) || []
        if (gemsTake.length >= 3) return
        if (gemsTake.length == 2 && (gemsTake[0].type == gemsTake[1].type || gemsTake[0].type == type || gemsTake[1].type == type)) return

        //
        const player = (playerIds.indexOf(currentPlayer) ?? 0) + 1
        if (player == 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        //
        const deckGems: Gem[] = gems[type]
        const playerDeckGems: Gem[] = playerGems[currentPlayer][type]
        let gemPosition: Vector3
        switch (type) {
            case TokenGemType.DIAMOND:
                gemPosition = new Vector3().fromArray(PlayerPosition.diamond)
                break
            case TokenGemType.SAPPHIRE:
                gemPosition = new Vector3().fromArray(PlayerPosition.sapphire)
                break
            case TokenGemType.EMERALD:
                gemPosition = new Vector3().fromArray(PlayerPosition.emerald)
                break
            case TokenGemType.RUBY:
                gemPosition = new Vector3().fromArray(PlayerPosition.ruby)
                break
            case TokenGemType.ONYX:
                gemPosition = new Vector3().fromArray(PlayerPosition.onyx)
                break
            default:
                return
        }
        if (!gemPosition) return
        if (deckGems.length <= 0) return
        let gemTake: Gem = deckGems[deckGems.length - 1]
        for (let i = deckGems.length - 1; i >= 0; i--) {
            if (!currentAction?.gem?.some(gem => gem.id == gemTake.id && gem.count > 0)) {
                break
            }

            gemTake = deckGems[i]
        }

        // Update action if in turn
        if (currentAction?.gem?.some(gem => gem.id == gemTake.id)) {
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: prevState?.gem?.filter(gem => gem.id != gemTake?.id)
            }))
        } else {
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: [...(prevState?.gem || []), {
                    id: gemTake.id,
                    type: type,
                    count: 1
                }]
            }))
        }

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
            .setZ((playerDeckGems.length - 1 + 0.5) * TokenGemSize.depth)
        const targetRotation = new Euler().setFromQuaternion(new Quaternion().setFromEuler(startRotation)
            .multiply(new Quaternion().setFromEuler(new Euler(playerLocate.rotation[0], playerLocate.rotation[1], playerLocate.rotation[2]))))
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
                    [type]: prevState[type].filter(gem => gem.id != gemTake.id)
                }))
                setPlayerGems((prevState) => ({
                    ...prevState,
                    [currentPlayer]: ({
                        ...prevState[currentPlayer],
                        [type]: [
                            ...prevState[currentPlayer][type],
                            {
                                id: gemTake.id,
                                position: targetPosition.toArray(),
                                rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
                            }
                        ]
                    })
                }))
            })
        if (selectedGems.some(selectedGem => selectedGem.id == gemTake.id)) {
            setSelectedGems((prevState) => prevState.filter(gem => gem.id != gemTake.id))
        } else {
            setSelectedGems((prevState) => [
                ...prevState,
                {
                    id: gemTake.id,
                    type: type,
                    oldPosition: startPosition,
                    oldRotation: startRotation
                }])
        }

        // Show action board
        if (selectedGems.length == 0) {
            const direction = new Vector3()
            camera.getWorldDirection(direction) // Get the camera's forward direction
            direction.multiplyScalar(1.5) // Distance from the camera (e.g., 5 units)
            const centerScenePosition = camera.position.clone().add(direction) // Calculate position in front of the camera
            setActionBoard({
                enable: true,
                position: centerScenePosition,
                rotation: camera.rotation.clone()
            })
        }
    }, [gameData, status, playerIds, currentPlayer, players, gems, playerGems, selectedGems, currentAction])

    const onCancelAction = () => {
        setCurrentAction(undefined)
        setActionBoard({enable: false, position: new Vector3(), rotation: new Euler()})
    }

    const onClickNotCurrent = useCallback((id: string) => {
        if (currentAction) return

        selectedObjects.filter(selectedObject => selectedObject.id == id)
            .forEach(selectedObject => {
                // Reverse animation
                selectedObject.animation
                    .call(() => {
                        // Stop physics
                        selectedObject.ref.stopPhysics()
                    })
                    .reverse()
                    .then(() => {
                        // Start physics
                        selectedObject.ref.startPhysics()
                    })
            })

        setSelectedObjects((prevState) => prevState.filter(selectedObject => selectedObject.id != id))
    }, [currentAction, selectedObjects])

    return (
        <>
            <GameController/>
            <OrbitControls/>
            <ambientLight intensity={2}/>
            <Plane position={[0, 0, -5]}/>
            <Table position={[0, 0, -BoardSize.depth / 2]}/>
            <group>
                <group>
                    {
                        deckCard3.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => test(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard2.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCardDeck(card.id, card.level)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard1.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCardDeck(card.id, card.level)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {
                        fieldCard3.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id, card.level)}
                                     onClickNotThis={() => onClickNotCurrent(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard2.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id, card.level)}
                                     onClickNotThis={() => onClickNotCurrent(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard1.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id, card.level)}
                                     onClickNotThis={() => onClickNotCurrent(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {gems.gold.map((gold: Gem) => (
                        <TokenGem key={gold.id}
                                  id={gold.id}
                                  type={TokenGemType.GOLD}
                                  position={gold.position}
                                  ref={(element: any) => (gemRefs.current[gold.id] = element)}/>
                    ))}
                    {gems.onyx.map((onyx: Gem) => (
                        <TokenGem key={onyx.id}
                                  id={onyx.id}
                                  type={TokenGemType.ONYX}
                                  onClick={() => onClickGem(TokenGemType.ONYX)}
                                  position={onyx.position}
                                  ref={(element: any) => (gemRefs.current[onyx.id] = element)}/>
                    ))}
                    {gems.ruby.map((ruby: Gem) => (
                        <TokenGem key={ruby.id}
                                  id={ruby.id}
                                  type={TokenGemType.RUBY}
                                  onClick={() => onClickGem(TokenGemType.RUBY)}
                                  position={ruby.position}
                                  ref={(element: any) => (gemRefs.current[ruby.id] = element)}/>
                    ))}
                    {gems.emerald.map((emerald: Gem) => (
                        <TokenGem key={emerald.id}
                                  id={emerald.id}
                                  type={TokenGemType.EMERALD}
                                  onClick={() => onClickGem(TokenGemType.EMERALD)}
                                  position={emerald.position}
                                  ref={(element: any) => (gemRefs.current[emerald.id] = element)}/>
                    ))}
                    {gems.sapphire.map((sapphire: Gem) => (
                        <TokenGem key={sapphire.id}
                                  id={sapphire.id}
                                  type={TokenGemType.SAPPHIRE}
                                  onClick={() => onClickGem(TokenGemType.SAPPHIRE)}
                                  position={sapphire.position}
                                  ref={(element: any) => (gemRefs.current[sapphire.id] = element)}/>
                    ))}
                    {gems.diamond.map((diamond: Gem) => (
                        <TokenGem key={diamond.id}
                                  id={diamond.id}
                                  type={TokenGemType.DIAMOND}
                                  onClick={() => onClickGem(TokenGemType.DIAMOND)}
                                  position={diamond.position}
                                  ref={(element: any) => (gemRefs.current[diamond.id] = element)}/>
                    ))}
                </group>
                <group>
                    {deckNoble.map((noble: Noble) => (
                        <CardNoble key={noble.id}
                                   id={noble.id}
                                   url={noble.url}
                                   position={noble.position}
                                   rotation={noble.rotation}
                                   ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                    ))}
                    {fieldNoble.map((noble: Noble) => (
                        <CardNoble key={noble.id}
                                   id={noble.id}
                                   url={noble.url}
                                   onClick={() => onClickNoble(noble.id)}
                                   onClickNotThis={() => onClickNotCurrent(noble.id)}
                                   position={noble.position}
                                   rotation={noble.rotation}
                                   ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                    ))}
                </group>
            </group>
            <group>
                {gameData?.ingame_data?.players?.map((player, index) => {
                    const locate = PlayerPosition.total[gameData?.ingame_data?.players?.length ?? 0].player[index + 1]
                    return (
                        <PlayerField key={player.player_id}
                                     playerId={player.player_id as string}
                                     playerData={player}
                                     position={locate.position}
                                     rotation={locate.rotation}/>
                    )
                })}
            </group>

            {actionBoard?.enable && (
                <ActionBoard position={actionBoard.position}
                             rotation={actionBoard.rotation}
                             onCancelAction={onCancelAction}/>
            )}
        </>
    )
}

export default PlaySpace;