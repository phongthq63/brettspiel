"use client"

import GameContainer from "@/games/splendor/component/GameContainer";
import React, {useEffect} from "react";
import {GameSplendorProvider} from "@/games/splendor/store/game";


export default function Page({ params } : { params: Promise<{ id: string }>}) {
    const { id } = React.use(params);

    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 0)
    }, [])

    return <>
        <GameSplendorProvider>
            <GameContainer gameId={id}/>
        </GameSplendorProvider>
    </>
}