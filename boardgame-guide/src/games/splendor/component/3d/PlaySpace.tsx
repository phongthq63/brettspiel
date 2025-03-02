import CardGem, {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import CardNoble, {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useThree} from "@react-three/fiber";
import {Card, Gem, Noble, Player, useGameSplendor} from "@/games/splendor/store/game";
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
import { CardDictionary } from "@/games/splendor/constants/card";
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
import {useUser} from "@/store/user";


function PlaySpace() {
    const {user} = useUser()
    const {camera} = useThree();
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        gameId,
        status, setStatus,
        setCurrentPlayer,
        setNextPlayer,
        deckCard3, setDeckCard3,
        deckCard2, setDeckCard2,
        deckCard1, setDeckCard1,
        fieldCard3, setFieldCard3,
        fieldCard2, setFieldCard2,
        fieldCard1, setFieldCard1,
        golds, setGolds,
        onyxes, setOnyxes,
        rubies, setRubies,
        emeralds, setEmeralds,
        sapphires, setSapphires,
        diamonds, setDiamonds,
        deckNoble, setDeckNoble,
        fieldNoble, setFieldNoble,
        setPlayers,
        playerOnyxes, playerRubies, playerEmeralds, playerSapphires, playerDiamonds,
        isMyTurn,
        currentAction, setCurrentAction
    } = useGameSplendor();
    const [gameData, setGameData] = useState<SplendorGameDTO>()
    const [selectedObjects, setSelectedObjects] = useState<{
        id: string
        ref: { [key: string]: any }
        animation: gsap.core.Timeline
    }[]>([]);
    const [actionBoard, setActionBoard] = useState({enable: false, position: new Vector3(), rotation: new Euler()});


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
    }, [gameId]);

    // Update state
    useEffect(() => {
        if (!gameData || !gameData.ingame_data) return

        //
        if (gameData.status) {
            setStatus(gameData.status)
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
            if (gameData.ingame_data.gold) {
                setGolds(Array.from({length: gameData.ingame_data.gold}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [GoldPosition.desk[0], GoldPosition.desk[1], index * TokenGemSize.depth + GoldPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.onyx) {
                setOnyxes(Array.from({length: gameData.ingame_data.onyx}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [OnyxPosition.desk[0], OnyxPosition.desk[1], index * TokenGemSize.depth + OnyxPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.ruby) {
                setRubies(Array.from({length: gameData.ingame_data.ruby}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [RubyPosition.desk[0], RubyPosition.desk[1], index * TokenGemSize.depth + RubyPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.emerald) {
                setEmeralds(Array.from({length: gameData.ingame_data.emerald}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [EmeraldPosition.desk[0], EmeraldPosition.desk[1], index * TokenGemSize.depth + EmeraldPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.sapphire) {
                setSapphires(Array.from({length: gameData.ingame_data.sapphire}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [SapphirePosition.desk[0], SapphirePosition.desk[1], index * TokenGemSize.depth + SapphirePosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
            if (gameData.ingame_data.diamond) {
                setDiamonds(Array.from({length: gameData.ingame_data.diamond}, (_, i) => i)
                    .map((index) => {
                        return {
                            id: crypto.randomUUID(),
                            owner: "",
                            position: [DiamondPosition.desk[0], DiamondPosition.desk[1], index * TokenGemSize.depth + DiamondPosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }))
            }
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

        // Player
        if (gameData.ingame_data.players) {
            setPlayers(gameData.ingame_data.players?.reduce((dict: { [id: string] : Player }, player) => {
                if (player.player_id) {
                    dict[player.player_id] = {
                        id: player.player_id,
                        name: player.player_id,
                        avatar: player.player_id,
                        score: player.score ?? 0
                    }
                }
                return dict
            }, {}))
        }

    }, [gameData]);

    // Return object action select to first position
    useEffect(() => {
        if (currentAction) return
        if (selectedObjects.length <= 0) return

        let currentAnimation: gsap.core.Timeline
        selectedObjects.reverse().forEach(selectedObject => {
            // Reverse animation
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
        setActionBoard({enable: false, position: new Vector3(), rotation: new Euler()})

    }, [currentAction]);

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
    
    const onClickGem = useCallback((id: string, type: TokenGemType) => {
        if (!user) return
        if (status != 1) return
        if (currentAction && currentAction.type != "gather-gem") return

        //
        const player = (gameData?.ingame_data?.player_ids?.indexOf(user.user_id) ?? 0) + 1
        if (player == 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[gameData?.ingame_data?.players?.length ?? 0]?.player[player]
        if (!playerLocate) return

        // Update action if in turn
        if (isMyTurn) {
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: [...(prevState?.gem || []), {
                    id: id,
                    type: type,
                    count: 1
                }]
            }))
        } else {
            return
        }

        // Verify rule game
        const gemsTake = currentAction?.gem?.filter(gem => gem.count > 0) || []
        if (gemsTake.length >= 3) return
        if (gemsTake.length == 2 && gemsTake[0].type == gemsTake[1].type) return

        //
        let playerGems
        let gems
        let gemPosition
        switch (type) {
            case TokenGemType.DIAMOND:
                playerGems = playerDiamonds[user.user_id]
                gems = diamonds
                gemPosition = PlayerPosition.diamond
                break
            case TokenGemType.EMERALD:
                playerGems = playerEmeralds[user.user_id]
                gems = emeralds
                gemPosition = PlayerPosition.emerald
                break
            case TokenGemType.ONYX:
                playerGems = playerOnyxes[user.user_id]
                gems = onyxes
                gemPosition = PlayerPosition.onyx
                break
            case TokenGemType.RUBY:
                playerGems = playerRubies[user.user_id]
                gems = rubies
                gemPosition = PlayerPosition.ruby
                break
            case TokenGemType.SAPPHIRE:
                playerGems = playerSapphires[user.user_id]
                gems = sapphires
                gemPosition = PlayerPosition.sapphire
                break
            default:
                return
        }
        gemPosition = new Vector3().fromArray(gemPosition)
        let idTake: string | undefined
        for (let i = gems.length - 1; i >= 0; i--) {
            idTake = gems[i].id
            if (!currentAction?.gem?.some(gem => gem.id == idTake)) {
                break
            }
        }
        if (!idTake) return

        //
        const instance = gemRefs.current[idTake]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition = instance.position.clone()
        const targetPosition = new Vector3().fromArray(playerLocate.position).add(gemPosition)
        targetPosition.setZ((playerGems.length - 1 + 1) * TokenGemSize.depth)
        const arcHeight = 1.5; // Adjust this value for a bigger/smaller arc
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
        animation.then(() => {
            // Start physics
            instance.startPhysics()
        })
        if (!selectedObjects.some(selectedObject => selectedObject.id == idTake)) {
            setSelectedObjects([...selectedObjects, {
                id: id,
                ref: instance,
                animation: animation
            }])
        }

        // Show action board
        if (selectedObjects.length == 0) {
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

    }, [user, status, gameData, currentAction, selectedObjects, playerDiamonds, diamonds, playerEmeralds, emeralds, playerOnyxes, onyxes, playerRubies, rubies, playerSapphires, sapphires])

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
                                     onClick={() => onClickCardDeck(card.id, card.level)}
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
                    {golds.map((gold: Gem) => (
                        <TokenGem key={gold.id}
                                  id={gold.id}
                                  type={TokenGemType.GOLD}
                                  position={gold.position}
                                  ref={(element: any) => (gemRefs.current[gold.id] = element)}/>
                    ))}
                    {onyxes.map((onyx: Gem) => (
                        <TokenGem key={onyx.id}
                                  id={onyx.id}
                                  type={TokenGemType.ONYX}
                                  onClick={() => onClickGem(onyx.id, TokenGemType.ONYX)}
                                  position={onyx.position}
                                  ref={(element: any) => (gemRefs.current[onyx.id] = element)}/>
                    ))}
                    {rubies.map((ruby: Gem) => (
                        <TokenGem key={ruby.id}
                                  id={ruby.id}
                                  type={TokenGemType.RUBY}
                                  onClick={() => onClickGem(ruby.id, TokenGemType.RUBY)}
                                  position={ruby.position}
                                  ref={(element: any) => (gemRefs.current[ruby.id] = element)}/>
                    ))}
                    {emeralds.map((emerald: Gem) => (
                        <TokenGem key={emerald.id}
                                  id={emerald.id}
                                  type={TokenGemType.EMERALD}
                                  onClick={() => onClickGem(emerald.id, TokenGemType.EMERALD)}
                                  position={emerald.position}
                                  ref={(element: any) => (gemRefs.current[emerald.id] = element)}/>
                    ))}
                    {sapphires.map((sapphire: Gem) => (
                        <TokenGem key={sapphire.id}
                                  id={sapphire.id}
                                  type={TokenGemType.SAPPHIRE}
                                  onClick={() => onClickGem(sapphire.id, TokenGemType.SAPPHIRE)}
                                  position={sapphire.position}
                                  ref={(element: any) => (gemRefs.current[sapphire.id] = element)}/>
                    ))}
                    {diamonds.map((diamond: Gem) => (
                        <TokenGem key={diamond.id}
                                  id={diamond.id}
                                  type={TokenGemType.DIAMOND}
                                  onClick={() => onClickGem(diamond.id, TokenGemType.DIAMOND)}
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
                                     id={player.player_id as string}
                                     data={{...player}}
                                     position={locate.position}
                                     rotation={locate.rotation}/>
                    )
                })}
            </group>

            {actionBoard?.enable && (
                <ActionBoard position={actionBoard.position}
                             rotation={actionBoard.rotation}/>
            )}
        </>
    )
}

export default PlaySpace;