"use client"

import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import GamesSection from "@/component/game/GamesSection";
import GameHistory from "@/component/game/GameHistory";
import GameFavorite from "@/component/game/GameFavorite";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <div className="flex justify-between flex-wrap my-32">
                    <div className="w-full lg:w-3/4 xl:w-4/5 px-10">
                        <GamesSection/>
                    </div>
                    <div className="w-full lg:w-1/4 xl:w-1/5 px-4 flex flex-col gap-10">
                        <GameHistory />
                        <GameFavorite />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
)
}