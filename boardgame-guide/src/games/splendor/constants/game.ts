import {CARD_GEM_SIZE} from "@/games/splendor/component/3d/CardGem";
import {CARD_NOBLE_SIZE} from "@/games/splendor/component/3d/CardNoble";
import {TOKEN_GEM_SIZE} from "@/games/splendor/component/3d/TokenGem";

export const CARD_POSITION = {
    level1: {
        desk: {
            x: -2.2,
            y: -1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position1: {
            x: -1.2,
            y: -1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position2: {
            x: -0.4,
            y: -1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position3: {
            x: 0.4,
            y: -1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position4: {
            x: 1.2,
            y: -1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        }
    },
    level2: {
        desk: {
            x: -2.2,
            y: 0,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position1: {
            x: -1.2,
            y: 0,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position2: {
            x: -0.4,
            y: 0,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position3: {
            x: 0.4,
            y: 0,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position4: {
            x: 1.2,
            y: 0,
            z: 0.5 * CARD_GEM_SIZE.depth
        }
    },
    level3: {
        desk: {
            x: -2.2,
            y: 1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position1: {
            x: -1.2,
            y: 1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position2: {
            x: -0.4,
            y: 1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position3: {
            x: 0.4,
            y: 1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        },
        position4: {
            x: 1.2,
            y: 1.2,
            z: 0.5 * CARD_GEM_SIZE.depth
        }
    }
};

export const NOBLE_POSITION = {
    desk: {
        x: 3.5,
        y: 2.2,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    },
    position1: {
        x: 3.5,
        y: 1.4,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    },
    position2: {
        x: 3.5,
        y: 0.7,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    },
    position3: {
        x: 3.5,
        y: 0,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    },
    position4: {
        x: 3.5,
        y: -0.7,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    },
    position5: {
        x: 3.5,
        y: -1.4,
        z: 0.5 * CARD_NOBLE_SIZE.depth
    }
};

export const GEM_POSITION = {
    gold: {
        x: 2.2,
        y: 1.5,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    onyx: {
        x: 2.2,
        y: 0.9,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    ruby: {
        x: 2.2,
        y: 0.3,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    emerald: {
        x: 2.2,
        y: -0.3,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    sapphire: {
        x: 2.2,
        y: -0.9,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    diamond: {
        x: 2.2,
        y: -1.5,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    }
};

export const PLAYER_POSITION = {
    player1: {
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        }
    },
    player2: {
        position: {
            x: -2.2,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: -Math.PI/2,
        }
    },
    player3: {
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: Math.PI,
        }
    },
    player4: {
        position: {
            x: 2.2,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: Math.PI/2,
        }
    },
}

export const PLAYER_CARD_POSITION = {
    diamond: {
        x: -1.6,
        y: -3.2,
        z: 0.5 * CARD_GEM_SIZE.depth
    },
    sapphire: {
        x: -0.8,
        y: -3.2,
        z: 0.5 * CARD_GEM_SIZE.depth
    },
    emerald: {
        x: 0,
        y: -3.2,
        z: 0.5 * CARD_GEM_SIZE.depth
    },
    ruby: {
        x: 0.8,
        y: -3.2,
        z: 0.5 * CARD_GEM_SIZE.depth
    },
    onyx: {
        x: 1.6,
        y: -3.2,
        z: 0.5 * CARD_GEM_SIZE.depth
    },
    distance: 0.25
}

export const PLAYER_NOBLE_POSITION = {
    position: {
        x: 2.6,
        y: -3.0,
        z: 0.5 * CARD_NOBLE_SIZE.depth,
    },
    distance: 0.2
}

export const PLAYER_GEM_POSITION = {
    gold: {
        x: -2.4,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    diamond: {
        x: -1.6,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    sapphire: {
        x: -0.8,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    emerald: {
        x: 0,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    ruby: {
        x: 0.8,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    },
    onyx: {
        x: 1.6,
        y: -3.2,
        z: 0.5 * TOKEN_GEM_SIZE.depth
    }
}

export const NotifyGameSplendorInit = 'NotifyGameSplendorInit';
export const NotifyGameSplendorStart = 'NotifyGameSplendorStart';
export const NotifyGameSplendorTurnEnd = 'NotifyGameSplendorTurnEnd'