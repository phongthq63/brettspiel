"use client"

import React from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import BannerSection from "@/component/home/BannerSection";
import FeaturedGamesSection from "@/component/home/FeaturedGamesSection";
import FeedbackSection from "@/component/home/FeedbackSection";
import GamesSection from "@/component/home/GamesSection";
import GameStats from "@/hoc/GameStats";
import { BuyMeACoffee } from "@/component/ui/BuyMeACoffee";
import GameRoomsSection from "@/component/home/GameRoomsSection";
import InstructionsSection from "@/component/home/InstructionsSection";
import AboutSection from "@/component/home/AboutSection";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header />
            <GameStats>
                <main className="flex flex-col gap-10">
                    <BannerSection />
                    <FeaturedGamesSection />
                    <GamesSection/>
                    <GameRoomsSection />
                    <InstructionsSection />
                    <AboutSection />
                    <div className="w-full flex justify-center">
                        <BuyMeACoffee />
                    </div>
                    <FeedbackSection />
                </main>
            </GameStats>
            <Footer/>
        </div>
    );
}
