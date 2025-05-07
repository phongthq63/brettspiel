"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {getItem} from "@/hooks/cookie/useCookie";
import {socketUrl} from "../../config";


const SocketContext = createContext<{
    socket: Socket | undefined
    connected: boolean
} | undefined>(undefined);


export const SocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState(false);


    useEffect(() => {
        const token = getItem('access-token')
        if (!token) return

        const socketInstance = io(`${socketUrl}`, {
            transports: ["websocket", "polling"],
            auth: {
                token: "123"
            },
            query: {
                "token": token
            },
            extraHeaders: {
                "Authentication": "TTTTTTTTTTTTTTTTTT"
            }
        });

        function onConnect() {
            console.log("Connected to Socket");
            setConnected(true);
        }

        function onDisconnect() {
            console.log("Disconnected to Socket");
            setConnected(false);
        }

        socketInstance.on("connect", onConnect);
        socketInstance.on("disconnect", onDisconnect);

        setSocket(socketInstance)

        return () => {
            socketInstance.off("connect", onConnect);
            socketInstance.off("disconnect", onDisconnect);
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    )
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context == undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};