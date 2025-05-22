import {useUser} from "@/store/user.context";
import {useSocket} from "@/store/socket.context";
import {useEffect} from "react";
import {RoomService} from "@/service/socket.service";
import {useGame} from "@/hooks/useGame";

export function useGameSocket(roomId: string) {
    const {user} = useUser()
    const {socket, connected} = useSocket()
    const { onStartPlay } = useGame()


    // Socket join room gamedetail
    useEffect(() => {
        if (user && roomId && connected) {
            RoomService.joinRoom({ body: { user_id: user.id, room_id: roomId } })
                .then(response => {
                    if (response.code == 0) {
                        console.log("Join room successfully", user.id, roomId)
                    } else {
                        console.log("Join room fail", user.id, roomId)
                    }
                })
                .catch(error => {
                    console.log("Join room error", error);
                });
        }
    }, [connected, roomId, user]);

    // Handler socket event
    useEffect(() => {
        function onEventGameRoom(data: any) {
            onStartPlay(data.data)
        }

        if (socket) {
            socket.on("game", onEventGameRoom);
        }

        return () => {
            if (socket) {
                socket.off("game", onEventGameRoom);
            }
        }
    }, [onStartPlay, socket]);
}