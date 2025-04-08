import React from "react";
import PlayerGameInfoBox from "@/games/splendor/component/ui/PlayerGameInfo";
import GameCanvas from "@/games/splendor/component/3d/GameRenderer";
import ActionDescription from "@/games/splendor/component/ui/ActionDescription";
import {useFetchGameData} from "@/games/splendor/hooks/useFetchGameData";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";

function GameContainer({gameId}: {gameId: string}) {
    const players = useGameStore(useShallow((state) => state.players))
    useFetchGameData(gameId)


    const hasPlayers = Object.keys(players || {}).length > 0


    return (
        <>
            <div className="w-full h-screen fixed z-0">
                <ActionDescription/>
            </div>
            <div className="w-full">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <div className={`${hasPlayers ? 'md:basis-4/5' : 'w-full'} h-[40vh] md:h-[80vh]`}>
                        <GameCanvas/>
                    </div>
                    {hasPlayers && (
                        <div className="relative md:basis-1/5 flex flex-row md:flex-col flex-wrap md:space-y-1">
                            {Object.keys(players).map((playerId: string) => (
                                <PlayerGameInfoBox 
                                    key={playerId}
                                    playerId={playerId}
                                    data={{
                                        ...players[playerId],
                                        nobles: players[playerId].nobles,
                                        reserveCards: players[playerId].reserveCards,
                                        cardDiamond: players[playerId].cards.diamond.length,
                                        cardSapphire: players[playerId].cards.sapphire.length,
                                        cardEmerald: players[playerId].cards.emerald.length,
                                        cardRuby: players[playerId].cards.ruby.length,
                                        cardOnyx: players[playerId].cards.onyx.length,
                                        gold: players[playerId].gems.gold.length,
                                        diamond: players[playerId].gems.diamond.length,
                                        sapphire: players[playerId].gems.sapphire.length,
                                        emerald: players[playerId].gems.emerald.length,
                                        ruby: players[playerId].gems.ruby.length,
                                        onyx: players[playerId].gems.onyx.length
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-[1000px] bg-blue-500">AAAAAAAAAAAAAAAAA</div>
        </>
    )
}

export default GameContainer;