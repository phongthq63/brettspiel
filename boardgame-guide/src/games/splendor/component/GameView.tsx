import {Canvas} from "@react-three/fiber";
import React, {useEffect} from "react";
import {IngameScene} from "./IngameScene";
import {useGameSplendor} from "@/games/splendor/store/game";
import {GameService, IngamePlayerDataVO} from "@/games/splendor/service/splendor.service";
import {PlayerGameInfoBox} from "@/games/splendor/component/PlayerGameInfoBox";


export function GameView({gameId}: {gameId: string}) {
    const { gameData, setGameData } = useGameSplendor()

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
        <div className="w-full h-screen">
            <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                <div className="md:basis-4/5 h-[40vh] md:h-[80vh]">
                    <Canvas className="rounded" camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 5], rotation: [0, 0, 0]}}>
                        <IngameScene/>
                    </Canvas>
                </div>
                <div className="md:basis-1/5 md:h-lvh flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-1">
                    {
                        gameData?.ingame_data.players.map((player: IngamePlayerDataVO) => {
                            return <PlayerGameInfoBox key={player.player_id} playerId={player.player_id as string} playerGameData={{...player}} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}