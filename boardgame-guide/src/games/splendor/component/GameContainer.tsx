import React, {useEffect} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {PlayerGameInfoBox} from "@/games/splendor/component/PlayerGameInfoBox";
import GameCanvas from "@/games/splendor/component/3d/GameCanvas";
import GameActionDescriptionBox from "@/games/splendor/component/GameActionDescriptionBox";
import {TokenGemType} from "@/games/splendor/constants/gem";


function GameContainer({gameId}: {gameId: string}) {
    const { setGameId,
        players,
        playerCards, playerReserveCards,
        playerNobles,
        playerGems,
    } = useGameSplendor()

    // Get data + update data to state
    useEffect(() => {
        setGameId(gameId)
    }, [gameId]);

    return (
        <>
            <GameActionDescriptionBox/>
            <div className="w-full">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <div className="md:basis-4/5 h-[40vh] md:h-[80vh]">
                        <GameCanvas/>
                    </div>
                    <div className="relative md:basis-1/5 flex flex-row md:flex-col flex-wrap md:space-y-1">
                        {Object.keys(players).map((playerId: string) => (
                            <PlayerGameInfoBox key={playerId}
                                               id={playerId}
                                               data={{
                                                   ...players[playerId],
                                                   cards: playerCards[playerId] ?? [],
                                                   reserveCards: playerReserveCards[playerId] ?? [],
                                                   nobles: playerNobles[playerId] ?? [],
                                                   gold: playerGems[playerId]?.[TokenGemType.GOLD].length ?? 0,
                                                   onyx: playerGems[playerId]?.[TokenGemType.ONYX].length ?? 0,
                                                   ruby: playerGems[playerId]?.[TokenGemType.RUBY].length ?? 0,
                                                   emerald: playerGems[playerId]?.[TokenGemType.EMERALD].length ?? 0,
                                                   sapphire: playerGems[playerId]?.[TokenGemType.SAPPHIRE].length ?? 0,
                                                   diamond: playerGems[playerId]?.[TokenGemType.DIAMOND].length ?? 0}}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-[1000px] bg-blue-500">AAAAAAAAAAAAAAAAA</div>
        </>
    )
}

export default GameContainer;