import {CardGemSize, CardGem} from "@/games/splendor/component/3d/CardGem";
import {
    TokenGemSize,
    TokenDiamond,
    TokenEmerald,
    TokenGold,
    TokenOnyx,
    TokenRuby,
    TokenSapphire
} from "@/games/splendor/component/3d/TokenGem";
import {
    CARD_POSITION,
    NOBLE_POSITION,
    NotifyGameSplendorStart
} from "@/games/splendor/constants/game";
import CardNoble, {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import React, {useEffect, useRef, useState} from "react";
import {useThree} from "@react-three/fiber";
import {ICard, ingameData, INoble, useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Euler, Quaternion, Vector3} from "three";
import {DICT_NOBLE } from "../../constants/noble";
import {CardVO, FieldCardVO, FieldNobleVO, NobleVO} from "../../service/splendor.service";
import { DICT_CARD } from "../../constants/card";
import {useSocket} from "@/store/socket";
import Plane from "@/games/splendor/component/3d/Plane";
import Board, {BoardSize} from "@/games/splendor/component/3d/Board";
import {OrbitControls} from "@react-three/drei";
import {useSprings} from "@react-spring/core";


let objectActionSelects: any[] = []

function PlayingSpace() {
    const { camera } = useThree();
    const { gameData,
        setIsDataReady,
        isMyTurn,
        currentAction, setCurrentAction
    } = useGameSplendor();
    const { socket } = useSocket();
    const [deckNoble, setDeckNoble] = useState<INoble[]>([]);



    const [toggle, setToggle] = useState(false);
    const [springs, api] = useSprings(deckNoble.length, (index) => ({
        position: deckNoble[index].position,
        config: { duration: 5000, tension: 100, friction: 30 },
        onChange: () => {
            nobleRefs.current[deckNoble[index].id].api.position.set(nobleRefs.current[deckNoble[index].id].position.x, nobleRefs.current[deckNoble[index].id].position.y, nobleRefs.current[deckNoble[index].id].position.z);
        }
    }));
    const moveCards = () => {
        api.start((index) => ({
            position: toggle
                ? deckNoble[index].position
                : [deckNoble[index].position[0], deckNoble[index].position[1], deckNoble[index].position[2] + 2],
        }));
        setToggle(!toggle);
    };


    const cardRefs = useRef<any>({});
    const nobleRefs = useRef<{ [key: string]: any }>({});
    const goldRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const onyxRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const rubyRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const emeraldRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const sapphireRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const diamondRefs = useRef<any>({field: {}, player: new Map<string, object>()});

    // useEffect(() => {
    //     console.log("DeckNoble", deckNoble, nobleRefs)
    //
    //     // const animation = gsap.timeline();
    //     // deckNoble.forEach(noble => {
    //     //     animation.to(nobleRefs.current[noble.id].position, {
    //     //         x: noble.position[0],
    //     //         y: noble.position[1],
    //     //         z: noble.position[2],
    //     //         duration: 0.1,
    //     //         onStart: () => {
    //     //             nobleRefs.current[noble.id].test1()
    //     //         },
    //     //         onComplete: () => {
    //     //             nobleRefs.current[noble.id].test()
    //     //         }
    //     //     }, 0)
    //     // })
    //     // animation.call(() => {invalidate()})
    //     deckNoble.forEach(noble => {
    //         nobleRefs.current[noble.id].position.fromArray(noble.position)
    //         nobleRefs.current[noble.id].updateMatrixWorld()
    //     })
    // }, [deckNoble]);

    // Set data to local (threejs engine)
    useEffect(() => {
        if (!gameData) {
            return
        }

        setDeckNoble(gameData.ingame_data.deck_noble.map((noble: NobleVO, index: number) => {
            return {
                ...noble,
                ...DICT_NOBLE[noble.id],
                position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, index * (CardNobleSize.depth * 1) + NOBLE_POSITION.desk.z],
                rotation: [0, gameData.status == 1 ? Math.PI : 0, 0]
            };
        }))

        // Set data ingame
        ingameData.gameId = gameData.game_id;
        ingameData.status = gameData.status;
        ingameData.gold = gameData.ingame_data.gold ?? 0;
        ingameData.onyx = gameData.ingame_data.onyx ?? 0;
        ingameData.ruby = gameData.ingame_data.ruby ?? 0;
        ingameData.emerald = gameData.ingame_data.emerald ?? 0;
        ingameData.sapphire = gameData.ingame_data.sapphire ?? 0;
        ingameData.diamond = gameData.ingame_data.diamond ?? 0;

        switch (gameData.status) {
            case 0:
                // Deck open
                ingameData.deskNoble = gameData.ingame_data.deck_noble.map((noble: NobleVO, index: number) => {
                    return {
                        ...noble,
                        ...DICT_NOBLE[noble.id],
                        position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, index * CardNobleSize.depth + NOBLE_POSITION.desk.z],
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
                        position: [CARD_POSITION.level1.desk.x, CARD_POSITION.level1.desk.y, index * CardGemSize.depth + CARD_POSITION.level1.desk.z],
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
                        position: [CARD_POSITION.level2.desk.x, CARD_POSITION.level2.desk.y, index * CardGemSize.depth + CARD_POSITION.level2.desk.z],
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
                        position: [CARD_POSITION.level3.desk.x, CARD_POSITION.level3.desk.y, index * CardGemSize.depth + CARD_POSITION.level3.desk.z],
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
                ingameData.deskNoble = gameData.ingame_data.deck_noble.map((noble: NobleVO, index: number) => {
                    return {
                        ...noble,
                        ...DICT_NOBLE[noble.id],
                        position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, index * CardNobleSize.depth + NOBLE_POSITION.desk.z],
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
                ingameData.deskCardLevel1 = gameData.ingame_data.deck_card1.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level1.desk.x, CARD_POSITION.level1.desk.y, index * CardGemSize.depth + CARD_POSITION.level1.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                })
                ingameData.fieldCardLevel1 = gameData.ingame_data.field_card1.map((field_card: FieldCardVO) => {
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
                ingameData.deskCardLevel2 = gameData.ingame_data.deck_card2.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level2.desk.x, CARD_POSITION.level2.desk.y, index * CardGemSize.depth + CARD_POSITION.level2.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                })
                ingameData.fieldCardLevel2 = gameData.ingame_data.field_card2.map((field_card: FieldCardVO) => {
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
                ingameData.deskCardLevel3 = gameData.ingame_data.deck_card3.map((card: CardVO, index: number) => {
                    return {
                        ...card,
                        ...DICT_CARD[card.id],
                        position: [CARD_POSITION.level3.desk.x, CARD_POSITION.level3.desk.y, index * CardGemSize.depth + CARD_POSITION.level3.desk.z],
                        rotation: [0, Math.PI, 0]
                    };
                })
                ingameData.fieldCardLevel3 = gameData.ingame_data.field_card3.map((field_card: FieldCardVO) => {
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

        // ingameData.player = gameData.ingame_data.players.map((player: IngamePlayerDataVO) => {
        //
        //     return {
        //         player_id: player.player_id,
        //         noble: player.nobles?.map((noble, index) => {
        //             return {
        //                 ...noble,
        //                 ...DICT_NOBLE[noble.id],
        //                 position: [PLAYER_NOBLE_POSITION.position.x + index * (CARD_NOBLE_SIZE.width + PLAYER_NOBLE_POSITION.distance), PLAYER_NOBLE_POSITION.position.y, PLAYER_NOBLE_POSITION.position.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         reserve_card: player.reserve_cards?.map((reserve_card) => {
        //             return {
        //                 ...reserve_card,
        //                 ...DICT_CARD[reserve_card.id],
        //                 position: [0, 0, 0],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         gold: player.gold,
        //         onyx: player.onyx,
        //         ruby: player.ruby,
        //         emerald: player.emerald,
        //         sapphire: player.sapphire,
        //         diamond: player.diamond,
        //         card_onyx: player.card_onyx?.map((card, index) => {
        //             return {
        //                 ...card,
        //                 ...DICT_CARD[card.id],
        //                 position: [PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + index * PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         card_ruby: player.card_ruby?.map((card, index) => {
        //             return {
        //                 ...card,
        //                 ...DICT_CARD[card.id],
        //                 position: [PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + index * PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         card_emerald: player.card_emerald?.map((card, index) => {
        //             return {
        //                 ...card,
        //                 ...DICT_CARD[card.id],
        //                 position: [PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + index * PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         card_sapphire: player.card_sapphire?.map((card, index) => {
        //             return {
        //                 ...card,
        //                 ...DICT_CARD[card.id],
        //                 position: [PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + index * PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //         card_diamond: player.card_diamond?.map((card, index) => {
        //             return {
        //                 ...card,
        //                 ...DICT_CARD[card.id],
        //                 position: [PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + index * PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z],
        //                 rotation: [0, 0, 0]
        //             }
        //         }),
        //     }
        // })

        // Update state
        setIsDataReady(true)

    }, [gameData]);

    const shuffleDeckNoble = (nobleOpens: any[]) => {
        const timelineDesk = gsap.timeline();

        console.log(deckNoble, nobleRefs)
        deckNoble.forEach((noble, index) => {
            timelineDesk.add(gsap.timeline()
                .to(nobleRefs.current[noble.id].position, {
                    z: 0.5 + index * CardNobleSize.depth,
                    duration: 0.5 * 10
                }, 0)
                .to(nobleRefs.current[noble.id].rotation, {
                    y: Math.PI,
                    duration: 0.25 * 10
                }, 0)
                .to(nobleRefs.current[noble.id].position, {
                    z: (deckNoble.length - index) * CardNobleSize.depth,
                    duration: 0.35 * 10
                }), 0)
        });
        return timelineDesk.call(() => {
            setDeckNoble((prevDeck) => prevDeck.filter(noble => !nobleOpens.some(nobleOpen => noble.id == nobleOpen.id))
                .map((noble, index) => {
                    return {
                        ...noble,
                        position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, index * (CardNobleSize.depth * 3) + NOBLE_POSITION.desk.z],
                        rotation: [0, Math.PI, 0]
                    }
                }))
            console.log(nobleRefs)
        })
    }

    // Handler socket event
    useEffect(() => {
        function onEventGameSplendor(data: any) {
            const cmdSocket = data?.cmd
            const dataSocket = data?.data
            switch (cmdSocket) {
                case NotifyGameSplendorStart:
                    if (ingameData.status == 0) {
                        handlerStartGame(dataSocket)
                    }
                    break;
            }
        }

        const handlerStartGame = (data: any) => {
            console.log("Start game", data);

            const nobleOpens = data.field_noble.filter((field_noble: any) => field_noble.noble)
                .map((field_noble: any) => field_noble.noble)

            // // Set field noble
            // const nobleOpens: INoble[] = data.field_noble.map((field_noble: any) => {
            //     return {
            //         ...field_noble.noble,
            //         ...DICT_NOBLE[field_noble.noble.id],
            //         position: [0, 0, 0],
            //         rotation: [0, 0, 0]
            //     }
            // })
            // for (let i = 0; i < nobleOpens.length; i++) {
            //     nobleOpens[i].position = ingameData.fieldNoble[i].position;
            //     ingameData.fieldNoble[i].noble = nobleOpens[i];
            // }
            //
            // // Set field card level 3
            // const card3Opens: ICard[] = data.field_card_3.map((field_card: any) => {
            //     return {
            //         ...field_card.card,
            //         ...DICT_CARD[field_card.card.id],
            //         position: [0, 0, 0],
            //         rotation: [0, 0, 0]
            //     }
            // });
            // for (let i = 0; i < card3Opens.length; i++) {
            //     card3Opens[i].position = ingameData.fieldCardLevel3[i].position;
            //     ingameData.fieldCardLevel3[i].card = card3Opens[i];
            // }
            //
            // // Set field card level 2
            // const card2Opens: ICard[] = data.field_card_2.map((field_card: any) => {
            //     return {
            //         ...field_card.card,
            //         ...DICT_CARD[field_card.card.id],
            //         position: [0, 0, 0],
            //         rotation: [0, 0, 0]
            //     }
            // });
            // for (let i = 0; i < card2Opens.length; i++) {
            //     card2Opens[i].position = ingameData.fieldCardLevel2[i].position;
            //     ingameData.fieldCardLevel2[i].card = card2Opens[i];
            // }
            //
            // // Set field card level 1
            // const card1Opens: ICard[] = data.field_card_1.map((field_card: any) => {
            //     return {
            //         ...field_card.card,
            //         ...DICT_CARD[field_card.card.id],
            //         position: [0, 0, 0],
            //         rotation: [0, 0, 0]
            //     }
            // });
            // for (let i = 0; i < card1Opens.length; i++) {
            //     card1Opens[i].position = ingameData.fieldCardLevel1[i].position;
            //     ingameData.fieldCardLevel1[i].card = card1Opens[i];
            // }

            // Play animation
            const animation = gsap.timeline();
            animation
                .add(shuffleDeckNoble(nobleOpens), 0)
            //     .add(shuffleDeckCard(ingameData.deskCardLevel3), 0)
            //     .add(shuffleDeckCard(ingameData.deskCardLevel2), 0)
            //     .add(shuffleDeckCard(ingameData.deskCardLevel1), 0);
            // let startAnimationDesk = true;
            // ingameData.fieldNoble.forEach((nobleField) => {
            //     if (nobleField.noble == undefined) return;
            //
            //     if (startAnimationDesk) {
            //         startAnimationDesk = false;
            //         animation.add(openNoble(nobleField.noble.id, nobleField.position), "<2")
            //     } else {
            //         animation.add(openNoble(nobleField.noble.id, nobleField.position))
            //     }
            // });
            // ingameData.fieldCardLevel3.forEach((cardField) => {
            //     if (cardField.card == undefined) return;
            //
            //     if (startAnimationDesk) {
            //         startAnimationDesk = false;
            //         animation.add(openCard(cardField.card.id, cardField.position), "<2")
            //     } else {
            //         animation.add(openCard(cardField.card.id, cardField.position))
            //     }
            // });
            // ingameData.fieldCardLevel2.forEach((cardField) => {
            //     if (cardField.card == undefined) return;
            //
            //     if (startAnimationDesk) {
            //         startAnimationDesk = false;
            //         animation.add(openCard(cardField.card.id, cardField.position), "<2")
            //     } else {
            //         animation.add(openCard(cardField.card.id, cardField.position))
            //     }
            // });
            // ingameData.fieldCardLevel1.forEach((cardField) => {
            //     if (cardField.card == undefined) return;
            //
            //     if (startAnimationDesk) {
            //         startAnimationDesk = false;
            //         animation.add(openCard(cardField.card.id, cardField.position), "<2")
            //     } else {
            //         animation.add(openCard(cardField.card.id, cardField.position))
            //     }
            // });
            //
            // // Delete card in desk
            // ingameData.deskNoble = ingameData.deskNoble.filter(noble => !nobleOpens.some(nobleOpen => nobleOpen.id == noble.id));
            // ingameData.deskCardLevel1 = ingameData.deskCardLevel1.filter(card => !card1Opens.some(cardOpen => cardOpen.id == card.id));
            // ingameData.deskCardLevel2 = ingameData.deskCardLevel2.filter(card => !card2Opens.some(cardOpen => cardOpen.id == card.id));
            // ingameData.deskCardLevel3 = ingameData.deskCardLevel3.filter(card => !card3Opens.some(cardOpen => cardOpen.id == card.id));
        }

        if (socket) {
            socket.on("game_splendor", onEventGameSplendor);
        }

        return () => {
            if (socket) {
                socket.off("game_splendor", onEventGameSplendor);
            }
        }
    }, [shuffleDeckNoble, socket]);

    // Return object action select to first position
    useEffect(() => {
        if (!currentAction.type && objectActionSelects.length > 0) {
            const animation = gsap.timeline()
            objectActionSelects.forEach(objectActionSelect => {
                animation.add(gsap.timeline()
                    .to(objectActionSelect.ref.position, {
                        x: objectActionSelect.position.x,
                        y: objectActionSelect.position.y,
                        z: objectActionSelect.position.z,
                        duration: 0.3,
                    })
                    .to(objectActionSelect.ref.rotation, {
                        x: objectActionSelect.rotation.x,
                        y: objectActionSelect.rotation.y,
                        z: objectActionSelect.rotation.z,
                        duration: 0.3,
                    }, 0))
            })

            objectActionSelects = []
        }
    }, [currentAction]);


    const shuffleDeckCard = (deskCard: ICard[]) => {
        const timelineDesk = gsap.timeline();
        deskCard.forEach((item, index) => {
            timelineDesk.add(gsap.timeline()
                .to(cardRefs.current[item.id]?.position, {
                    z: 0.5 + index * CardGemSize.depth,
                    duration: 0.5
                }, 0)
                .to(cardRefs.current[item.id]?.rotation, {
                    y: Math.PI,
                    duration: 0.25
                }, 0)
                .to(cardRefs.current[item.id]?.position, {
                    z: deskCard.length * CardGemSize.depth - index * CardGemSize.depth,
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

    const onClickOnyx = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(onyxRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = onyxRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenGemSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickRuby = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(rubyRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = rubyRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenGemSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickEmerald = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(emeraldRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = emeraldRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenGemSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickSapphire = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(sapphireRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = sapphireRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenGemSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickDiamond = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(diamondRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = diamondRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenGemSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickCard = (id: string) => {
        if (currentAction.type) {
            return;
        }

        let type;
        if (ingameData.fieldCardLevel1.some(fieldCard => fieldCard.card?.id == id) ||
            ingameData.fieldCardLevel2.some(fieldCard => fieldCard.card?.id == id) ||
            ingameData.fieldCardLevel3.some(fieldCard => fieldCard.card?.id == id)) {
            type = "field"
        } else {
            type = "deck"
        }

        if (!isMyTurn && type == "deck") {
            return;
        }
        if (isMyTurn) {
            // Update state
            switch (type) {
                case "field":
                    setCurrentAction({type: "option-action", data: {id: id, option: ["buy-card", "reserve-card"]}});
                    break;
                case "deck":
                    setCurrentAction({type: "reserve-card", data: {id: id}});
                    break;
                default:
                    return;
            }

        }

        const instanceCard: any = cardRefs.current[id]
        if (!objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
            // Save location instance ref
            objectActionSelects.push({
                id: id,
                ref: instanceCard,
                position: instanceCard.position.clone(),
                rotation: instanceCard.rotation.clone()
            })
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        const animation = gsap.timeline()
        animation.add(gsap.timeline()
            .to(instanceCard.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instanceCard.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    switch (type) {
                        case "deck":
                            // Step 1: Make the card face the camera
                            const targetQuaternion = new Quaternion();
                            instanceCard.lookAt(targetLookAt);

                            // Save the "lookAt" orientation in a quaternion
                            instanceCard.getWorldQuaternion(targetQuaternion);

                            // Step 2: Apply a flip to the card (180° along local Y-axis for face-down)
                            const flipQuaternion = new Quaternion();
                            flipQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI); // 180° around Y-axis

                            // Combine the lookAt orientation with the flip
                            targetQuaternion.multiply(flipQuaternion);

                            // Step 3: Apply the calculated quaternion to the card
                            instanceCard.quaternion.copy(targetQuaternion);
                            break
                        default:
                            instanceCard.lookAt(targetLookAt);
                            break;
                    }
                },
            }, 0))
    }

    const onClickNoble = (id: string) => {
        moveCards()

        if (currentAction.type) {
            return;
        }

        if (!ingameData.fieldNoble.some(fieldNoble => fieldNoble.noble?.id == id)) {
            return;
        }

        if (isMyTurn) {
            // Update state
            setCurrentAction({type: "take-noble", data: {id: id}});
        }

        const instance = nobleRefs.current[id]
        if (!objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
            objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => instance.lookAt(targetLookAt),
            }, 0)
    }

    const onClickNotCurrent = (id: string) => {
        if (currentAction.type) {
            return;
        }

        if (objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
            const animation = gsap.timeline()
            objectActionSelects.forEach(objectActionSelect => {
                animation.add(gsap.timeline()
                    .to(objectActionSelect.ref.position, {
                        x: objectActionSelect.position.x,
                        y: objectActionSelect.position.y,
                        z: objectActionSelect.position.z,
                        duration: 0.3,
                    })
                    .to(objectActionSelect.ref.rotation, {
                        x: objectActionSelect.rotation.x,
                        y: objectActionSelect.rotation.y,
                        z: objectActionSelect.rotation.z,
                        duration: 0.3,
                    }, 0))
            })

            objectActionSelects = []
        }
    }


    // useFrame(() => {
    //     deckNoble.forEach(noble => {
    //         nobleRefs.current[noble.id].position.fromArray(noble.position)
    //         nobleRefs.current[noble.id].updateMatrixWorld()
    //     })
    // })


    const ref = useRef()
    const a = () => {
        gsap.to(ref.current.position, {
            z: ref.current.position.z + 1,
            duration: 2,
            onStart: () => {
                ref.current.handlerStartAnimation()
            },
            onComplete: () => {
                ref.current.handlerEndAnimation()
            }
        })
    }

    return (
        <>
            <OrbitControls enabled={true}/>
            <Plane position={[0, 0, -5]}/>
            <Board position={[0, 0, -BoardSize.depth / 2]}/>
            <group>
                {/*<group>*/}
                {/*    {*/}
                {/*        ingameData.deskCardLevel3.map((item) => {*/}
                {/*            return <CardGem key={item.id}*/}
                {/*                            cardRef={(element: any) => (cardRefs.current[item.id] = element)}*/}
                {/*                            level={3}*/}
                {/*                            url={item.url}*/}
                {/*                            onClick={() => onClickCard(item.id)}*/}
                {/*                            onClickNotThis={() => onClickNotCurrent(item.id)}*/}
                {/*                            position={item.position}*/}
                {/*                            rotation={item.rotation}/>*/}
                {/*        })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        ingameData.deskCardLevel2.map((item) => {*/}
                {/*            return <CardGem key={item.id}*/}
                {/*                            cardRef={(element: any) => (cardRefs.current[item.id] = element)}*/}
                {/*                            level={2}*/}
                {/*                            url={item.url}*/}
                {/*                            onClick={() => onClickCard(item.id)}*/}
                {/*                            onClickNotThis={() => onClickNotCurrent(item.id)}*/}
                {/*                            position={item.position}*/}
                {/*                            rotation={item.rotation}/>*/}
                {/*        })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        ingameData.deskCardLevel1.map((item) => {*/}
                {/*            return <CardGem key={item.id}*/}
                {/*                            cardRef={(element: any) => (cardRefs.current[item.id] = element)}*/}
                {/*                            level={1}*/}
                {/*                            url={item.url}*/}
                {/*                            onClick={() => onClickCard(item.id)}*/}
                {/*                            onClickNotThis={() => onClickNotCurrent(item.id)}*/}
                {/*                            position={item.position}*/}
                {/*                            rotation={item.rotation}/>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</group>*/}
                {/*<group>*/}
                {/*    {*/}
                {/*        ingameData.fieldCardLevel3.filter(item => item.card)*/}
                {/*            .map((item: any) => {*/}
                {/*                return <CardGem key={item.card.id}*/}
                {/*                                cardRef={(element: any) => (cardRefs.current[item.card.id] = element)}*/}
                {/*                                level={3}*/}
                {/*                                url={item.card.url}*/}
                {/*                                onClick={() => onClickCard(item.card.id)}*/}
                {/*                                onClickNotThis={() => onClickNotCurrent(item.card.id)}*/}
                {/*                                position={item.position}*/}
                {/*                                rotation={item.card.rotation}/>*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        ingameData.fieldCardLevel2.filter(item => item.card)*/}
                {/*            .map((item: any) => {*/}
                {/*                return <CardGem key={item.card.id}*/}
                {/*                                cardRef={(element: any) => (cardRefs.current[item.card.id] = element)}*/}
                {/*                                level={2}*/}
                {/*                                url={item.card.url}*/}
                {/*                                onClick={() => onClickCard(item.card.id)}*/}
                {/*                                onClickNotThis={() => onClickNotCurrent(item.card.id)}*/}
                {/*                                position={item.position}*/}
                {/*                                rotation={item.card.rotation}/>*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        ingameData.fieldCardLevel1.filter(item => item.card)*/}
                {/*            .map((item: any) => {*/}
                {/*                return <CardGem key={item.card.id}*/}
                {/*                                cardRef={(element: any) => cardRefs.current[item.card.id] = element}*/}
                {/*                                level={1}*/}
                {/*                                url={item.card.url}*/}
                {/*                                onClick={() => onClickCard(item.card.id)}*/}
                {/*                                onClickNotThis={() => onClickNotCurrent(item.card.id)}*/}
                {/*                                position={item.position}*/}
                {/*                                rotation={item.card.rotation}/>*/}
                {/*            })*/}
                {/*    }*/}
                {/*</group>*/}
                {/*<group>*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.gold}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenGold key={`gold-${index}`}*/}
                {/*                                   tokenRef={(element: any) => goldRefs.current.field[`gold-${index}`] = element}*/}
                {/*                                   position={[GEM_POSITION.gold.x, GEM_POSITION.gold.y, GEM_POSITION.gold.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.onyx}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenOnyx key={`onyx-${index}`}*/}
                {/*                                   tokenRef={(element: any) => onyxRefs.current.field[`onyx-${index}`] = element}*/}
                {/*                                   onClick={() => onClickOnyx("field", `onyx-${index}`)}*/}
                {/*                                   position={[GEM_POSITION.onyx.x, GEM_POSITION.onyx.y, GEM_POSITION.onyx.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.ruby}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenRuby key={`ruby-${index}`}*/}
                {/*                                   tokenRef={(element: any) => rubyRefs.current.field[`ruby-${index}`] = element}*/}
                {/*                                   onClick={() => onClickRuby("field", `ruby-${index}`)}*/}
                {/*                                   position={[GEM_POSITION.ruby.x, GEM_POSITION.ruby.y, GEM_POSITION.ruby.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.emerald}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenEmerald key={`emerald-${index}`}*/}
                {/*                                      tokenRef={(element: any) => emeraldRefs.current.field[`emerald-${index}`] = element}*/}
                {/*                                      onClick={() => onClickEmerald("field", `emerald-${index}`)}*/}
                {/*                                      position={[GEM_POSITION.emerald.x, GEM_POSITION.emerald.y, GEM_POSITION.emerald.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.sapphire}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenSapphire key={`sapphire-${index}`}*/}
                {/*                                       tokenRef={(element: any) => sapphireRefs.current.field[`sapphire-${index}`] = element}*/}
                {/*                                       onClick={() => onClickSapphire("field", `sapphire-${index}`)}*/}
                {/*                                       position={[GEM_POSITION.sapphire.x, GEM_POSITION.sapphire.y, GEM_POSITION.sapphire.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*    {*/}
                {/*        Array.from({length: ingameData.diamond}, (_, i) => i)*/}
                {/*            .map(index => {*/}
                {/*                return (<TokenDiamond key={`diamond-${index}`}*/}
                {/*                                      tokenRef={(element: any) => diamondRefs.current.field[`diamond-${index}`] = element}*/}
                {/*                                      onClick={() => onClickDiamond("field", `diamond-${index}`)}*/}
                {/*                                      position={[GEM_POSITION.diamond.x, GEM_POSITION.diamond.y, GEM_POSITION.diamond.z + index * TokenGemSize.depth]}/>)*/}
                {/*            })*/}
                {/*    }*/}
                {/*</group>*/}
                <group>
                    {
                        deckNoble.map((item, index) => (
                            <CardNoble key={item.id}
                                       id={item.id}
                                       url={item.url}
                                       onClick={() => onClickNoble(item.id)}
                                       onClickNotThis={() => onClickNotCurrent(item.id)}
                                       position={item.position}
                                       rotation={item.rotation}
                                       spring={springs[index]}
                                       ref={(element: any) => nobleRefs.current[item.id] = element}/>
                        ))
                    }
                    {
                        ingameData.fieldNoble.filter(item => item.noble)
                            .map((item: any) => {
                                return <CardNoble key={item.noble.id}
                                                  id={item.noble.id}
                                                  url={item.noble.url}
                                                  onClick={() => onClickNoble(item.noble.id)}
                                                  onClickNotThis={() => onClickNotCurrent(item.noble.id)}
                                                  position={item.position}
                                                  rotation={item.noble.rotation}
                                                  ref={(element: any) => nobleRefs.current[item.noble.id] = element}/>
                            })
                    }
                </group>
            </group>
        </>
    )
}

export default PlayingSpace;