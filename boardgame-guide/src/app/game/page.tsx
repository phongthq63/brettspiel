"use client"

import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import GamesSection from "@/component/game/GamesSection";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GamesSection />
            </main>
            <Footer/>
        </div>
    )
}