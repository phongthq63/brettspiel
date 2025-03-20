import Footer from "@/component/Footer";
import Header from "@/component/Header";
import HeroSection from "@/component/HeroSection";
import StatsSection from "@/component/StatsSection";
import FeatureSection from "@/component/FeatureSection";


export default function Page() {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <StatsSection />
            <FeatureSection />
            {/*<GameGallery />*/}
            {/*<NewsletterSection />*/}
            {/*<ContactSection />*/}
            <Footer />
        </div>
    )
}