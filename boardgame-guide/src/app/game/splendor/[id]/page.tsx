"use client"

import React, {use, useEffect} from "react";
import GameContainer from "@/games/splendor/component/GameContainer";

export default function Page({ params } : { params: Promise<{ id: string }>}) {
    const {id} = use(params);


    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 0)
    }, [])


    return (
        <GameContainer gameId={id}/>
    )
}