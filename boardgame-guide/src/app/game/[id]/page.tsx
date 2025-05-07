import React from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import {GameService} from "@/service/game.service";
import {notFound} from "next/navigation";
import GameDetail from "@/component/game-detail/GameDetail";


export default async function Page({ params } : { params: Promise<{ id: string }>}) {
    const { id } = await params;
    let gameData;

    try {
        const response = await GameService.getGameInfo({gameId: id});
        gameData = response.data;
    } catch (error) {
        console.error("Error fetching game data:", error);
    }


    if(!gameData) {
        notFound();
    }

    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GameDetail data={gameData} />
            </main>
            <Footer/>
        </div>
    )
}
