"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {getItem} from "@/hook/useCookie";


const SocketContext = createContext<any>(undefined);


export const SocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState<Socket>();
    const [connected, setConnected] = useState(false);


    // useEffect(() => {
    //     const socketInstance = io("http://localhost:8699", {
    //         transports: ["websocket", "polling"],
    //         auth: {
    //             token: "123"
    //         },
    //         query: {
    //             "token": getItem('access-token')
    //         },
    //         extraHeaders: {
    //             "Authentication": "TTTTTTTTTTTTTTTTTT"
    //         }
    //     });
    //
    //     function onConnect() {
    //         console.log("Connected to Socket");
    //         setConnected(true);
    //     }
    //
    //     function onDisconnect() {
    //         console.log("Disconnected to Socket");
    //         setConnected(false);
    //     }
    //
    //     socketInstance.on("connect", onConnect);
    //     socketInstance.on("disconnect", onDisconnect);
    //
    //     setSocket(socketInstance)
    //
    //     return () => {
    //         socketInstance.off("connect", onConnect);
    //         socketInstance.off("disconnect", onDisconnect);
    //         socketInstance.disconnect();
    //     }
    // }, [])

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