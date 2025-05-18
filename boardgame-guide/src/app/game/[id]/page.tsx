import React from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import {GameService} from "@/service/server/game.service";
import {notFound} from "next/navigation";
import {GameDetail} from "@/component/game-detail";
import {GameSetupProvider} from "@/store/game-setup/game-setup.context";
import {GameDetailProvider} from "@/store/game-detail.context";


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
                <GameDetailProvider data={gameData}>
                    <GameSetupProvider>
                        <GameDetail />
                    </GameSetupProvider>
                </GameDetailProvider>
            </main>
            <Footer/>
        </div>
    )
}
