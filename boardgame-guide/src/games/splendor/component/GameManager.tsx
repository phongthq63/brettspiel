import {memo, useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {useUser} from "@/store/user";
import {
    CARD_POSITION,
    ICard,
    ingameData,
    INoble,
    NOBLE_POSITION,
    NotifyGameSplendorInit
} from "@/games/splendor/constants/game";
import {DICT_NOBLE} from "@/games/splendor/constants/noble";
import {DICT_CARD} from "@/games/splendor/constants/card";
import gsap from "gsap";
import {CARD_NOBLE_SIZE} from "@/games/splendor/component/3d/CardNoble";
import {CARD_GEM_SIZE} from "@/games/splendor/component/3d/CardGem";
import {CardVO, FieldCardVO, FieldNobleVO, GameService, NobleVO} from "@/games/splendor/service/splendor.service";
import {wait} from "@/utils";

function GameManager() {
    const { user } = useUser()
    const { socket, connected } = useSocket()
    const { gameData, isDataReady, setIsDataReady, cardRefs, nobleRefs } = useGameSplendor()


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

    // Handler socket event
    useEffect(() => {
        console.log("Socket", socket)
        if (!socket) return

        function onEventGameSplendor(data: any) {
            console.log("onEventGameSplendor", data);

            const cmdSocket = data?.cmd
            const dataSocket = data.data
            if (cmdSocket == NotifyGameSplendorInit && ingameData.status == 0) {
                setUpStartGame(dataSocket)
            }
        }

        socket.on("game_splendor", onEventGameSplendor);

        return () => {
            socket.off("game_splendor", onEventGameSplendor);
        }
    }, [socket]);

    // Set data to local (threejs engine)
    useEffect(() => {
        console.log("gameData", gameData, ingameData)
        if (!gameData) {
            return
        }

        // Set data ingame
        ingameData.gameId = gameData.game_id;
        ingameData.status = gameData.status;
        ingameData.gold = gameData.ingame_data?.gold ?? 0;
        ingameData.onyx = gameData.ingame_data?.onyx ?? 0;
        ingameData.ruby = gameData.ingame_data?.ruby ?? 0;
        ingameData.emerald = gameData.ingame_data?.emerald ?? 0;
        ingameData.sapphire = gameData.ingame_data?.sapphire ?? 0;
        ingameData.diamond = gameData.ingame_data?.diamond ?? 0;

        switch (gameData.status) {
            case 0:
                // Deck open
                ingameData.deskNoble = gameData.ingame_data.deck_noble.map((noble: NobleVO, index: number) => {
                    return {
                        ...noble,
                        ...DICT_NOBLE[noble.id],
                        position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, (index + 0.5) * CARD_NOBLE_SIZE.depth + NOBLE_POSITION.desk.z],
                        rotation: [0, 0, 0]
                    };
                })
                ingameData.fieldNoble = gameData.ingame_data.field_noble.map((field_noble: FieldNobleVO) => {
                    switch (field_noble.position) {
                        case 0:
                            return {
                                position: [NOBLE_POSITION.position1.x, NOBLE_POSITION.position1.y, NOBLE_POSITION.position1.z],
                                noble: undefined
                            };
                        case 1:
                            return {
                                position: [NOBLE_POSITION.position2.x, NOBLE_POSITION.position2.y, NOBLE_POSITION.position2.z],
                                noble: undefined
                            };
                        case 2:
                            return {
                                position: [NOBLE_POSITION.position3.x, NOBLE_POSITION.position3.y, NOBLE_POSITION.position3.z],
                                noble: undefined
                            };
                        case 3:
                            return {
                                position: [NOBLE_POSITION.position4.x, NOBLE_POSITION.position4.y, NOBLE_POSITION.position4.z],
                                noble: undefined
                            };
                        case 4:
                            return {
                                position: [NOBLE_POSITION.position5.x, NOBLE_POSITION.position5.y, NOBLE_POSITION.position5.z],
                                noble: undefined
                            };
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel1 = gameData.ingame_data.deck_card1.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level1.desk.x, CARD_POSITION.level1.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level1.desk.z],
                        rotation: [0, 0, 0]
                    };
                })
                ingameData.fieldCardLevel1 = gameData.ingame_data.field_card1.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            return {
                                position: [CARD_POSITION.level1.position1.x, CARD_POSITION.level1.position1.y, CARD_POSITION.level1.position1.z],
                                card: undefined
                            };
                        case 1:
                            return {
                                position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                card: undefined
                            };
                        case 2:
                            return {
                                position: [CARD_POSITION.level1.position3.x, CARD_POSITION.level1.position3.y, CARD_POSITION.level1.position3.z],
                                card: undefined
                            };
                        case 3:
                            return {
                                position: [CARD_POSITION.level1.position4.x, CARD_POSITION.level1.position4.y, CARD_POSITION.level1.position4.z],
                                card: undefined
                            };
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel2 = gameData.ingame_data.deck_card2.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level2.desk.x, CARD_POSITION.level2.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level2.desk.z],
                        rotation: [0, 0, 0]
                    };
                })
                ingameData.fieldCardLevel2 = gameData.ingame_data.field_card2.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            return {
                                position: [CARD_POSITION.level2.position1.x, CARD_POSITION.level2.position1.y, CARD_POSITION.level2.position1.z],
                                card: undefined
                            };
                        case 1:
                            return {
                                position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                card: undefined
                            };
                        case 2:
                            return {
                                position: [CARD_POSITION.level2.position3.x, CARD_POSITION.level2.position3.y, CARD_POSITION.level2.position3.z],
                                card: undefined
                            };
                        case 3:
                            return {
                                position: [CARD_POSITION.level2.position4.x, CARD_POSITION.level2.position4.y, CARD_POSITION.level2.position4.z],
                                card: undefined
                            };
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel3 = gameData.ingame_data.deck_card3.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level3.desk.x, CARD_POSITION.level3.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level3.desk.z],
                        rotation: [0, 0, 0]
                    };
                })
                ingameData.fieldCardLevel3 = gameData.ingame_data.field_card3.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            return {
                                position: [CARD_POSITION.level3.position1.x, CARD_POSITION.level3.position1.y, CARD_POSITION.level3.position1.z],
                                card: undefined
                            };
                        case 1:
                            return {
                                position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                card: undefined
                            };
                        case 2:
                            return {
                                position: [CARD_POSITION.level3.position3.x, CARD_POSITION.level3.position3.y, CARD_POSITION.level3.position3.z],
                                card: undefined
                            };
                        case 3:
                            return {
                                position: [CARD_POSITION.level3.position4.x, CARD_POSITION.level3.position4.y, CARD_POSITION.level3.position4.z],
                                card: undefined
                            };
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                break;
            default:
                // Deck close
                ingameData.deskNoble = gameData.ingame_data?.deck_noble.map((noble: NobleVO, index: number) => {
                    return {
                        ...noble,
                        ...DICT_NOBLE[noble.id],
                        position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, (index + 0.5) * CARD_NOBLE_SIZE.depth + NOBLE_POSITION.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                }) ?? [];
                ingameData.fieldNoble = gameData.ingame_data.field_noble.map((field_noble: FieldNobleVO) => {
                    switch (field_noble.position) {
                        case 0:
                            if (field_noble.noble) {
                                return {
                                    position: [NOBLE_POSITION.position1.x, NOBLE_POSITION.position1.y, NOBLE_POSITION.position1.z],
                                    noble: {
                                        ...field_noble.noble,
                                        ...DICT_NOBLE[field_noble.noble.id],
                                        position: [NOBLE_POSITION.position1.x, NOBLE_POSITION.position1.y, NOBLE_POSITION.position1.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [NOBLE_POSITION.position1.x, NOBLE_POSITION.position1.y, NOBLE_POSITION.position1.z],
                                    noble: undefined
                                };
                            }
                        case 1:
                            if (field_noble.noble) {
                                return {
                                    position: [NOBLE_POSITION.position2.x, NOBLE_POSITION.position2.y, NOBLE_POSITION.position2.z],
                                    noble: {
                                        ...field_noble.noble,
                                        ...DICT_NOBLE[field_noble.noble.id],
                                        position: [NOBLE_POSITION.position2.x, NOBLE_POSITION.position2.y, NOBLE_POSITION.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [NOBLE_POSITION.position2.x, NOBLE_POSITION.position2.y, NOBLE_POSITION.position2.z],
                                    noble: undefined
                                };
                            }
                        case 2:
                            if (field_noble.noble) {
                                return {
                                    position: [NOBLE_POSITION.position3.x, NOBLE_POSITION.position3.y, NOBLE_POSITION.position3.z],
                                    noble: {
                                        ...field_noble.noble,
                                        ...DICT_NOBLE[field_noble.noble.id],
                                        position: [NOBLE_POSITION.position3.x, NOBLE_POSITION.position3.y, NOBLE_POSITION.position3.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [NOBLE_POSITION.position3.x, NOBLE_POSITION.position3.y, NOBLE_POSITION.position3.z],
                                    noble: undefined
                                };
                            }
                        case 3:
                            if (field_noble.noble) {
                                return {
                                    position: [NOBLE_POSITION.position4.x, NOBLE_POSITION.position4.y, NOBLE_POSITION.position4.z],
                                    noble: {
                                        ...field_noble.noble,
                                        ...DICT_NOBLE[field_noble.noble.id],
                                        position: [NOBLE_POSITION.position4.x, NOBLE_POSITION.position4.y, NOBLE_POSITION.position4.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [NOBLE_POSITION.position4.x, NOBLE_POSITION.position4.y, NOBLE_POSITION.position4.z],
                                    noble: undefined
                                };
                            }
                        case 4:
                            if (field_noble.noble) {
                                return {
                                    position: [NOBLE_POSITION.position5.x, NOBLE_POSITION.position5.y, NOBLE_POSITION.position5.z],
                                    noble: {
                                        ...field_noble.noble,
                                        ...DICT_NOBLE[field_noble.noble.id],
                                        position: [NOBLE_POSITION.position5.x, NOBLE_POSITION.position5.y, NOBLE_POSITION.position5.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [NOBLE_POSITION.position5.x, NOBLE_POSITION.position5.y, NOBLE_POSITION.position5.z],
                                    noble: undefined
                                };
                            }
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel1 = gameData.ingame_data?.deck_card1.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level1.desk.x, CARD_POSITION.level1.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level1.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                }) ?? [];
                ingameData.fieldCardLevel1 = gameData.ingame_data?.field_card1?.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level1.position1.x, CARD_POSITION.level1.position1.y, CARD_POSITION.level1.position1.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level1.position1.x, CARD_POSITION.level1.position1.y, CARD_POSITION.level1.position1.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level1.position1.x, CARD_POSITION.level1.position1.y, CARD_POSITION.level1.position1.z],
                                    card: undefined
                                };
                            }
                        case 1:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                    card: undefined
                                };
                            }
                        case 2:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level1.position3.x, CARD_POSITION.level1.position3.y, CARD_POSITION.level1.position3.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level1.position3.x, CARD_POSITION.level1.position3.y, CARD_POSITION.level1.position3.z],
                                    card: undefined
                                };
                            }
                        case 3:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level1.position4.x, CARD_POSITION.level1.position4.y, CARD_POSITION.level1.position4.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level1.position2.x, CARD_POSITION.level1.position2.y, CARD_POSITION.level1.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level1.position4.x, CARD_POSITION.level1.position4.y, CARD_POSITION.level1.position4.z],
                                    card: undefined
                                };
                            }
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel2 = gameData.ingame_data?.deck_card2.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level2.desk.x, CARD_POSITION.level2.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level2.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                })
                ingameData.fieldCardLevel2 = gameData.ingame_data?.field_card2?.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level2.position1.x, CARD_POSITION.level2.position1.y, CARD_POSITION.level2.position1.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level2.position1.x, CARD_POSITION.level2.position1.y, CARD_POSITION.level2.position1.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level2.position1.x, CARD_POSITION.level2.position1.y, CARD_POSITION.level2.position1.z],
                                    card: undefined
                                };
                            }
                        case 1:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                    card: undefined
                                };
                            }
                        case 2:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level2.position3.x, CARD_POSITION.level2.position3.y, CARD_POSITION.level2.position3.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level2.position3.x, CARD_POSITION.level2.position3.y, CARD_POSITION.level2.position3.z],
                                    card: undefined
                                };
                            }
                        case 3:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level2.position4.x, CARD_POSITION.level2.position4.y, CARD_POSITION.level2.position4.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level2.position2.x, CARD_POSITION.level2.position2.y, CARD_POSITION.level2.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level2.position4.x, CARD_POSITION.level2.position4.y, CARD_POSITION.level2.position4.z],
                                    card: undefined
                                };
                            }
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })
                ingameData.deskCardLevel3 = gameData.ingame_data?.deck_card3.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level3.desk.x, CARD_POSITION.level3.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level3.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                })
                ingameData.fieldCardLevel3 = gameData.ingame_data?.field_card3?.map((field_card: FieldCardVO) => {
                    switch (field_card.position) {
                        case 0:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level3.position1.x, CARD_POSITION.level3.position1.y, CARD_POSITION.level3.position1.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level3.position1.x, CARD_POSITION.level3.position1.y, CARD_POSITION.level3.position1.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level3.position1.x, CARD_POSITION.level3.position1.y, CARD_POSITION.level3.position1.z],
                                    card: undefined
                                };
                            }
                        case 1:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                    card: undefined
                                };
                            }
                        case 2:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level3.position3.x, CARD_POSITION.level3.position3.y, CARD_POSITION.level3.position3.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level3.position3.x, CARD_POSITION.level3.position3.y, CARD_POSITION.level3.position3.z],
                                    card: undefined
                                };
                            }
                        case 3:
                            if (field_card.card) {
                                return {
                                    position: [CARD_POSITION.level3.position4.x, CARD_POSITION.level3.position4.y, CARD_POSITION.level3.position4.z],
                                    card: {
                                        ...field_card.card,
                                        ...DICT_CARD[field_card.card.id],
                                        position: [CARD_POSITION.level3.position2.x, CARD_POSITION.level3.position2.y, CARD_POSITION.level3.position2.z],
                                        rotation: [0, 0, 0]
                                    }
                                };
                            } else {
                                return {
                                    position: [CARD_POSITION.level3.position4.x, CARD_POSITION.level3.position4.y, CARD_POSITION.level3.position4.z],
                                    card: undefined
                                };
                            }
                        default:
                            return {
                                position: [0, 0, 0]
                            };
                    }
                })

                break
        }

        setIsDataReady(true)

    }, [gameData]);

    // Start game
    useEffect(() => {
        if (connected && isDataReady && ingameData.status == 0) {
            // Request start game
            const startGame = async () => {
                await wait(3000)

                GameService.startGame({gameId: ingameData.gameId})
                    .then(response => {
                        console.log("Start game", response)
                    })
                    .catch(error => {
                        console.log("Start game error", error);
                    })
            }

            startGame()
        }
    }, [connected, isDataReady])


    const setUpStartGame = (data: any) => {
        console.log("Start game");

        // Set field noble
        const nobleOpens: INoble[] = data.field_noble.map((field_noble: any) => {
            return {
                ...field_noble.noble,
                ...DICT_NOBLE[field_noble.noble.id],
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            }
        })
        for (let i = 0; i < nobleOpens.length; i++) {
            nobleOpens[i].position = ingameData.fieldNoble[i].position;
            ingameData.fieldNoble[i].noble = nobleOpens[i];
        }

        // Set field card level 3
        const card3Opens: ICard[] = data.field_card_3.map((field_card: any) => {
            return {
                ...field_card.card,
                ...DICT_CARD[field_card.card.id],
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            }
        });
        for (let i = 0; i < card3Opens.length; i++) {
            card3Opens[i].position = ingameData.fieldCardLevel3[i].position;
            ingameData.fieldCardLevel3[i].card = card3Opens[i];
        }

        // Set field card level 2
        const card2Opens: ICard[] = data.field_card_2.map((field_card: any) => {
            return {
                ...field_card.card,
                ...DICT_CARD[field_card.card.id],
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            }
        });
        for (let i = 0; i < card2Opens.length; i++) {
            card2Opens[i].position = ingameData.fieldCardLevel2[i].position;
            ingameData.fieldCardLevel2[i].card = card2Opens[i];
        }

        // Set field card level 1
        const card1Opens: ICard[] = data.field_card_1.map((field_card: any) => {
            return {
                ...field_card.card,
                ...DICT_CARD[field_card.card.id],
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            }
        });
        for (let i = 0; i < card1Opens.length; i++) {
            card1Opens[i].position = ingameData.fieldCardLevel1[i].position;
            ingameData.fieldCardLevel1[i].card = card1Opens[i];
        }

        // Play animation
        const animation = gsap.timeline();
        animation
            .add(shuffleDeckNoble(), 0)
            .add(shuffleDeckCard(ingameData.deskCardLevel3), 0)
            .add(shuffleDeckCard(ingameData.deskCardLevel2), 0)
            .add(shuffleDeckCard(ingameData.deskCardLevel1), 0);
        let startAnimationDesk = true;
        ingameData.fieldNoble.forEach((nobleField) => {
            if (nobleField.noble == undefined) return;

            if (startAnimationDesk) {
                startAnimationDesk = false;
                animation.add(openNoble(nobleField.noble.id, nobleField.position), "<2")
            } else {
                animation.add(openNoble(nobleField.noble.id, nobleField.position))
            }
        });
        ingameData.fieldCardLevel3.forEach((cardField) => {
            if (cardField.card == undefined) return;

            if (startAnimationDesk) {
                startAnimationDesk = false;
                animation.add(openCard(cardField.card.id, cardField.position), "<2")
            } else {
                animation.add(openCard(cardField.card.id, cardField.position))
            }
        });
        ingameData.fieldCardLevel2.forEach((cardField) => {
            if (cardField.card == undefined) return;

            if (startAnimationDesk) {
                startAnimationDesk = false;
                animation.add(openCard(cardField.card.id, cardField.position), "<2")
            } else {
                animation.add(openCard(cardField.card.id, cardField.position))
            }
        });
        ingameData.fieldCardLevel1.forEach((cardField) => {
            if (cardField.card == undefined) return;

            if (startAnimationDesk) {
                startAnimationDesk = false;
                animation.add(openCard(cardField.card.id, cardField.position), "<2")
            } else {
                animation.add(openCard(cardField.card.id, cardField.position))
            }
        });

        // Delete card in desk
        ingameData.deskNoble = ingameData.deskNoble.filter(noble => !nobleOpens.some(nobleOpen => nobleOpen.id == noble.id));
        ingameData.deskCardLevel1 = ingameData.deskCardLevel1.filter(card => !card1Opens.some(cardOpen => cardOpen.id == card.id));
        ingameData.deskCardLevel2 = ingameData.deskCardLevel2.filter(card => !card2Opens.some(cardOpen => cardOpen.id == card.id));
        ingameData.deskCardLevel3 = ingameData.deskCardLevel3.filter(card => !card3Opens.some(cardOpen => cardOpen.id == card.id));
    };

    const shuffleDeckNoble = () => {
        const timelineDesk = gsap.timeline();

        ingameData.deskNoble.forEach((item, index) => {
            timelineDesk.add(gsap.timeline()
                .to(nobleRefs.current[item.id]?.position, {
                    z: 0.5 + index * CARD_NOBLE_SIZE.depth,
                    duration: 0.5
                }, 0)
                .to(nobleRefs.current[item.id]?.rotation, {
                    y: Math.PI,
                    duration: 0.25
                }, 0)
                .to(nobleRefs.current[item.id]?.position, {
                    z: (ingameData.deskNoble.length - index) * CARD_NOBLE_SIZE.depth,
                    duration: 0.35
                }), 0)
        });
        return timelineDesk
    };

    const shuffleDeckCard = (deskCard: ICard[]) => {
        const timelineDesk = gsap.timeline();
        deskCard.forEach((item, index) => {
            timelineDesk.add(gsap.timeline()
                .to(cardRefs.current[item.id]?.position, {
                    z: 0.5 + index * CARD_GEM_SIZE.depth,
                    duration: 0.5
                }, 0)
                .to(cardRefs.current[item.id]?.rotation, {
                    y: Math.PI,
                    duration: 0.25
                }, 0)
                .to(cardRefs.current[item.id]?.position, {
                    z: deskCard.length * CARD_GEM_SIZE.depth - index * CARD_GEM_SIZE.depth,
                    duration: 0.35
                }), 0);
        });
        return timelineDesk;
    };

    const openNoble = (nobleId: string, position: [number, number, number]) => {
        const nobleInstance = nobleRefs.current[nobleId]
        if (!nobleInstance) {
            return gsap.timeline()
        }

        const endX = position[0];
        const startY = nobleInstance.position.y;
        const endY = position[1];
        const startZ = nobleInstance.position.z;
        const endZ = position[2];
        const peakHeight = 1.2;

        return gsap.timeline()
            .to(nobleInstance.position, {
                x: endX,
                y: endY,
                duration: 0.6,
                ease: "power1.out",
                onUpdate: () => {
                    const currentY = nobleInstance.position.y;
                    nobleInstance.position.z = (startZ - peakHeight) / Math.pow((startY + endY) / 2 - startY, 2) * Math.pow(currentY - (startY + endY) / 2, 2) + peakHeight;
                }
            })
            .to(nobleInstance.rotation, {
                y: 0,
                duration: 0.5,
            }, 0)
            .to(nobleInstance.position, {
                x: endX,
                y: endY,
                z: endZ,
            })
    };

    const openCard = (cardId: string, position: [number, number, number]) => {
        const cardInstance = cardRefs.current[cardId]
        if (!cardInstance) {
            return gsap.timeline()
        }

        const startX = cardInstance.position.x;
        const endX = position[0];
        const endY = position[1];
        const startZ = cardInstance.position.z;
        const endZ = position[2];
        const peakHeight = 1;

        return gsap.timeline()
            .to(cardInstance.position, {
                x: endX,
                y: endY,
                duration: 0.5,
                ease: "power1.out",
                onUpdate: () => {
                    const currentX = cardInstance.position.x;
                    cardInstance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                }
            }, 0)
            .to(cardInstance.rotation, {
                y: 0,
                duration: 0.4,
            }, 0)
            .to(cardInstance.position, {
                x: endX,
                y: endY,
                z: endZ
            });
    };

    return <></>
}

export default memo(GameManager);