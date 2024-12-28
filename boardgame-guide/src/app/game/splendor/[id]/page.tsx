"use client"

import GameContainer from "@/games/splendor/component/GameContainer";
import React from "react";
import {GameSplendorProvider} from "@/games/splendor/store/game";


export default function Page({params}: {params: {id: string}}) {
    const { id } = params;

    return <>
        <GameSplendorProvider>
            <GameContainer gameId={id}/>
        </GameSplendorProvider>
    </>
}