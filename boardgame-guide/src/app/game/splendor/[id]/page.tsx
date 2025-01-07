"use client"

import GameContainer from "@/games/splendor/component/GameContainer";
import React, {useEffect} from "react";
import {GameSplendorProvider} from "@/games/splendor/store/game";


export default function Page({params}: {params: {id: string}}) {
    const { id } = params;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <>
        <GameSplendorProvider>
            <GameContainer gameId={id}/>
        </GameSplendorProvider>
    </>
}