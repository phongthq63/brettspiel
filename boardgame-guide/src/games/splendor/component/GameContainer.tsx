import React, {useEffect} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {GameService, IngamePlayerDataVO} from "@/games/splendor/service/splendor.service";
import {PlayerGameInfoBox} from "@/games/splendor/component/PlayerGameInfoBox";
import GameCanvas from "@/games/splendor/component/3d/GameCanvas";
import GameActionDescriptionBox from "@/games/splendor/component/GameActionDescriptionBox";


function GameContainer({gameId}: {gameId: string}) {
    const { gameData, setGameData } = useGameSplendor()

    // Get data + update data to state
    useEffect(() => {
        GameService.getGameInfo({ gameId: gameId })
            .then(response => {
                if (response.code == 0 && response.data) {
                    setGameData(response.data);
                } else {
                    console.log("Get game info false", response);
                }
            })
            .catch(error => {
                console.log("Get game info error", error);
            });
    }, [gameId]);

    return (
        <>
            {gameData && (
                <GameActionDescriptionBox/>
            )}
            <div className="w-full">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <div className="md:basis-4/5 h-[40vh] md:h-[80vh]">
                        <GameCanvas/>
                    </div>
                    <div className="relative md:basis-1/5 flex flex-row md:flex-col flex-wrap md:space-y-1">
                        {gameData?.ingame_data?.players?.map((player: IngamePlayerDataVO) => (
                            <PlayerGameInfoBox key={player.player_id}
                                               playerId={player.player_id as string}
                                               playerGameData={{...player}}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-[1000px] bg-blue-500">AAAAAAAAAAAAAAAAA</div>
        </>
    )
}

export default GameContainer;