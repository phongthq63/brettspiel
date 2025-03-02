import React, {memo, useCallback, useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {Card, Noble, useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {useUser} from "@/store/user";
import {
    CardPosition, NoblePosition,
    NotifyGameSplendorStart,
    NotifyGameSplendorTurnEnd
} from "@/games/splendor/constants/game";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import {CardDictionary} from "@/games/splendor/constants/card";
import {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import gsap from "gsap";
import {useSharedRef} from "@/games/splendor/store/ref";
import {MathUtils} from "three";


function GameController() {
    const { user } = useUser()
    const { socket, connected } = useSocket()
    const { cardRefs, nobleRefs } = useSharedRef()
    const { gameId,
        setStatus,
        setCurrentPlayer,
        setNextPlayer,
        deckCard3, setDeckCard3,
        deckCard2, setDeckCard2,
        deckCard1, setDeckCard1,
        setFieldCard3,
        setFieldCard2,
        setFieldCard1,
        deckNoble, setDeckNoble,
        setFieldNoble,
    } = useGameSplendor()


    // Socket join room game
    useEffect(() => {
        if (user && gameId && connected) {
            RoomService.joinRoom({ body: { user_id: user.user_id, room_id: gameId } })
                .then(response => {
                    if (response.code == 0) {
                        console.log("Join room successfully", user.user_id, gameId)
                    } else {
                        console.log("Join room fail", user.user_id, gameId)
                    }
                })
                .catch(error => {
                    console.log("Join room error", error);
                });
        }
    }, [connected, gameId, user]);


    const handlerStartGame = useCallback((data: any) => {
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
                deckCard3.forEach((card: Card, index: number) => {
                    const instance = cardRefs.current[card.id];
                    const height = 0.8
                    timelineDeckCard3.add(gsap.timeline()
                            .to(instance.position, {
                                z: index * CardGemSize.depth + height + CardPosition.level[card.level].desk[2],
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
                                z: (deckCard3.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2],
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
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard3.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
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
                                z: index * CardGemSize.depth + height + CardPosition.level[card.level].desk[2],
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
                                z: (deckCard2.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2],
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
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard2.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
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
                                z: index * CardGemSize.depth + height + CardPosition.level[card.level].desk[2],
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
                                z: (deckCard1.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2],
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
                                position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (deckCard1.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
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
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setDeckCard2((oldDeckCard: Card[]) => {
                    const newDeck = oldDeckCard.filter((card: Card) => !fieldCard2.some((field: any) => card.id == field.card.id))
                    return newDeck.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
                            rotation: [0, Math.PI, 0]
                        }
                    })
                })
                setDeckCard1((oldDeckCard: Card[]) => {
                    const newDeck = oldDeckCard.filter((card: Card) => !fieldCard1.some((field: any) => card.id == field.card.id))
                    return newDeck.map((card: Card, index: number) => {
                        return {
                            ...card,
                            position: [CardPosition.level[card.level].desk[0], CardPosition.level[card.level].desk[1], (newDeck.length - 1 - index) * CardGemSize.depth + CardPosition.level[card.level].desk[2]],
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
    }, [deckCard1, deckCard2, deckCard3, deckNoble])
    const handlerTurnEnd = useCallback((data: any) => {
        setCurrentPlayer(data.current_player)
        setNextPlayer(data.next_player)
    }, [])

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

        if (socket) {
            socket.on("game_splendor", onEventGameSplendor);
        }
        
        return () => {
            if (socket) {
                socket.off("game_splendor", onEventGameSplendor);
            }
        }
    }, [socket, handlerStartGame, handlerTurnEnd]);

    return <></>
}

export default memo(GameController);