"use client"

import React from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import BannerSection from "@/component/home/BannerSection";
import GameHistory from "@/component/home/GameHistory";
import FeaturedGamesSection from "@/component/home/FeaturedGamesSection";
import FeedbackSection from "@/component/home/FeedbackSection";
import GamesSection from "@/component/home/GamesSection";
import GameStats from "@/hoc/GameStats";
import GameFavorite from "@/component/home/GameFavorite";
import {BuyMeCoffee} from "@/component/ui/BuyMeACoffee";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GameStats>
                    <BannerSection/>
                    <div className="flex justify-between flex-wrap mb-32">
                        <div className="w-full lg:w-4/5 px-4 flex flex-col gap-8">
                            <FeaturedGamesSection/>
                            <GamesSection/>
                        </div>
                        <div className="w-full lg:w-1/5 px-4 flex flex-col gap-8">
                            <GameHistory/>
                            <GameFavorite />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <BuyMeCoffee />
                    </div>
                    <FeedbackSection/>
                </GameStats>
            </main>
            <Footer/>
        </div>
    )
}
