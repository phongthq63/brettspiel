"use client"

import React, {useEffect} from "react";
import Header from "@/component/welcome/Header";
import HeroSection from "@/component/welcome/HeroSection";
import FeaturesSection from "@/component/welcome/FeaturesSection";
import ContactSection from "@/component/welcome/ContactSection";
import Footer from "@/component/layout/Footer";
import FeaturedGameSection from "@/component/welcome/FeaturedGameSection";
import StatisticsSection from "@/component/welcome/StatisticsSection";


export default function Page() {

    // Scroll to section if URL has hash
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        }, [])

    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <FeaturedGameSection />
                <StatisticsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}
