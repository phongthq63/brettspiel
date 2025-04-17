"use client"

import React from "react";
import Header from "@/component/home/Header";
import Footer from "@/component/layout/Footer";
import BannerSection from "@/component/home/BannerSection";
import GameHistory from "@/component/home/GameHistory";
import FeaturedGames from "@/component/home/FeaturedGames";
import FeedbackSection from "@/component/home/FeedbackSection";
import GamesSection from "@/component/home/GamesSection";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header />
            <main id="home">
                <BannerSection />
                <div className="flex justify-between flex-wrap mb-60">
                    <div className="w-full lg:w-4/5 px-4">
                        <FeaturedGames />
                        <GamesSection />
                    </div>
                    <div className="w-full lg:w-1/5 px-4">
                        <GameHistory />
                    </div>
                </div>
                <FeedbackSection />
            </main>
            <Footer />
        </div>
    )
}
