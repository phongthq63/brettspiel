"use client"

import React, {use} from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import GameDetail from "@/component/gamedetail/GameDetail";

export default function Page({ params } : { params: Promise<{ id: string }>}) {
    const {id} = use(params);

    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GameDetail id={id}/>
            </main>
            <Footer/>
        </div>
    )
}