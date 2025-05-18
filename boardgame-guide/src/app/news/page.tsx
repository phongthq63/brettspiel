"use client"

import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import AuthModal from "@/component/layout/AuthModal";

export default function Page() {
    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <AuthModal isOpen={true} />
            </main>
            <Footer/>
        </div>
    )
}