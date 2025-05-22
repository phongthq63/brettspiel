"use client"

import React, {use, useEffect} from "react";
import GamePlaySection from "@/games/splendor/component/GamePlaySection";
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
                <GamePlaySection gameId={id}/>
                <div className="w-full h-96 bg-blue-500 mt-60"></div>
            </main>
            <Footer/>
        </div>
    )
}