import {GemCardSize} from "@/games/splendor/component/3d/GemCard";
import {NobleCardSize} from "@/games/splendor/component/3d/NobleCard";
import {GemTokenSize} from "@/games/splendor/component/3d/GemToken";


export const CardPosition = {
    level: {
        [1 as number]: {
            desk: [-2.2, -1.2, 0.5 * GemCardSize.depth],
            field: {
                [0 as number]: [-1.2, -1.2, 0.5 * GemCardSize.depth],
                [1 as number]: [-0.4, -1.2, 0.5 * GemCardSize.depth],
                [2 as number]: [0.4, -1.2, 0.5 * GemCardSize.depth],
                [3 as number]: [1.2, -1.2, 0.5 * GemCardSize.depth]
            },
        },
        [2 as number]: {
            desk: [-2.2, 0, 0.5 * GemCardSize.depth],
            field: {
                0: [-1.2, 0, 0.5 * GemCardSize.depth],
                1: [-0.4, 0, 0.5 * GemCardSize.depth],
                2: [0.4, 0, 0.5 * GemCardSize.depth],
                3: [1.2, 0, 0.5 * GemCardSize.depth],
            } as Record<number, [number, number, number]>,
        },
        [3 as number]: {
            desk: [-2.2, 1.2, 0.5 * GemCardSize.depth],
            field: {
                0: [-1.2, 1.2, 0.5 * GemCardSize.depth],
                1: [-0.4, 1.2, 0.5 * GemCardSize.depth],
                2: [0.4, 1.2, 0.5 * GemCardSize.depth],
                3: [1.2, 1.2, 0.5 * GemCardSize.depth],
            } as Record<number, [number, number, number]>,
        }
    }
}

export const NoblePosition = {
    desk: [3.8, 1.2, 0.5 * NobleCardSize.depth],
    field: {
        [0 as number]: [3.5, 0.4, 0.5 * NobleCardSize.depth],
        [1 as number]: [4.2, 0.4, 0.5 * NobleCardSize.depth],
        [2 as number]: [3.5, -0.3, 0.5 * NobleCardSize.depth],
        [3 as number]: [4.2, -0.3, 0.5 * NobleCardSize.depth],
        [4 as number]: [3.5, -1, 0.5 * NobleCardSize.depth]
    }
}

export const GemPosition = {
    gold: [2.2, 1.5, 0.5 * GemTokenSize.depth],
    onyx: [2.2, 0.9, 0.5 * GemTokenSize.depth],
    ruby: [2.2, 0.3, 0.5 * GemTokenSize.depth],
    emerald: [2.2, -0.3, 0.5 * GemTokenSize.depth],
    sapphire: [2.2, -0.9, 0.5 * GemTokenSize.depth],
    diamond: [2.2, -1.5, 0.5 * GemTokenSize.depth]
}

export const PlayerPosition = {
    total: {
        [2 as number]: {
            player: {
                [1 as number]: {
                    position: [0, 0, 0] as [number, number, number],
                    rotation: [0, 0, 0] as [number, number, number]
                },
                [2 as number]: {
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
    diamond: [-1.6, -3.2, 0.5 * GemTokenSize.depth],
    sapphire: [-0.8, -3.2, 0.5 * GemTokenSize.depth],
    emerald: [0, -3.2, 0.5 * GemTokenSize.depth],
    ruby: [0.8, -3.2, 0.5 * GemTokenSize.depth],
    onyx: [1.6, -3.2, 0.5 * GemTokenSize.depth],
    gold: [2.4, -3.2, 0.5 * GemTokenSize.depth],
    reserveCard: [-4.3, -3.2, 0.5 * NobleCardSize.depth],
    noble: [2.6, -2.3, 0.5 * NobleCardSize.depth],
    distance: 0.24,
}

export const NotifyGameSplendorStart = 'NotifyGameSplendorStart';
export const NotifyGameSplendorTurnEnd = 'NotifyGameSplendorTurnEnd'
export const NotifyGameSplendorActionGatherGem = 'NotifyGameSplendorActionGatherGem'
export const NotifyGameSplendorActionBuyCard = 'NotifyGameSplendorActionBuyCard'
export const NotifyGameSplendorActionReserveCard = 'NotifyGameSplendorActionReserveCard'
export const NotifyGameSplendorBonusActionTakeNoble = 'NotifyGameSplendorBonusActionTakeNoble'
