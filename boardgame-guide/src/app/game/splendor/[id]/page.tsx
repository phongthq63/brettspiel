"use client"

import {GameView} from "@/games/splendor/component/GameView";
import React from "react";
import {GameSplendorProvider} from "@/games/splendor/store/game";

export default function Page({params}: {params: {id: string}}) {
    const { id } = params;

    return <>
        <GameSplendorProvider>
            {/*<SocketManager />*/}
            <GameView gameId={id}/>
        </GameSplendorProvider>
    </>
}