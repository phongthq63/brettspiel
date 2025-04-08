import {PlayerPosition} from "@/games/splendor/constants/game";

export const getPlayerLocate = (playerIds: string[], playerId: string)  => {
    if (playerIds.length <= 0) return null
    const player = playerIds.indexOf(playerId)
    if (player < 0) {
        // Không phải người chơi
        return null
    }

    return  PlayerPosition.total[playerIds.length].player[player + 1]
}