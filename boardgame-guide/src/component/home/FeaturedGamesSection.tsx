"use client"

import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Chip, Skeleton } from '@heroui/react';
import { AccessTime, PeopleAltOutlined, Star } from "@mui/icons-material";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import {FeaturedGameDTO, WelcomeService} from "@/service/game.service";

type Tag = 'popular' | 'hot' | 'topRated';

const FeaturedGamesSection = () => {
    const { t } = useTranslation();
    const [activeTag, setActiveTag] = useState<Tag>('popular');
    const [featuredGames, setFeaturedGames] = useState<FeaturedGameDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleTagChange = (tag: Tag) => {
        setActiveTag(tag);
    };

    useEffect(() => {
        setLoading(true);
        WelcomeService.getListFeatureGame({ softBy: activeTag, size: 3 })
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
                <div className="flex space-x-2">
                    {/* Filter Chips */}
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'popular'
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('popular')}
                    >
                        {t("popular")}
                    </Chip>
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'hot'
                                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('hot')}
                    >
                        {t("hot")}
                    </Chip>
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'topRated'
                                ? 'bg-yellow-300 hover:bg-yellow-400 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-yellow-300 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('topRated')}
                    >
                        {t("topRated")}
                    </Chip>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    // Skeleton loaders
                    Array.from({ length: 3 }).map((_, index) => (
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
                    ))
                ) : (
                    featuredGames.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id ?? ""}
                            title={game.title ?? ""}
                            description={game.description ?? ""}
                            image_url={game.image_url ?? ""}
                            hot={game.hot}
                            popular={game.popular}
                            top_rated={game.top_rated}
                            genres={game.genres?.map(genre => genre.name ?? "")}
                            min_players={game.min_players ?? 1}
                            max_players={game.max_players ?? 1}
                            min_play_time={game.min_play_time ?? 30}
                            max_play_time={game.max_play_time ?? 30}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    image_url: string;
    hot?: boolean;
    popular?: boolean;
    top_rated?: boolean;
    genres?: string[];
    min_players: number;
    max_players: number;
    min_play_time: number;
    max_play_time: number;
}

function GameCard({
    title,
    description,
    image_url,
    hot,
    popular,
    top_rated,
    genres,
    min_players,
    max_players,
    min_play_time,
    max_play_time,
}: GameCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="hover:transform hover:-translate-y-2 hover:shadow-xl">
            <CardBody className="p-0">
                <div className="relative w-full h-48">
                    <Image src={image_url || "/placeholder.jpg"}
                           alt={title || "Game Image"}
                           fill
                           sizes={"100%"}
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                        {popular && (
                            <Chip
                                className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded"
                                size="sm"
                            >
                                {"popular"}
                            </Chip>
                        )}
                        {hot && (
                            <Chip
                                className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                                size="sm"
                            >
                                {t('hot')}
                            </Chip>
                        )}
                        {top_rated && (
                            <Chip
                                className="bg-yellow-300 text-white text-xs font-bold px-2 py-1 rounded"
                                size="sm"
                            >
                                {"High Rate"}
                            </Chip>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700">
                                {(3 / 10).toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {genres?.map((genre, index) => (
                            <Chip key={index} className="px-2 py-1 text-xs font-medium">
                                {genre}
                            </Chip>
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <div className="w-full flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <PeopleAltOutlined />
                        {min_players === max_players
                            ? `${min_players} ${t('gameCard.players')}`
                            : `${min_players}-${max_players} ${t('gameCard.players')}`
                        }
                    </div>
                    <div className="flex items-center gap-1">
                        <AccessTime />
                        {min_play_time === max_play_time
                            ? `${min_play_time} ${t('gameCard.minutes')}`
                            : `${min_play_time}-${max_play_time} ${t('gameCard.minutes')}`
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default FeaturedGamesSection;

