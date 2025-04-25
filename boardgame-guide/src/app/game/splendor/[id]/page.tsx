"use client"

import React, {use, useEffect} from "react";
import GameContainer from "@/games/splendor/component/GameContainer";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";

export default function Page({ params } : { params: Promise<{ id: string }>}) {
    const {id} = use(params);


    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 0)
    }, [])


    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GameContainer gameId={id}/>
            </main>
            <Footer/>
        </div>
    )
}