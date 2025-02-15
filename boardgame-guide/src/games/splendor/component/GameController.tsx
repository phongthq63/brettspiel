import React, {memo, useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {useUser} from "@/store/user";
import {
    Card,
    CardPosition, DiamondPosition, EmeraldPosition, GoldPosition,
    Noble,
    NoblePosition,
    NotifyGameSplendorStart,
    NotifyGameSplendorTurnEnd, OnyxPosition, RubyPosition, SapphirePosition
} from "@/games/splendor/constants/game";
import {CardVO, FieldCardVO, FieldNobleVO, NobleVO} from "@/games/splendor/service/splendor.service";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import {CardDictionary} from "@/games/splendor/constants/card";
import {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import gsap from "gsap";
import {useSharedRef} from "@/games/splendor/store/ref";
import {TokenGoldSize} from "@/games/splendor/component/3d/TokenGold";
import {TokenOnyxSize} from "@/games/splendor/component/3d/TokenOnyx";
import {TokenRubySize} from "@/games/splendor/component/3d/TokenRuby";
import {TokenEmeraldSize} from "@/games/splendor/component/3d/TokenEmerald";
import {TokenSapphireSize} from "@/games/splendor/component/3d/TokenSapphire";
import {TokenDiamondSize} from "@/games/splendor/component/3d/TokenDiamond";

function GameController() {
    const { user } = useUser()
    const { socket, connected } = useSocket()
    const { cardRefs, nobleRefs } = useSharedRef()
    const { gameData,
        setStatus,
        setCurrentPlayer,
        setNextPlayer,
        deckCard3, setDeckCard3,
        deckCard2, setDeckCard2,
        deckCard1, setDeckCard1,
        setFieldCard3,
        setFieldCard2,
        setFieldCard1,
        setGolds,
        setOnyxes,
        setRubies,
        setEmeralds,
        setSapphires,
        setDiamonds,
        deckNoble, setDeckNoble,
        setFieldNoble
    } = useGameSplendor()



    // Socket join room game
    useEffect(() => {
        if (user && gameData && connected) {
            RoomService.joinRoom({ body: { user_id: user.user_id, room_id: gameData.game_id } })
                .then(response => {
                    if (response.code == 0) {
                        console.log("Join room successfully", user.user_id, gameData.game_id)
                    } else {
                        console.log("Join room fail", user.user_id, gameData.game_id)
                    }
                })
                .catch(error => {
                    console.log("Join room error", error);
                });
        }
    }, [connected, gameData, user]);

    // Update game state
    useEffect(() => {
        if (!gameData) return

        // Deck card
        {
            setDeckCard3(gameData.ingame_data.deck_card3.map((card: CardVO, index: number) => {
                if (gameData.status == 0) {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level3.desk[0], CardPosition.level3.desk[1], index * CardGemSize.depth + CardPosition.level3.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    };
                } else {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level3.desk[0], CardPosition.level3.desk[1], (gameData.ingame_data.deck_card3.length - 1 - index) * CardGemSize.depth + CardPosition.level3.desk[2] + 0.2],
                        rotation: [0, Math.PI, 0]
                    };
                }
            }));
            setDeckCard2(gameData.ingame_data.deck_card2.map((card: CardVO, index: number) => {
                if (gameData.status == 0) {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level2.desk[0], CardPosition.level2.desk[1], index * CardGemSize.depth + CardPosition.level2.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    };
                } else {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level2.desk[0], CardPosition.level2.desk[1], (gameData.ingame_data.deck_card2.length - 1 - index) * CardGemSize.depth + CardPosition.level2.desk[2] + 0.2],
                        rotation: [0, Math.PI, 0]
                    };
                }
            }));
            setDeckCard1(gameData.ingame_data.deck_card1.map((card: CardVO, index: number) => {
                if (gameData.status == 0) {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level1.desk[0], CardPosition.level1.desk[1], index * CardGemSize.depth + CardPosition.level1.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    };
                } else {
                    return {
                        ...card,
                        ...CardDictionary[card.id],
                        position: [CardPosition.level1.desk[0], CardPosition.level1.desk[1], (gameData.ingame_data.deck_card1.length - 1 - index) * CardGemSize.depth + CardPosition.level1.desk[2] + 0.2],
                        rotation: [0, Math.PI, 0]
                    };
                }
            }));
        }
        // Card open
        {
            setFieldCard3(gameData.ingame_data.field_card3.filter((fieldCard: FieldCardVO) => fieldCard.card)
                .map((fieldCard: FieldCardVO) => {
                    let position;
                    switch (fieldCard.position) {
                        case 0:
                            position = CardPosition.level3.position1
                            break
                        case 1:
                            position = CardPosition.level3.position2
                            break
                        case 2:
                            position = CardPosition.level3.position3
                            break
                        case 3:
                            position = CardPosition.level3.position4
                            break
                        default:
                            throw Error("Invalid card position")
                    }
                    if (fieldCard.card) {
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card.id],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }
                }))
            setFieldCard2(gameData.ingame_data.field_card2.filter((fieldCard: FieldCardVO) => fieldCard.card)
                .map((fieldCard: FieldCardVO) => {
                    let position;
                    switch (fieldCard.position) {
                        case 0:
                            position = CardPosition.level2.position1
                            break
                        case 1:
                            position = CardPosition.level2.position2
                            break
                        case 2:
                            position = CardPosition.level2.position3
                            break
                        case 3:
                            position = CardPosition.level2.position4
                            break
                        default:
                            throw Error("Invalid card position")
                    }
                    if (fieldCard.card) {
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card.id],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }
                }))
            setFieldCard1(gameData.ingame_data.field_card1.filter((fieldCard: FieldCardVO) => fieldCard.card)
                .map((fieldCard: FieldCardVO) => {
                    let position;
                    switch (fieldCard.position) {
                        case 0:
                            position = CardPosition.level1.position1
                            break
                        case 1:
                            position = CardPosition.level1.position2
                            break
                        case 2:
                            position = CardPosition.level1.position3
                            break
                        case 3:
                            position = CardPosition.level1.position4
                            break
                        default:
                            throw Error("Invalid card position")
                    }
                    if (fieldCard.card) {
                        return {
                            ...fieldCard.card,
                            ...CardDictionary[fieldCard.card.id],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }
                }))
        }
        // Gem
        {
            setGolds(Array.from({length: gameData.ingame_data.gold}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [GoldPosition.desk[0], GoldPosition.desk[1], index * TokenGoldSize.depth + GoldPosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
            setOnyxes(Array.from({length: gameData.ingame_data.onyx}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [OnyxPosition.desk[0], OnyxPosition.desk[1], index * TokenOnyxSize.depth + OnyxPosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
            setRubies(Array.from({length: gameData.ingame_data.ruby}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [RubyPosition.desk[0], RubyPosition.desk[1], index * TokenRubySize.depth + RubyPosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
            setEmeralds(Array.from({length: gameData.ingame_data.emerald}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [EmeraldPosition.desk[0], EmeraldPosition.desk[1], index * TokenEmeraldSize.depth + EmeraldPosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
            setSapphires(Array.from({length: gameData.ingame_data.sapphire}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [SapphirePosition.desk[0], SapphirePosition.desk[1], index * TokenSapphireSize.depth + SapphirePosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
            setDiamonds(Array.from({length: gameData.ingame_data.diamond}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: "",
                        position: [DiamondPosition.desk[0], DiamondPosition.desk[1], index * TokenDiamondSize.depth + DiamondPosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                }))
        }
        // Noble
        {
            setDeckNoble(gameData.ingame_data.deck_noble.map((noble: NobleVO, index: number) => {
                if (gameData.status == 0) {
                    return {
                        ...noble,
                        ...NobleDictionary[noble.id],
                        position: [NoblePosition.desk[0], NoblePosition.desk[1], index * CardNobleSize.depth + NoblePosition.desk[2] + 0.2],
                        rotation: [0, 0, 0]
                    };
                } else {
                    return {
                        ...noble,
                        ...NobleDictionary[noble.id],
                        position: [NoblePosition.desk[0], NoblePosition.desk[1], (gameData.ingame_data.deck_noble.length - 1 - index) * CardNobleSize.depth + NoblePosition.desk[2] + 0.2],
                        rotation: [0, Math.PI, 0]
                    };
                }
            }))
        }
        // Noble open
        {
            setFieldNoble(gameData.ingame_data.field_noble.filter((fieldNoble: FieldNobleVO) => fieldNoble.noble)
                .map((fieldNoble: FieldNobleVO) => {
                    let position;
                    switch (fieldNoble.position) {
                        case 0:
                            position = NoblePosition.position1
                            break
                        case 1:
                            position = NoblePosition.position2
                            break
                        case 2:
                            position = NoblePosition.position3
                            break
                        case 3:
                            position = NoblePosition.position4
                            break
                        case 4:
                            position = NoblePosition.position5
                            break
                        default:
                            throw Error("Invalid noble position")
                    }
                    if (fieldNoble.noble) {
                        return {
                            ...fieldNoble.noble,
                            ...NobleDictionary[fieldNoble.noble.id],
                            position: [position[0], position[1], position[2] + 0.2],
                            rotation: [0, 0, 0]
                        }
                    }
                }))
        }

        //
        setStatus(gameData.status)
        setCurrentPlayer(gameData.ingame_data.current_player)
        setNextPlayer(gameData.ingame_data.next_player)

    }, [gameData]);


    const handlerStartGame = (data: any) => {
        console.log(data)
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
            let position;
            switch (field.position) {
                case 0:
                    position = CardPosition.level3.position1;
                    break
                case 1:
                    position = CardPosition.level3.position2;
                    break
                case 2:
                    position = CardPosition.level3.position3;
                    break
                case 3:
                    position = CardPosition.level3.position4;
                    break
                default:
                    throw new Error(`Invalid open card position ${field.position}`)
            }
            return {
                ...field.card,
                ...CardDictionary[field.card.id],
                position: position,
                rotation: [0, 0, 0]
            }
        })
        const card2Opens: Card[] = fieldCard2.map((field: any) => {
            let position;
            switch (field.position) {
                case 0:
                    position = CardPosition.level2.position1;
                    break
                case 1:
                    position = CardPosition.level2.position2;
                    break
                case 2:
                    position = CardPosition.level2.position3;
                    break
                case 3:
                    position = CardPosition.level2.position4;
                    break
                default:
                    throw new Error(`Invalid open card position ${field.position}`)
            }
            return {
                ...field.card,
                ...CardDictionary[field.card.id],
                position: position,
                rotation: [0, 0, 0]
            }
        })
        const card1Opens: Card[] = fieldCard1.map((field: any) => {
            let position;
            switch (field.position) {
                case 0:
                    position = CardPosition.level1.position1;
                    break
                case 1:
                    position = CardPosition.level1.position2;
                    break
                case 2:
                    position = CardPosition.level1.position3;
                    break
                case 3:
                    position = CardPosition.level1.position4;
                    break
                default:
                    throw new Error(`Invalid open card position ${field.position}`)
            }
            return {
                ...field.card,
                ...CardDictionary[field.card.id],
                position: position,
                rotation: [0, 0, 0]
            }
        })
        const nobleOpens: Noble[] = fieldNoble.map((field: any) => {
            let position;
            switch (field.position) {
                case 0:
                    position = NoblePosition.position1;
                    break
                case 1:
                    position = NoblePosition.position2;
                    break
                case 2:
                    position = NoblePosition.position3;
                    break
                case 3:
                    position = NoblePosition.position4;
                    break
                case 4:
                    position = NoblePosition.position5;
                    break
                default:
                    throw new Error(`Invalid open card position ${field.position}`)
            }
            return {
                ...field.noble,
                ...NobleDictionary[field.noble.id],
                position: position,
                rotation: [0, 0, 0]
            }
        })

        // Animation description
        {
            // Timeline shuffle deck card 3
            {
                deckCard3.forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];

                    const height = 0.8
                    timelineDeckCard3.add(gsap.timeline()
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + CardPosition.level3.desk[2],
                                duration: 0.35
                            })
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + ((deckCard3.length - 1) / 2 - index * 2) * CardGemSize.depth,
                                duration: 0.2
                            })
                            .to(instance.rotation, {
                                y: Math.PI,
                                duration: 0.2
                            }, "<")
                            .to(instance.position, {
                                z: (deckCard3.length - 1 - index) * CardGemSize.depth + CardPosition.level3.desk[2],
                                duration: 0.25
                            })
                        , 0);
                });
                timelineDeckCard3.call(() => {
                    const newDeck = fieldCard3.map((cardOpen: any) => deckCard3.find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard3.filter((card: Card) => !fieldCard3.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level3.desk[0], CardPosition.level3.desk[1], (deckCard3.length - 1 - index) * CardGemSize.depth + CardPosition.level3.desk[2]],
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
                deckCard2.forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];

                    const height = 0.8
                    timelineDeckCard2.add(gsap.timeline()
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + CardPosition.level2.desk[2],
                                duration: 0.35
                            })
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + ((deckCard2.length - 1) / 2 - index * 2) * CardGemSize.depth,
                                duration: 0.2
                            })
                            .to(instance.rotation, {
                                y: Math.PI,
                                duration: 0.2
                            }, "<")
                            .to(instance.position, {
                                z: (deckCard2.length - 1 - index) * CardGemSize.depth + CardPosition.level2.desk[2],
                                duration: 0.25
                            })
                        , 0);
                });
                timelineDeckCard2.call(() => {
                    const newDeck = fieldCard2.map((cardOpen: any) => deckCard2.find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard2.filter((card: Card) => !fieldCard2.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: any) => {
                            return {
                                ...card,
                                position: [CardPosition.level2.desk[0], CardPosition.level2.desk[1], (deckCard2.length - 1 - index) * CardGemSize.depth + CardPosition.level2.desk[2]],
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
                deckCard1.forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];

                    const height = 0.8
                    timelineDeckCard1.add(gsap.timeline()
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + CardPosition.level1.desk[2],
                                duration: 0.35
                            })
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + ((deckCard1.length - 1) / 2 - index * 2) * CardGemSize.depth,
                                duration: 0.2
                            })
                            .to(instance.rotation, {
                                y: Math.PI,
                                duration: 0.2
                            }, "<")
                            .to(instance.position, {
                                z: (deckCard1.length - 1 - index) * CardGemSize.depth + CardPosition.level1.desk[2],
                                duration: 0.25
                            })
                        , 0);
                });
                timelineDeckCard1.call(() => {
                    const newDeck = fieldCard1.map((cardOpen: any) => deckCard1.find((card: Card) => card.id == cardOpen.card.id))
                        .concat(deckCard1.filter((card: Card) => !fieldCard1.some((cardOpen: any) => card.id == cardOpen.card.id)))
                        .map((card: Card, index: number) => {
                            return {
                                ...card,
                                position: [CardPosition.level1.desk[0], CardPosition.level1.desk[1], (deckCard1.length - 1 - index) * CardGemSize.depth + CardPosition.level1.desk[2]],
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
                                z: index * CardNobleSize.depth + height + NoblePosition.desk[2],
                                duration: 0.35
                            })
                            .to(instance.position, {
                                z: index * CardNobleSize.depth + height + ((deckNoble.length - 1) / 2 - index * 2) * CardNobleSize.depth,
                                duration: 0.2
                            })
                            .to(instance.rotation, {
                                y: Math.PI,
                                duration: 0.2
                            }, "<")
                            .to(instance.position, {
                                z: (deckNoble.length - 1 - index) * CardNobleSize.depth + NoblePosition.desk[2],
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
                                position: [NoblePosition.desk[0], NoblePosition.desk[1], (deckNoble.length - 1 - index) * CardNobleSize.depth + NoblePosition.desk[2]],
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
                    let position;
                    switch (field.position) {
                        case 0:
                            position = CardPosition.level3.position1;
                            break
                        case 1:
                            position = CardPosition.level3.position2;
                            break
                        case 2:
                            position = CardPosition.level3.position3;
                            break
                        case 3:
                            position = CardPosition.level3.position4;
                            break
                        default:
                            throw new Error(`Invalid open card position ${field.position}`)
                    }

                    const startX = instance.position.x;
                    const endX = position[0];
                    const endY = position[1];
                    const startZ = instance.position.z;
                    const endZ = position[2];
                    const peakHeight = 0.8;
                    timelineOpenField3.add(gsap.timeline()
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: () => {
                                const currentX = instance.position.x;
                                instance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            z: endZ,
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
                    let position;
                    switch (field.position) {
                        case 0:
                            position = CardPosition.level2.position1;
                            break
                        case 1:
                            position = CardPosition.level2.position2;
                            break
                        case 2:
                            position = CardPosition.level2.position3;
                            break
                        case 3:
                            position = CardPosition.level2.position4;
                            break
                        default:
                            throw new Error(`Invalid open card position ${field.position}`)
                    }

                    const startX = instance.position.x;
                    const endX = position[0];
                    const endY = position[1];
                    const startZ = instance.position.z;
                    const endZ = position[2];
                    const peakHeight = 0.8;
                    timelineOpenField2.add(gsap.timeline()
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: () => {
                                const currentX = instance.position.x;
                                instance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            z: endZ,
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
                    let position;
                    switch (field.position) {
                        case 0:
                            position = CardPosition.level1.position1;
                            break
                        case 1:
                            position = CardPosition.level1.position2;
                            break
                        case 2:
                            position = CardPosition.level1.position3;
                            break
                        case 3:
                            position = CardPosition.level1.position4;
                            break
                        default:
                            throw new Error(`Invalid open card position ${field.position}`)
                    }

                    const startX = instance.position.x;
                    const endX = position[0];
                    const endY = position[1];
                    const startZ = instance.position.z;
                    const endZ = position[2];
                    const peakHeight = 0.8;
                    timelineOpenField1.add(gsap.timeline()
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            duration: 0.3,
                            ease: "power1.out",
                            onUpdate: () => {
                                const currentX = instance.position.x;
                                instance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                            }
                        })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            z: endZ,
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
                    let position;
                    switch (field.position) {
                        case 0:
                            position = NoblePosition.position1;
                            break
                        case 1:
                            position = NoblePosition.position2;
                            break
                        case 2:
                            position = NoblePosition.position3;
                            break
                        case 3:
                            position = NoblePosition.position4;
                            break
                        case 4:
                            position = NoblePosition.position5;
                            break
                        default:
                            throw new Error(`Invalid open card position ${field.position}`)
                    }

                    const endX = position[0];
                    const startY = instance.position.y;
                    const endY = position[1];
                    const startZ = instance.position.z;
                    const endZ = position[2];
                    const peakHeight = 0.8;
                    timelineOpenNoble.to(instance.position, {
                        x: endX,
                        y: endY,
                        duration: 0.3,
                        ease: "power1.out",
                        onUpdate: () => {
                            const currentY = instance.position.y;
                            instance.position.z = (startZ - peakHeight) / Math.pow((startY + endY) / 2 - startY, 2) * Math.pow(currentY - (startY + endY) / 2, 2) + peakHeight;
                        }
                    })
                        .to(instance.rotation, {
                            y: 0,
                            duration: 0.3,
                        }, "<")
                        .to(instance.position, {
                            x: endX,
                            y: endY,
                            z: endZ,
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
                deckCard3.forEach((card: Card) => {
                    cardRefs.current[card.id].stopPhysics()
                })
                deckCard2.forEach((card: Card) => {
                    cardRefs.current[card.id].stopPhysics()
                })
                deckCard1.forEach((card: Card) => {
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
                deckCard3.forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckCard2.forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckCard1.forEach((card: Card) => {
                    cardRefs.current[card.id].startPhysics()
                })
                deckNoble.forEach((noble: Noble) => {
                    nobleRefs.current[noble.id].startPhysics()
                })

                // Save state
                setDeckCard3((oldDeckCard: Card[]) => {
                    const newDeck = oldDeckCard.filter((card: Card) => !fieldCard3.some((field: any) => card.id == field.card.id))
                    return newDeck.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level3.desk[0], CardPosition.level3.desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level3.desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setDeckCard2((oldDeckCard: Card[]) => {
                    const newDeck = oldDeckCard.filter((card: Card) => !fieldCard2.some((field: any) => card.id == field.card.id))
                    return newDeck.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level2.desk[0], CardPosition.level2.desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level2.desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setDeckCard1((oldDeckCard: Card[]) => {
                    const newDeck = oldDeckCard.filter((card: Card) => !fieldCard1.some((field: any) => card.id == field.card.id))
                    return newDeck.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level1.desk[0], CardPosition.level1.desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level1.desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setFieldCard3(card3Opens)
                setFieldCard2(card2Opens)
                setFieldCard1(card1Opens)
                // Noble
                setDeckNoble((oldDeckNoble: Noble[]) => {
                    const newDeck = oldDeckNoble.filter((noble: Noble) => !fieldNoble.some((field: any) => noble.id == field.noble.id))
                    return newDeck.map((noble: Noble, index: number) => {
                        return {
                            ...noble,
                            position: [NoblePosition.desk[0], NoblePosition.desk[1], (newDeck.length - 1 - index) * CardNobleSize.depth + NoblePosition.desk[2]],
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

    // Handler socket event
    useEffect(() => {
        function onEventGameSplendor(data: any) {
            const cmdSocket = data?.cmd
            const dataSocket = data.data
            switch (cmdSocket) {
                case NotifyGameSplendorStart:
                    handlerStartGame(dataSocket)
                    break;
                case NotifyGameSplendorTurnEnd:
                    handlerTurnEnd(dataSocket)
                    break;
            }
        }

        const handlerTurnEnd = (data: any) => {
            // setGameData((stateData: any) => {
            //     const ingameData = {...stateData.ingame_data, current_player: data.current_player, next_player: data.next_player}
            //     return {...stateData, ingame_data: ingameData}
            // })
        }


        if (socket) {
            socket.on("game_splendor", onEventGameSplendor);
        }
        
        return () => {
            if (socket) {
                socket.off("game_splendor", onEventGameSplendor);
            }
        }
    }, [socket, handlerStartGame]);

    return <></>
}

export default memo(GameController);