import {io} from "socket.io-client"
import {useEffect} from "react";

export const socket = io("http://localhost:8699", {
    transports: ["websocket", "polling"],
    auth: {
        token: "123"
    },
    query: {
        "my-key": "my-value"
    },
    extraHeaders: {
        "Authentication": "TTTTTTTTTTTTTTTTTT"
    }
});

export const SocketManager = () => {
    useEffect(() => {
        function onConnect() {
            console.log("onConnect");
            console.log(socket.io.engine.transport.name);
        }
        function onDisconnect() {
            console.log("onDisconnect");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        }
    }, [])
};