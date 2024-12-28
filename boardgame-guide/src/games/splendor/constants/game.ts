export const CARD_POSITION = {
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

export const NOBLE_POSITION = {
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

export const GEM_POSITION = {
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

export interface INoble {
    id: string,
    url: string,
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface IFieldNoble {
    position: [number, number, number]
    noble?: INoble
}

export interface ICard {
    id: string,
    type: string,
    level: number
    url: string
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface IFieldCard {
    position: [number, number, number]
    card?: ICard
}

export interface IIngameData {
    gameId: string,
    status: number
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

export const ingameData : IIngameData = {
    gameId: "",
    status: -1,
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


export const NotifyGameSplendorInit = 'NotifyGameSplendorInit';