import GemCard, {GemCardSize} from "@/games/splendor/component/3d/GemCard";
import NobleCard, {NobleCardSize} from "@/games/splendor/component/3d/NobleCard";
import React, {useCallback, useEffect, useState} from "react";
import {useThree} from "@react-three/fiber";
import {useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Euler, MathUtils, Quaternion, Vector3} from "three";
import GamePlane from "@/games/splendor/component/3d/GamePlane";
import GameTable, {GameTableSize} from "@/games/splendor/component/3d/GameTable";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref";
import GameController from "@/games/splendor/component/GameController";
import GemToken, {GemTokenSize} from "@/games/splendor/component/3d/GemToken";
import PlayerBoard from "@/games/splendor/component/3d/PlayerBoard";
import {
    CardVO,
    FieldCardVO,
    FieldNobleVO,
    GameService,
    NobleVO,
    SplendorGameDTO
} from "@/games/splendor/service/splendor.service";
import {CardDictionary} from "@/games/splendor/constants/card";
import {
    CardPosition, GemPosition,
    NoblePosition,
    PlayerPosition
} from "@/games/splendor/constants/game";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {generateUUID} from "@/utils";
import ActionDialog, {ActionData} from "@/games/splendor/component/3d/ActionDialog";
import { TokenGemType } from "@/games/splendor/types/gem";
import {toast} from "react-toastify";
import {useUser} from "@/store/user";
import {GemDiamond, GemEmerald, GemGold, GemOnyx, GemRuby, GemSapphire} from "@/games/splendor/constants/gem";
import {Card, Gem, Noble} from "@/games/splendor/types/game";


function GameArea() {
    const {camera} = useThree()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        gameId,
        status, setStatus,
        playerIds, setPlayerIds,
        currentPlayer, setCurrentPlayer,
        setNextPlayer,
        deckCard, setDeckCard,
        fieldCard, setFieldCard,
        gems, setGems,
        deckNoble, setDeckNoble,
        fieldNoble, setFieldNoble,
        players,
        playerGems, setPlayerGems,
        focusObjects, addFocusObjects, removeFocusObjects,
        isMyTurn,
    } = useGameSplendor()
    const {user} = useUser()
    const [gameData, setGameData] = useState<SplendorGameDTO>()
    const [dialog, setDialog] = useState({
        open: false,
        position: [0, 0, 0] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
    })
    const [currentAction, setCurrentAction] = useState<{
        type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble"
        option?: ("gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble")[]
        card?: {
            id: string,
            level: number,
            deck?: boolean,
            ownerId?: string,
            cost: {
                gold?: number
                onyx?: number
                ruby?: number
                emerald?: number
                sapphire?: number
                diamond?: number
            }
        }
        noble?: {id: string}
        gem?: {
            id: string
            type: TokenGemType
            count: number
        }[]
    }>()


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
        if (gameData.status != undefined) {
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
            if (gameData.ingame_data.deck_card1 && gameData.ingame_data.deck_card2 && gameData.ingame_data.deck_card3) {
                const deckCard1 = gameData.ingame_data.deck_card1
                const deckCard2 = gameData.ingame_data.deck_card2
                const deckCard3 = gameData.ingame_data.deck_card3
                setDeckCard({
                    [1]: deckCard1.map((card: CardVO, index: number) => {
                        if (gameData.status == 0) {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[1].desk[0], CardPosition.level[1].desk[1], index * GemCardSize.depth + CardPosition.level[1].desk[2] + 0.2],
                                rotation: [0, 0, 0]
                            };
                        } else {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[1].desk[0], CardPosition.level[1].desk[1], (deckCard1.length - 1 - index) * GemCardSize.depth + CardPosition.level[1].desk[2] + 0.2],
                                rotation: [0, Math.PI, 0]
                            };
                        }
                    }),
                    [2]: deckCard2.map((card: CardVO, index: number) => {
                        if (gameData.status == 0) {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[2].desk[0], CardPosition.level[2].desk[1], index * GemCardSize.depth + CardPosition.level[2].desk[2] + 0.2],
                                rotation: [0, 0, 0]
                            };
                        } else {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[2].desk[0], CardPosition.level[2].desk[1], (deckCard2.length - 1 - index) * GemCardSize.depth + CardPosition.level[2].desk[2] + 0.2],
                                rotation: [0, Math.PI, 0]
                            };
                        }
                    }),
                    [3]: deckCard3.map((card: CardVO, index: number) => {
                        if (gameData.status == 0) {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[3].desk[0], CardPosition.level[3].desk[1], index * GemCardSize.depth + CardPosition.level[3].desk[2] + 0.2],
                                rotation: [0, 0, 0]
                            };
                        } else {
                            return {
                                ...card,
                                ...CardDictionary[card.id],
                                position: [CardPosition.level[3].desk[0], CardPosition.level[3].desk[1], (deckCard3.length - 1 - index) * GemCardSize.depth + CardPosition.level[3].desk[2] + 0.2],
                                rotation: [0, Math.PI, 0]
                            };
                        }
                    })
                })
            }
        }
        // Card open
        {
            if (gameData.ingame_data.field_card3) {
                setFieldCard((prevState) => ({
                    ...prevState,
                    [3]: gameData.ingame_data?.field_card3?.filter((fieldCard: FieldCardVO) => fieldCard.card)
                        .map((fieldCard: FieldCardVO) => {
                            const position = CardPosition.level[3].field[fieldCard.position ?? 0]
                            return {
                                ...fieldCard.card,
                                ...CardDictionary[fieldCard.card?.id ?? ''],
                                position: [position[0], position[1], position[2] + 0.2],
                                rotation: [0, 0, 0]
                            }
                        }) as Card[]
                }))
            }
            if (gameData.ingame_data.field_card2) {
                setFieldCard((prevState) => ({
                    ...prevState,
                    [2]: gameData.ingame_data?.field_card2?.filter((fieldCard: FieldCardVO) => fieldCard.card)
                        .map((fieldCard: FieldCardVO) => {
                            const position = CardPosition.level[2].field[fieldCard.position ?? 0]
                            return {
                                ...fieldCard.card,
                                ...CardDictionary[fieldCard.card?.id || ''],
                                position: [position[0], position[1], position[2] + 0.2],
                                rotation: [0, 0, 0]
                            }
                        }) as Card[]
                }))
            }
            if (gameData.ingame_data.field_card1) {
                setFieldCard((prevState) => ({
                    ...prevState,
                    [1]: gameData.ingame_data?.field_card1?.filter((fieldCard: FieldCardVO) => fieldCard.card)
                        .map((fieldCard: FieldCardVO) => {
                            const position = CardPosition.level[1].field[fieldCard.position ?? 0]
                            return {
                                ...fieldCard.card,
                                ...CardDictionary[fieldCard.card?.id || ''],
                                position: [position[0], position[1], position[2] + 0.2],
                                rotation: [0, 0, 0]
                            }
                        }) as Card[]
                }))
            }
        }
        // Gem
        {
            setGems({
                [TokenGemType.GOLD]: Array.from({length: gameData.ingame_data?.gold ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemGold,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.gold[0], GemPosition.gold[1], index * GemTokenSize.depth + GemPosition.gold[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.ONYX]: Array.from({length: gameData.ingame_data?.onyx ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemOnyx,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.onyx[0], GemPosition.onyx[1], index * GemTokenSize.depth + GemPosition.onyx[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.RUBY]: Array.from({length: gameData.ingame_data?.ruby ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemRuby,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.ruby[0], GemPosition.ruby[1], index * GemTokenSize.depth + GemPosition.ruby[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.EMERALD]: Array.from({length: gameData.ingame_data?.emerald ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemEmerald,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.emerald[0], GemPosition.emerald[1], index * GemTokenSize.depth + GemPosition.emerald[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.SAPPHIRE]: Array.from({length: gameData.ingame_data?.sapphire ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemSapphire,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.sapphire[0], GemPosition.sapphire[1], index * GemTokenSize.depth + GemPosition.sapphire[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }),
                [TokenGemType.DIAMOND]: Array.from({length: gameData.ingame_data?.diamond ?? 0}, (_, i) => i)
                    .map((index) => {
                        return {
                            ...GemDiamond,
                            id: generateUUID(),
                            owner: "",
                            position: [GemPosition.diamond[0], GemPosition.diamond[1], index * GemTokenSize.depth + GemPosition.diamond[2] + 0.2],
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
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], index * NobleCardSize.depth + NoblePosition.desk[2] + 0.2],
                            rotation: [0, 0, 0]
                        };
                    } else {
                        return {
                            ...noble,
                            ...NobleDictionary[noble.id ?? ''],
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], (deckNoble.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2] + 0.2],
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

    // Return object action select to first position + disable action board
    // useEffect(() => {
    //     if (!currentAction) {
    //         if (selectedCards.length > 0) {
    //             // Reverse animation
    //             let currentAnimation: gsap.core.Timeline
    //             selectedCards.reverse().forEach(selectedCard => {
    //                 if (currentAnimation) {
    //                     currentAnimation.eventCallback("onReverseComplete", () => {
    //                         selectedCard.animation
    //                             .call(() => {
    //                                 // Stop physics
    //                                 selectedCard.ref.stopPhysics()
    //                             })
    //                             .reverse()
    //                             .then(() => {
    //                                 // Start physics
    //                                 selectedCard.ref.startPhysics()
    //                             })
    //                     })
    //                 } else {
    //                     selectedCard.animation
    //                         .call(() => {
    //                             // Stop physics
    //                             selectedCard.ref.stopPhysics()
    //                         })
    //                         .reverse()
    //                         .then(() => {
    //                             // Start physics
    //                             selectedCard.ref.startPhysics()
    //                         })
    //                 }
    //
    //                 currentAnimation = selectedCard.animation
    //             })
    //
    //             setSelectedCards([])
    //         }
    //         if (selectedNobles.length > 0) {
    //             // Reverse animation
    //             let currentAnimation: gsap.core.Timeline
    //             selectedNobles.reverse().forEach(selectedNoble => {
    //                 if (currentAnimation) {
    //                     currentAnimation.eventCallback("onReverseComplete", () => {
    //                         selectedNoble.animation
    //                             .call(() => {
    //                                 // Stop physics
    //                                 selectedNoble.ref.stopPhysics()
    //                             })
    //                             .reverse()
    //                             .then(() => {
    //                                 // Start physics
    //                                 selectedNoble.ref.startPhysics()
    //                             })
    //                     })
    //                 } else {
    //                     selectedNoble.animation
    //                         .call(() => {
    //                             // Stop physics
    //                             selectedNoble.ref.stopPhysics()
    //                         })
    //                         .reverse()
    //                         .then(() => {
    //                             // Start physics
    //                             selectedNoble.ref.startPhysics()
    //                         })
    //                 }
    //
    //                 currentAnimation = selectedNoble.animation
    //             })
    //
    //             setSelectedNobles([])
    //         }
    //         if (selectedGems.length > 0) {
    //             const animation = gsap.timeline()
    //             selectedGems.reverse().forEach(selectedGem => {
    //                 const instance = gemRefs.current[selectedGem.id]
    //
    //                 // Stop physics
    //                 instance.stopPhysics()
    //
    //                 // Animation
    //                 const startPosition = gemRefs.current[selectedGem.id].position.clone()
    //                 const targetPosition = selectedGem.oldPosition
    //                 const targetRotation = selectedGem.oldRotation
    //                 const arcHeight = 1.5
    //                 animation.add(gsap.timeline()
    //                     .to(instance.position, {
    //                         x: targetPosition.x,
    //                         y: targetPosition.y,
    //                         duration: 0.3,
    //                         onUpdate: function () {
    //                             const progress = this.progress() // Progress from 0 → 1
    //                             instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
    //                         }
    //                     })
    //                     .to(instance.rotation, {
    //                         x: targetRotation.x,
    //                         y: targetRotation.y,
    //                         z: targetRotation.z,
    //                         duration: 0.3
    //                     }, "<")
    //                     .call(() => {
    //                         // Start physics
    //                         gemRefs.current[selectedGem.id].startPhysics()
    //
    //                         // Update state
    //                         if (selectedGem.owner) {
    //                             setGems((prevState) => ({
    //                                 ...prevState,
    //                                 [selectedGem.type]: prevState[selectedGem.type].filter(gem => gem.id != selectedGem.id)
    //                             }))
    //                             setPlayerGems((prevState) => ({
    //                                 ...prevState,
    //                                 [currentPlayer]: ({
    //                                     ...prevState[currentPlayer],
    //                                     [selectedGem.type]: [
    //                                         ...prevState[currentPlayer][selectedGem.type],
    //                                         {
    //                                             id: selectedGem.id,
    //                                             position: targetPosition.toArray(),
    //                                             rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
    //                                         }
    //                                     ]
    //                                 })
    //                             }))
    //                         } else {
    //                             setGems((prevState) => ({
    //                                 ...prevState,
    //                                 [selectedGem.type]: [
    //                                     ...(prevState[selectedGem.type]),
    //                                     {
    //                                         id: selectedGem.id,
    //                                         position: targetPosition.toArray(),
    //                                         rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
    //                                     }
    //                                 ],
    //                             }))
    //                             setPlayerGems((prevState) => ({
    //                                 ...prevState,
    //                                 [currentPlayer]: ({
    //                                     ...prevState[currentPlayer],
    //                                     [selectedGem.type]: prevState[currentPlayer][selectedGem.type].filter(gem => gem.id != selectedGem.id)
    //                                 })
    //                             }))
    //                         }
    //                     }))
    //             })
    //
    //             setSelectedGems([])
    //         }
    //     }
    //
    // }, [currentAction])

    const onClickNoble = useCallback((noble: Noble) => {
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

    }, [currentAction, isMyTurn, focusObjects])

    const onClickDeckCard = useCallback((card: Card) => {
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

    }, [status, currentAction, isMyTurn])

    const onClickCard = useCallback((card: Card) => {
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

    }, [currentAction, isMyTurn, focusObjects])

    const onClickGem = useCallback((gem: Gem) =>  {
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

    }, [gameData, status, playerIds, currentPlayer, players, gems, playerGems, focusObjects, currentAction, isMyTurn, dialog])

    const onClickPlayerGem = useCallback((playerId: string, gem: Gem) => {
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

    }, [user, playerIds, currentAction, isMyTurn, gems, playerGems, dialog])

    const onClickPlayerReserveCard = useCallback((playerId: string, card: Card) => {
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


    }, [user, currentAction, isMyTurn])

    // const onClickNotCurrentCard = useCallback((id: string) => {
    //     if (currentAction) return
    //
    //     selectedCards.filter(selectedCard => selectedCard.id == id)
    //         .forEach(selectedCard => {
    //             // Reverse animation
    //             selectedCard.animation
    //                 .call(() => {
    //                     // Stop physics
    //                     selectedCard.ref.stopPhysics()
    //                 })
    //                 .reverse()
    //                 .then(() => {
    //                     // Start physics
    //                     selectedCard.ref.startPhysics()
    //                 })
    //         })
    //
    //     setSelectedCards((prevState) => prevState.filter(selectedCard => selectedCard.id != id))
    // }, [currentAction, selectedCards])

    // const onClickNotCurrentNoble = useCallback((id: string) => {
    //     if (currentAction) return
    //
    //     selectedNobles.filter(selectedNoble => selectedNoble.id == id)
    //         .forEach(selectedNoble => {
    //             // Reverse animation
    //             selectedNoble.animation
    //                 .call(() => {
    //                     // Stop physics
    //                     selectedNoble.ref.stopPhysics()
    //                 })
    //                 .reverse()
    //                 .then(() => {
    //                     // Start physics
    //                     selectedNoble.ref.startPhysics()
    //                 })
    //         })
    //
    //     setSelectedNobles((prevState) => prevState.filter(selectedNoble => selectedNoble.id != id))
    // }, [currentAction, selectedNobles])

    const onCancelAction = useCallback(() => {
        setDialog({
            open: false,
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        })
        setCurrentAction(undefined)
    }, [])

    const onConfirmAction = useCallback((action: ActionData) => {
        const startActionGatherGem = (data: ActionData) => {
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
        const startActionBuyCard = (data: ActionData) => {
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
        const startActionReserveCard = (data: ActionData) => {
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
        const startActionTakeNoble = (data: ActionData) => {
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
    }, [gameId])

    const onSelectAction = useCallback((action: ActionData) => {
        setCurrentAction(action)
    }, [])

    return (
        <>
            <GameController/>
            <OrbitControls/>
            <ambientLight intensity={2}/>
            <GamePlane position={[0, 0, -5]}/>
            <GameTable position={[0, 0, -GameTableSize.depth / 2]}/>
            <group>
                <group>
                    {
                        deckCard[3]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickDeckCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard[2]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickDeckCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard[1]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickDeckCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {
                        fieldCard[3]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     // onClickNotThis={() => onClickNotCurrentCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard[2]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     // onClickNotThis={() => onClickNotCurrentCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard[1]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     // onClickNotThis={() => onClickNotCurrentCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {gems.gold.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.onyx.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.ruby.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.emerald.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.sapphire.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.diamond.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                </group>
                <group>
                    {deckNoble.map((noble) => (
                        <NobleCard key={noble.id}
                                   id={noble.id}
                                   url={noble.url}
                                   position={noble.position}
                                   rotation={noble.rotation}
                                   ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                    ))}
                    {fieldNoble.map((noble) => (
                        <NobleCard key={noble.id}
                                   id={noble.id}
                                   url={noble.url}
                                   onClick={() => onClickNoble(noble)}
                                   // onClickNotThis={() => onClickNotCurrentNoble(noble.id)}
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
                        <PlayerBoard key={player.player_id}
                                     playerId={player.player_id as string}
                                     playerData={player}
                                     position={locate.position}
                                     rotation={locate.rotation}
                                     onClickGem={(gem) => onClickPlayerGem(player.player_id as string, gem)}
                                     onClickReserveCard={(card) => onClickPlayerReserveCard(player.player_id as string, card)}/>
                    )
                })}
            </group>


            <ActionDialog open={dialog.open}
                          position={dialog.position}
                          rotation={dialog.rotation}
                          data={currentAction && {...currentAction}}
                          onCancelAction={onCancelAction}
                          onConfirmAction={onConfirmAction}
                          onSelectAction={onSelectAction}/>
        </>
    )
}

export default GameArea;