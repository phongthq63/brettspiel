import React, {useEffect, useRef, useState} from "react";
import {CARD_GEM_SIZE, CardGemLevel1, CardGemLevel2, CardGemLevel3} from "./CardGem";
import {BoardSize, GameBoard} from "./GameBoard";
import {gsap} from 'gsap';
import {CARD_NOBLE_SIZE, CardNoble} from "./CardNoble";
import {TokenDiamond, TokenEmerald, TokenGemSize, TokenGold, TokenOnyx, TokenRuby, TokenSapphire} from "./TokenGem";
import {CARDS} from "../constants/card";
import {NOBLES} from "../constants/noble";
import {OrbitControls} from "@react-three/drei";
import {Floor} from "./Floor";
import {TableService} from "@/games/splendor/service/splendor.service";


const CARD_POSITION = {
    level1: {
        desk: {
            x: -2.2,
            y: -1.2,
            z: 0
        },
        position1: {
            x: -1.2,
            y: -1.2,
            z: 0
        },
        position2: {
            x: -0.4,
            y: -1.2,
            z: 0
        },
        position3: {
            x: 0.4,
            y: -1.2,
            z: 0
        },
        position4: {
            x: 1.2,
            y: -1.2,
            z: 0
        }
    },
    level2: {
        desk: {
            x: -2.2,
            y: 0,
            z: 0
        },
        position1: {
            x: -1.2,
            y: 0,
            z: 0
        },
        position2: {
            x: -0.4,
            y: 0,
            z: 0
        },
        position3: {
            x: 0.4,
            y: 0,
            z: 0
        },
        position4: {
            x: 1.2,
            y: 0,
            z: 0
        }
    },
    level3: {
        desk: {
            x: -2.2,
            y: 1.2,
            z: 0
        },
        position1: {
            x: -1.2,
            y: 1.2,
            z: 0
        },
        position2: {
            x: -0.4,
            y: 1.2,
            z: 0
        },
        position3: {
            x: 0.4,
            y: 1.2,
            z: 0
        },
        position4: {
            x: 1.2,
            y: 1.2,
            z: 0
        }
    }
};

const NOBLE_POSITION = {
    desk: {
        x: 3.5,
        y: 2.2,
        z: 0
    },
    position1: {
        x: 3.5,
        y: 1.4,
        z: 0
    },
    position2: {
        x: 3.5,
        y: 0.7,
        z: 0
    },
    position3: {
        x: 3.5,
        y: 0,
        z: 0
    },
    position4: {
        x: 3.5,
        y: -0.7,
        z: 0
    },
    position5: {
        x: 3.5,
        y: -1.4,
        z: 0
    }
};

const GEM_POSITION = {
    gold: {
        x: 2.2,
        y: 1.5,
        z: 0
    },
    onyx: {
        x: 2.2,
        y: 0.9,
        z: 0
    },
    ruby: {
        x: 2.2,
        y: 0.3,
        z: 0
    },
    emerald: {
        x: 2.2,
        y: -0.3,
        z: 0
    },
    sapphire: {
        x: 2.2,
        y: -0.9,
        z: 0
    },
    diamond: {
        x: 2.2,
        y: -1.5,
        z: 0
    }
};

interface INoble {
    id: string,
    url: string,
    position: [number, number, number]
}

interface IFieldNoble {
    position: [number, number, number]
    noble?: INoble
}

interface ICard {
    id: string,
    type: string,
    level: number
    url: string
    position: [number, number, number]
}

interface IFieldCard {
    position: [number, number, number]
    card?: ICard
}

interface IIngameData {
    deskNoble: INoble[],
    fieldNoble: IFieldNoble[],
    deskCardLevel1: ICard[],
    fieldCardLevel1: IFieldCard[],
    deskCardLevel2: ICard[],
    fieldCardLevel2: IFieldCard[],
    deskCardLevel3: ICard[],
    fieldCardLevel3: IFieldCard[],
    gold: number,
    onyx: number,
    ruby: number,
    emerald: number,
    sapphire: number,
    diamond: number
}

const ingameData : IIngameData = {
    deskNoble: [],
    fieldNoble: Array.from({ length: 5 }, (_, i) => i)
        .map(index => {
            switch (index) {
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
        }),
    deskCardLevel1: [],
    fieldCardLevel1: Array.from({ length: 4 }, (_, i) => i)
        .map(index => {
            switch (index) {
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
        }),
    deskCardLevel2: [],
    fieldCardLevel2: Array.from({ length: 4 }, (_, i) => i)
        .map(index => {
            switch (index) {
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
        }),
    deskCardLevel3: [],
    fieldCardLevel3: Array.from({ length: 4 }, (_, i) => i)
        .map(index => {
            switch (index) {
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
        }),
    gold: 0,
    onyx: 0,
    ruby: 0,
    emerald: 0,
    sapphire: 0,
    diamond: 0
};

export function IngameScene() {
    const [, setServerData] = useState({});
    const [gameStatus, setGameStatus] = useState<string>("init");

    const cardRefs = useRef<any>({});
    const nobleRefs = useRef<any>({});


    useEffect(() => {
        // Call server to get data
        TableService.getListTableInfo()
            .then(r => {
                console.log(r.data);
            })
        setServerData({
            deskNoble: NOBLES,
            deskCardLevel1: CARDS.filter(card => card.level == 1),
            deskCardLevel2: CARDS.filter(card => card.level == 2),
            deskCardLevel3: CARDS.filter(card => card.level == 3),
            gold: 5,
            onyx: 7,
            ruby: 7,
            emerald: 7,
            sapphire: 7,
            diamond: 7
        });

        // Set data ingame
        ingameData.deskNoble = NOBLES.map((item, index) => {
                return {
                    ...item,
                    position: [NOBLE_POSITION.desk.x, NOBLE_POSITION.desk.y, (index + 0.5) * CARD_NOBLE_SIZE.depth + NOBLE_POSITION.desk.z]
                }
            });
        ingameData.deskCardLevel1 = CARDS.filter(card => card.level == 1)
            .map((item, index) => {
                return {
                    ...item,
                    position: [CARD_POSITION.level1.desk.x, CARD_POSITION.level1.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level1.desk.z]
                }
            });
        ingameData.deskCardLevel2 = CARDS.filter(card => card.level == 2)
            .map((item, index) => {
                return {
                    ...item,
                    position: [CARD_POSITION.level2.desk.x, CARD_POSITION.level2.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level2.desk.z]
                }
            });
        ingameData.deskCardLevel3 = CARDS.filter(card => card.level == 3)
            .map((item, index) => {
                return {
                    ...item,
                    position: [CARD_POSITION.level3.desk.x, CARD_POSITION.level3.desk.y, (index + 0.5) * CARD_GEM_SIZE.depth + CARD_POSITION.level3.desk.z]
                }
            });
        ingameData.gold = 5;
        ingameData.onyx = 7;
        ingameData.ruby = 7;
        ingameData.emerald = 7;
        ingameData.sapphire = 7;
        ingameData.diamond = 7;

        // Set game status
        if (true) {
            setGameStatus("start");
        }

    }, []);

    useEffect(() => {
        if (gameStatus == "start") {
            startGame();
        }
    }, [gameStatus]);

    const startGame = () => {
        console.log("Start game");

        // Set field noble
        const nobleOpenCount = 5;
        const nobleOpens = ingameData.deskNoble.slice(0, nobleOpenCount);
        for (let i = 0; i < nobleOpenCount; i++) {
            nobleOpens[i].position = ingameData.fieldNoble[i].position;
            ingameData.fieldNoble[i].noble = nobleOpens[i];
        }

        // Set field card level 3
        const card3OpenCount = 4;
        const card3Opens = ingameData.deskCardLevel3.slice(0, card3OpenCount);
        for (let i = 0; i < card3OpenCount; i++) {
            card3Opens[i].position = ingameData.fieldCardLevel3[i].position;
            ingameData.fieldCardLevel3[i].card = card3Opens[i];
        }

        // Set field card level 2
        const card2OpenCount = 4;
        const card2Opens = ingameData.deskCardLevel2.slice(0, card2OpenCount);
        for (let i = 0; i < card2OpenCount; i++) {
            card2Opens[i].position = ingameData.fieldCardLevel2[i].position;
            ingameData.fieldCardLevel2[i].card = card2Opens[i];
        }

        // Set field card level 1
        const card1OpenCount = 4;
        const card1Opens = ingameData.deskCardLevel1.slice(0, card1OpenCount);
        for (let i = 0; i < card1OpenCount; i++) {
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
        const endX = position[0];
        const startY = nobleRefs.current[nobleId].position.y;
        const endY = position[1];
        const startZ = nobleRefs.current[nobleId].position.z;
        const endZ = position[2];
        const peakHeight = 1.2;

        return gsap.timeline()
            .to(nobleRefs.current[nobleId].position, {
                x: endX,
                y: endY,
                duration: 0.6,
                ease: "power1.out",
                onUpdate: () => {
                    const currentY = nobleRefs.current[nobleId].position.y;
                    nobleRefs.current[nobleId].position.z = (startZ - peakHeight) / Math.pow((startY + endY) / 2 - startY, 2) * Math.pow(currentY - (startY + endY) / 2, 2) + peakHeight;
                }
            })
            .to(nobleRefs.current[nobleId].rotation, {
                y: 0,
                duration: 0.5,
            }, 0)
            .to(nobleRefs.current[nobleId].position, {
                x: endX,
                y: endY,
                z: endZ,
            })
    };

    const openCard = (cardId: string, position: [number, number, number]) => {
        const startX = cardRefs.current[cardId].position.x;
        const endX = position[0];
        const endY = position[1];
        const startZ = cardRefs.current[cardId].position.z;
        const endZ = position[2];
        const peakHeight = 1;

        return gsap.timeline()
            .to(cardRefs.current[cardId].position, {
                x: endX,
                y: endY,
                duration: 0.5,
                ease: "power1.out",
                onUpdate: () => {
                    const currentX = cardRefs.current[cardId].position.x;
                    cardRefs.current[cardId].position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                }
            }, 0)
            .to(cardRefs.current[cardId].rotation, {
                y: 0,
                duration: 0.4,
            }, 0)
            .to(cardRefs.current[cardId].position, {
                x: endX,
                y: endY,
                z: endZ
            });
    };



    return (
        <>
            <OrbitControls/>
            <Floor position={[0, 0, -10]}/>
            <GameBoard position={[0, 0, -BoardSize.depth/2]} />
            <group>
                {
                    ingameData.deskCardLevel3.map((item) => {
                        return <CardGemLevel3 key={item.id} cardRef={(element: any) => (cardRefs.current[item.id] = element)} url={item.url} position={item.position} />
                    })
                }
            </group>
            <group>
                {
                    ingameData.deskCardLevel2.map((item) => {
                        return <CardGemLevel2 key={item.id} cardRef={(element: any) => (cardRefs.current[item.id] = element)} url={item.url} position={item.position} />
                    })
                }
            </group>
            <group>
                {
                    ingameData.deskCardLevel1.map((item) => {
                        return <CardGemLevel1 key={item.id} cardRef={(element: any) => (cardRefs.current[item.id] = element)} url={item.url} position={item.position} />
                    })
                }
            </group>
            <group>
                {
                    Array.from({ length: ingameData.gold }, (_, i) => i)
                        .map(index => {
                            return (<TokenGold key={`gold-${index}`} position={[GEM_POSITION.gold.x, GEM_POSITION.gold.y, GEM_POSITION.gold.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({ length: ingameData.onyx }, (_, i) => i)
                        .map(index => {
                            return (<TokenOnyx key={`onyx-${index}`} position={[GEM_POSITION.onyx.x, GEM_POSITION.onyx.y, GEM_POSITION.onyx.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({ length: ingameData.ruby }, (_, i) => i)
                        .map(index => {
                            return (<TokenRuby key={`ruby-${index}`} position={[GEM_POSITION.ruby.x, GEM_POSITION.ruby.y, GEM_POSITION.ruby.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({ length: ingameData.emerald }, (_, i) => i)
                        .map(index => {
                            return (<TokenEmerald key={`emerald-${index}`} position={[GEM_POSITION.emerald.x, GEM_POSITION.emerald.y, GEM_POSITION.emerald.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({ length: ingameData.sapphire }, (_, i) => i)
                        .map(index => {
                            return (<TokenSapphire key={`sapphire-${index}`} position={[GEM_POSITION.sapphire.x, GEM_POSITION.sapphire.y, GEM_POSITION.sapphire.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({ length: ingameData.diamond }, (_, i) => i)
                        .map(index => {
                            return (<TokenDiamond key={`diamond-${index}`} position={[GEM_POSITION.diamond.x, GEM_POSITION.diamond.y, GEM_POSITION.diamond.z + (index + 0.5) * TokenGemSize.depth]}/>)
                        })
                }
            </group>

            <group>
                {
                    ingameData.deskNoble.map((item) => {
                        return <CardNoble key={item.id} cardRef={(element: any) => nobleRefs.current[item.id] = element} url={item.url} position={item.position}/>
                    })
                }
            </group>
        </>
    )
}