"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton, Tab, Tabs } from "@heroui/react";
import { FeaturedGameDTO, WelcomeService } from "@/service/game.service";
import Carousel from "@/hoc/Carousel";
import { GameCard } from "@/component/home/FeaturedGamesSection/GameCard";


type Tag = "popular" | "hot" | "top_rated";

export default function FeaturedGamesSection() {
    const { t } = useTranslation();
    const [activeTag, setActiveTag] = useState<Tag>("popular");
    const [featuredGames, setFeaturedGames] = useState<FeaturedGameDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleTagChange = (tag: Tag) => {
        setActiveTag(tag);
    };

    useEffect(() => {
        setLoading(true);
        WelcomeService.getListFeatureGame({ softBy: activeTag, size: 6 })
            .then((response) => {
                setFeaturedGames(response.data || []);
            })
            .catch((error) => {
                console.error("Failed to fetch featured games:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [activeTag]);

    return (
        <section className="min-h-[500] rounded-3xl p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">{t("section.featuredGame.title")}</h2>
                <Tabs
                    classNames={{
                        cursor: "bg-[#90e0ef]",
                    }}
                    variant="light"
                    selectedKey={activeTag}
                    onSelectionChange={(e) => handleTagChange(e.toString() as Tag)}
                >
                    <Tab key="popular" title={`⭐ ${t("popular")}`}></Tab>
                    <Tab key="hot" title={`🔥 ${t("hot")}`}></Tab>
                    <Tab key="topRated" title={`🏆 ${t("topRated")}`}></Tab>
                </Tabs>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                    {/* Skeleton loaders */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <Skeleton className="w-full h-48" />
                            <div className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-3" />
                                <div className="flex gap-2 mb-3">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Carousel
                    classNames={{
                        item: "py-10"
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 16 },
                        768: { slidesPerView: 2, spaceBetween: 16 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                >
                    {featuredGames.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id ?? ""}
                            title={game.title ?? ""}
                            description={game.description ?? ""}
                            image_url={game.image_url ?? ""}
                            genres={game.genres?.map((genre) => genre.name ?? "")}
                            min_players={game.min_players ?? 1}
                            max_players={game.max_players ?? 1}
                            min_play_time={game.min_play_time ?? 30}
                            max_play_time={game.max_play_time ?? 30}
                        />
                    ))}
                </Carousel>
            )}
        </section>
    );
};
