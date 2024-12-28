import React, {useEffect} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {GameService, IngamePlayerDataVO} from "@/games/splendor/service/splendor.service";
import {PlayerGameInfoBox} from "@/games/splendor/component/PlayerGameInfoBox";
import GameManager from "@/games/splendor/component/GameManager";
import GameCanvas from "@/games/splendor/component/3d/GameCanvas";
import {Button} from "@mui/material";


function GameContainer({gameId}: {gameId: string}) {
    const { gameData, setGameData, isMyTurn } = useGameSplendor()


    // Get data + update data to state
    useEffect(() => {
        GameService.getGameInfo({ gameId: gameId })
            .then(response => {
                if (response.code == 0 && response.data) {
                    setGameData(() => response.data);
                }
            })
            .catch(error => {
                console.log("Get game info error", error);
            });
    }, [gameId]);


    return (
        <>
            <GameManager/>
            <div className="flex flex-col sticky top-0 z-50 bg-cyan-100 rounded-xl space-y-2 p-2">
                <h2 className="text-center text-xl">
                    {
                        gameData && (
                            <>
                                <span className="font-bold text-red-600">
                                    {isMyTurn ? "Your" : `${gameData.ingame_data.current_player}`}</span>
                                <span className="italic"> turn</span>
                            </>
                        )
                    }
                </h2>
                <div className="flex flex-col space-y-2">
                    <h3 className="text-center">Description action</h3>
                    <div className="flex justify-center space-x-2">
                        <Button variant="contained" color="error">Cancel</Button>
                        <Button variant="contained" color="success">Confirm</Button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <div className="md:basis-4/5 h-[40vh] md:h-[80vh]">
                        <GameCanvas/>
                    </div>
                    <div className="relative md:basis-1/5 flex flex-row md:flex-col flex-wrap md:space-y-1">
                        {
                            gameData?.ingame_data.players.map((player: IngamePlayerDataVO) => {
                                return <PlayerGameInfoBox key={player.player_id}
                                                          playerId={player.player_id as string}
                                                          playerGameData={{...player}}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-full h-[1000px] bg-blue-500">AAAAAAAAAAAAAAAAA</div>
        </>
    )
}

export default GameContainer;