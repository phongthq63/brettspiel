import {useUser} from "@/store/user";
import {useSocket} from "@/store/socket";
import {useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {NotifyGameSplendorActionBuyCard, NotifyGameSplendorActionGatherGem,
    NotifyGameSplendorActionReserveCard,
    NotifyGameSplendorBonusActionTakeNoble, NotifyGameSplendorStart, NotifyGameSplendorTurnEnd} from "@/games/splendor/constants/game";
import {useGameController} from "@/games/splendor/hooks/useGameController";

export function useGameSocket(gameId: string) {
    const {user} = useUser()
    const {socket, connected} = useSocket()
    const {
        onStartGame,
        onTurnEnd,
        onPlayerGatherGem,
        onPlayerBuyCard,
        onPlayerReserveCard,
        onPlayerTakeNoble
    } = useGameController()


    // Socket join room game
    useEffect(() => {
        if (user && gameId && connected) {
            RoomService.joinRoom({ body: { user_id: user.user_id, room_id: gameId } })
                .then(response => {
                    if (response.code == 0) {
                        console.log("Join room successfully", user.user_id, gameId)
                    } else {
                        console.log("Join room fail", user.user_id, gameId)
                    }
                })
                .catch(error => {
                    console.log("Join room error", error);
                });
        }
    }, [connected, gameId, user]);

    // Handler socket event
    useEffect(() => {
        function onEventGameSplendor(data: any) {
            console.log(data)

            const cmdSocket = data?.cmd
            const dataSocket = data.data
            switch (cmdSocket) {
                case NotifyGameSplendorStart:
                    onStartGame(dataSocket)
                    break
                case NotifyGameSplendorTurnEnd:
                    onTurnEnd(dataSocket)
                    break
                case NotifyGameSplendorActionGatherGem:
                    onPlayerGatherGem(dataSocket)
                    break
                case NotifyGameSplendorActionBuyCard:
                    onPlayerBuyCard(dataSocket)
                    break
                case NotifyGameSplendorActionReserveCard:
                    onPlayerReserveCard(dataSocket)
                    break
                case NotifyGameSplendorBonusActionTakeNoble:
                    onPlayerTakeNoble(dataSocket)
                    break
            }
        }

        if (socket) {
            socket.on("game_splendor", onEventGameSplendor);
        }

        return () => {
            if (socket) {
                socket.off("game_splendor", onEventGameSplendor);
            }
        }
    }, [onPlayerBuyCard, onPlayerGatherGem, onPlayerReserveCard, onPlayerTakeNoble, onStartGame, onTurnEnd, socket]);
}