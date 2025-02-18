import {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import {TokenGoldSize} from "@/games/splendor/component/3d/TokenGold";
import {TokenOnyxSize} from "@/games/splendor/component/3d/TokenOnyx";
import {TokenRubySize} from "@/games/splendor/component/3d/TokenRuby";
import {TokenEmeraldSize} from "@/games/splendor/component/3d/TokenEmerald";
import {TokenSapphireSize} from "@/games/splendor/component/3d/TokenSapphire";
import {TokenDiamondSize} from "@/games/splendor/component/3d/TokenDiamond";


export const CardPosition = {
    level1: {
        desk: [-2.2, -1.2, 0.5 * CardGemSize.depth],
        position1: [-1.2, -1.2, 0.5 * CardGemSize.depth],
        position2: [-0.4, -1.2, 0.5 * CardGemSize.depth],
        position3: [0.4, -1.2, 0.5 * CardGemSize.depth],
        position4: [1.2, -1.2, 0.5 * CardGemSize.depth]
    },
    level2: {
        desk: [-2.2, 0, 0.5 * CardGemSize.depth],
        position1: [-1.2, 0, 0.5 * CardGemSize.depth],
        position2: [-0.4, 0, 0.5 * CardGemSize.depth],
        position3: [0.4, 0, 0.5 * CardGemSize.depth],
        position4: [1.2, 0, 0.5 * CardGemSize.depth]
    },
    level3: {
        desk: [-2.2, 1.2, 0.5 * CardGemSize.depth],
        position1: [-1.2, 1.2, 0.5 * CardGemSize.depth],
        position2: [-0.4, 1.2, 0.5 * CardGemSize.depth],
        position3: [0.4, 1.2, 0.5 * CardGemSize.depth],
        position4: [1.2, 1.2, 0.5 * CardGemSize.depth]
    }
};

export const NoblePosition = {
    desk: [3.5, 2.2, 0.5 * CardNobleSize.depth],
    position1: [3.5, 1.4, 0.5 * CardNobleSize.depth],
    position2: [3.5, 0.7, 0.5 * CardNobleSize.depth],
    position3: [3.5, 0, 0.5 * CardNobleSize.depth],
    position4: [3.5, -0.7, 0.5 * CardNobleSize.depth],
    position5: [3.5, -1.4, 0.5 * CardNobleSize.depth]
};

export const GoldPosition = {
    desk: [2.2, 1.5, 0.5 * TokenGoldSize.depth],
};

export const OnyxPosition = {
    desk: [2.2, 0.9, 0.5 * TokenOnyxSize.depth],
};

export const RubyPosition = {
    desk: [2.2, 0.3, 0.5 * TokenRubySize.depth],
};

export const EmeraldPosition = {
    desk: [2.2, -0.3, 0.5 * TokenEmeraldSize.depth],
};

export const SapphirePosition = {
    desk: [2.2, -0.9, 0.5 * TokenSapphireSize.depth],
};

export const DiamondPosition = {
    desk: [2.2, -1.5, 0.5 * TokenDiamondSize.depth],
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
        z: 0.5 * CardGemSize.depth
    },
    sapphire: {
        x: -0.8,
        y: -3.2,
        z: 0.5 * CardGemSize.depth
    },
    emerald: {
        x: 0,
        y: -3.2,
        z: 0.5 * CardGemSize.depth
    },
    ruby: {
        x: 0.8,
        y: -3.2,
        z: 0.5 * CardGemSize.depth
    },
    onyx: {
        x: 1.6,
        y: -3.2,
        z: 0.5 * CardGemSize.depth
    },
    distance: 0.25
}

export const PLAYER_NOBLE_POSITION = {
    position: {
        x: 2.6,
        y: -3.0,
        z: 0.5 * CardNobleSize.depth,
    },
    distance: 0.2
}

// export const PLAYER_GEM_POSITION = {
//     gold: {
//         x: -2.4,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     },
//     diamond: {
//         x: -1.6,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     },
//     sapphire: {
//         x: -0.8,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     },
//     emerald: {
//         x: 0,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     },
//     ruby: {
//         x: 0.8,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     },
//     onyx: {
//         x: 1.6,
//         y: -3.2,
//         z: 0.5 * TokenGemSize.depth
//     }
// }

export const NotifyGameSplendorStart = 'NotifyGameSplendorStart';
export const NotifyGameSplendorTurnEnd = 'NotifyGameSplendorTurnEnd'