import Carousel from "@/hoc/Carousel";
import {Button} from "@heroui/react";
import React from "react";
import { GameCard } from "./GameCard";

export function GameSearch() {
    const game = {
        id: 2,
        title: "Ticket to Ride",
        description: "Cross North America by train, connecting iconic cities and completing tickets.",
        imageUrl: "/news-banner-899_wide.jpg",
        minPlayers: 2,
        maxPlayers: 5,
        minPlayTime: 30,
        maxPlayTime: 60,
        rating: 47,
        isHot: false,
        isPopular: true,
        isTopRated: false,
        genres: ["Family", "Route Building"]
    }

    return (
        <div>
            <div className="flex justify-between items-end my-4">
                <div>
                    <h3 className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-xl md:text-2xl lg:text-3xl font-bold text-transparent">
                        Game
                    </h3>
                </div>
                <div>
                    <h6 className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-text text-sm md:text-base lg:text-lg font-bold text-transparent">
                        1888 result
                    </h6>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <Carousel
                    classNames={{
                        container: "w-full xl:w-4/5",
                        item: "!w-fit"
                    }}
                >
                    <div
                        className="w-max grid grid-cols-4 grid-rows-2 grid-flow-col xl:grid-flow-row gap-1 xl:gap-8 pr-1 xl:pr-0 xl:pl-8">
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                    </div>
                    <div
                        className="w-max grid grid-cols-4 grid-rows-2 grid-flow-col xl:grid-flow-row gap-1 xl:gap-8 pr-1 xl:pr-0 xl:pl-8">
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                        <GameCard game={game}/>
                    </div>
                </Carousel>
                <Button
                    className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white shadow-md">
                    Load more
                </Button>
            </div>
        </div>
    )
}