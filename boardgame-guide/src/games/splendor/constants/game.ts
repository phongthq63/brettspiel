import {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import {TokenGemSize} from "@/games/splendor/component/3d/TokenGem";


export const CardPosition = {
    level: {
        [1 as number]: {
            desk: [-2.2, -1.2, 0.5 * CardGemSize.depth],
            field: {
                [0 as number]: [-1.2, -1.2, 0.5 * CardGemSize.depth],
                [1 as number]: [-0.4, -1.2, 0.5 * CardGemSize.depth],
                [2 as number]: [0.4, -1.2, 0.5 * CardGemSize.depth],
                [3 as number]: [1.2, -1.2, 0.5 * CardGemSize.depth]
            },
        },
        [2 as number]: {
            desk: [-2.2, 0, 0.5 * CardGemSize.depth],
            field: {
                0: [-1.2, 0, 0.5 * CardGemSize.depth],
                1: [-0.4, 0, 0.5 * CardGemSize.depth],
                2: [0.4, 0, 0.5 * CardGemSize.depth],
                3: [1.2, 0, 0.5 * CardGemSize.depth],
            } as Record<number, [number, number, number]>,
        },
        [3 as number]: {
            desk: [-2.2, 1.2, 0.5 * CardGemSize.depth],
            field: {
                0: [-1.2, 1.2, 0.5 * CardGemSize.depth],
                1: [-0.4, 1.2, 0.5 * CardGemSize.depth],
                2: [0.4, 1.2, 0.5 * CardGemSize.depth],
                3: [1.2, 1.2, 0.5 * CardGemSize.depth],
            } as Record<number, [number, number, number]>,
        }
    }
}

export const NoblePosition = {
    desk: [3.8, 1.2, 0.5 * CardNobleSize.depth],
    field: {
        [0 as number]: [3.5, 0.4, 0.5 * CardNobleSize.depth],
        [1 as number]: [4.2, 0.4, 0.5 * CardNobleSize.depth],
        [2 as number]: [3.5, -0.3, 0.5 * CardNobleSize.depth],
        [3 as number]: [4.2, -0.3, 0.5 * CardNobleSize.depth],
        [4 as number]: [3.5, -1, 0.5 * CardNobleSize.depth]
    }
}

export const GoldPosition = {
    desk: [2.2, 1.5, 0.5 * TokenGemSize.depth],
}

export const OnyxPosition = {
    desk: [2.2, 0.9, 0.5 * TokenGemSize.depth],
}

export const RubyPosition = {
    desk: [2.2, 0.3, 0.5 * TokenGemSize.depth],
}

export const EmeraldPosition = {
    desk: [2.2, -0.3, 0.5 * TokenGemSize.depth],
}

export const SapphirePosition = {
    desk: [2.2, -0.9, 0.5 * TokenGemSize.depth],
}

export const DiamondPosition = {
    desk: [2.2, -1.5, 0.5 * TokenGemSize.depth],
}

export const PlayerPosition = {
    total: {
        [2 as number]: {
            player: {
                [1 as number]: {
                    position: [0, 0, 0] as [number, number, number],
                    rotation: [0, 0, 0] as [number, number, number]
                },
                [1 as number]: {
                    position: [0, 0, 0] as [number, number, number],
                    rotation: [0, 0, Math.PI] as [number, number, number]
                }
            }
        },
        [3 as number]: {
            player: {
                [1 as number]: {
                    position: [0, 0, 0] as [number, number, number],
                    rotation: [0, 0, 0] as [number, number, number]
                },
                [2 as number]: {
                    position: [4, 0, 0] as [number, number, number],
                    rotation: [0, 0, Math.PI] as [number, number, number]
                },
                [3 as number]: {
                    position: [-4, 0, 0] as [number, number, number],
                    rotation: [0, 0, Math.PI] as [number, number, number]
                }
            }
        },
        [4 as number]: {
            player: {
                [1 as number]: {
                    position: [-4, 0, 0] as [number, number, number],
                    rotation: [0, 0, 0] as [number, number, number]
                },
                [2 as number]: {
                    position: [4, 0, 0] as [number, number, number],
                    rotation: [0, 0, 0] as [number, number, number]
                },
                [3 as number]: {
                    position: [4, 0, 0] as [number, number, number],
                    rotation: [0, 0, Math.PI] as [number, number, number]
                },
                [4 as number]: {
                    position: [-4, 0, 0] as [number, number, number],
                    rotation: [0, 0, Math.PI] as [number, number, number]
                }
            }
        }
    },
    diamond: [-1.6, -3.2, 0.5 * TokenGemSize.depth],
    sapphire: [-0.8, -3.2, 0.5 * TokenGemSize.depth],
    emerald: [0, -3.2, 0.5 * TokenGemSize.depth],
    ruby: [0.8, -3.2, 0.5 * TokenGemSize.depth],
    onyx: [1.6, -3.2, 0.5 * TokenGemSize.depth],
    gold: [2.4, -3.2, 0.5 * TokenGemSize.depth],
    reserveCard: [-3, -3.2, 0.5 * CardNobleSize.depth],
    noble: [2.6, -2.3, 0.5 * CardNobleSize.depth],
    distance: 0.24,
}

export const NotifyGameSplendorStart = 'NotifyGameSplendorStart';
export const NotifyGameSplendorTurnEnd = 'NotifyGameSplendorTurnEnd'
export const NotifyGameSplendorActionGatherGem = 'NotifyGameSplendorActionGatherGem'