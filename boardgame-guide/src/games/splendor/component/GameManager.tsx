import React, {memo, useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {useUser} from "@/store/user";
import {GameService} from "@/games/splendor/service/splendor.service";
import {wait} from "@/utils";
import {NotifyGameSplendorTurnEnd} from "@/games/splendor/constants/game";

function GameManager() {
    const { user } = useUser()
    const { socket, connected } = useSocket()
    const { gameData, setGameData,
        isDataReady,
    } = useGameSplendor()


    // Handler socket event
    useEffect(() => {
        if (!socket) return

        function onEventGameSplendor(data: any) {
            console.log("onEventGameSplendor", data);

            const cmdSocket = data?.cmd
            const dataSocket = data.data
            switch (cmdSocket) {
                case NotifyGameSplendorTurnEnd:
                    handlerTurnEnd(dataSocket)
                    break;
            }
        }

        socket.on("game_splendor", onEventGameSplendor);

        return () => {
            socket.off("game_splendor", onEventGameSplendor);
        }
    }, [socket]);

    // Socket join room game
    useEffect(() => {
        if (user && gameData && connected) {

            RoomService.joinRoom({ body: { user_id: user.user_id, room_id: gameData.game_id } })
                .then(response => {
                    if (response.code == 0) {
                        console.log("Join room successfully", user.user_id, gameData.game_id)
                    } else {
                        console.log("Join room fail", user.user_id, gameData.game_id)
                    }
                })
                .catch(error => {
                    console.log("Join room error", error);
                });
        }
    }, [connected, gameData, user]);

    // Start game
    useEffect(() => {
        if (connected && isDataReady && gameData.status == 0) {
            // Request start game
            const startGame = async () => {
                await wait(2000)

                GameService.startGame({gameId: gameData.game_id})
                    .then(response => {
                        console.log("Start game", response)
                    })
                    .catch(error => {
                        console.log("Start game error", error);
                    })
            }

            startGame()
        }
    }, [connected, isDataReady])


    const handlerTurnEnd = (data: any) => {
        setGameData((stateData: any) => {
            const ingameData = {...stateData.ingame_data, current_player: data.current_player, next_player: data.next_player}

            return {...stateData, ingame_data: ingameData}
        })
    }

    return <></>
}

export default memo(GameManager);