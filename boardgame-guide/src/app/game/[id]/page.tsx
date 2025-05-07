import React from "react";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import {GameService} from "@/service/game.service";
import {notFound} from "next/navigation";
import GameBanner from "@/component/gamedetail/GameBanner";
import GameCredits from "@/component/gamedetail/GameCredits";
import GameIntro from "@/component/gamedetail/GameIntro";
import GamePlay from "@/component/gamedetail/GamePlay";
import Image from "next/image";
import GameRule from "@/component/gamedetail/GameRule";
import GameLinks from "@/component/gamedetail/GameLinks";
import GameReview from "@/component/gamedetail/GameReview";
import {Platform} from "@/component/ui/GameVideo";
import {Button} from "@heroui/react";


export default async function Page({ params } : { params: Promise<{ id: string }>}) {
    const { id } = await params;
    let gameData;

    try {
        const response = await GameService.getGameInfo({gameId: id});
        gameData = response.data;
    } catch (error) {
        console.error("Error fetching game data:", error);
    }

    const images = [
        "/photo-1496449903678-68ddcb189a24.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg"
    ];


    if(!gameData) {
        notFound();
    }

    return (
        <div id="root" className="min-h-screen flex flex-col justify-between">
            <Header/>
            <main>
                <GameBanner
                    imageBannerUrl={gameData.image_banner_url || ""}
                    imageNameUrl={gameData.image_name_url || ""}
                    minPlayers={gameData.min_players || 1}
                    maxPlayers={gameData.max_players || 1}
                    minPlayTime={gameData.min_play_time || 30}
                    maxPlayTime={gameData.max_play_time || 30}
                    genres={gameData.genres?.map((genre) => genre.name || "") || []}
                />
                <div className="grid grid-cols-7 grid-rows-5 mt-10 mb-20">
                    <div className="col-span-7 lg:col-span-3 lg:row-span-5 lg:col-start-3 lg:row-start-1">
                        <div className="flex flex-col gap-6 px-8">
                            <GameIntro
                                name={gameData.name || ""}
                                description={gameData.description || ""}
                                isFavorite={false}
                            />
                            <GameRule
                                rules={gameData.rules?.map((rule) => ({
                                    name: rule.name ?? "",
                                    language: rule.language ?? "",
                                    image_icon_url: rule.image_icon_url ?? "",
                                    document_url: rule.document_url ?? "",
                                })) ?? []}
                            />
                        </div>
                    </div>
                    <div className="col-span-7 lg:col-span-2 lg:row-span-5 lg:col-start-1">
                        <div className="flex flex-col gap-6 mt-8 px-8">
                            <div className="hidden lg:block relative">
                                <div className="absolute top-[-260] left-[-50]">
                                    <Image
                                        src={gameData.image_box_url || ""}
                                        alt="Board games box"
                                        width={280}
                                        height={300}
                                        className="drop-shadow-md"
                                    />
                                </div>
                            </div>
                            <GameCredits
                                designers={gameData.designers || []}
                                artists={gameData.artists || []}
                                publishers={gameData.publishers || []}
                                year={gameData.year}
                            />
                            <GameLinks />
                        </div>
                    </div>
                    <div className="col-span-7 lg:col-span-2 lg:row-span-5 lg:col-start-6 lg:row-start-1">
                        <div className="mb-4">
                            <GamePlay
                                play_url={gameData.play_url}
                                tutorial_url={gameData.tutorial_url}
                            />
                        </div>
                        <GameReview
                            images={images}
                            videos={gameData.videos?.map(video => ({
                                id: video.id ?? "",
                                title: video.title,
                                videoId: "VHAK-gU9gi0",
                                platform: (video.platform || "youtube") as Platform,
                                thumbnail: "/photo-1496449903678-68ddcb189a24.jpg",
                                videoUrl: video.url
                            }))}/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}