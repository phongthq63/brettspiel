"use client"

import { useState } from 'react';
import {useTranslation} from "react-i18next";
import {Chip, Skeleton} from '@heroui/react';
import {AccessTime, PeopleAltOutlined, Star} from "@mui/icons-material";
import {Card, CardBody, CardFooter} from "@heroui/card";
import Image from "next/image";

type Tag = 'popular' | 'hot' | 'topRated';

const FeaturedGamesSection = () => {
    const [activeTag, setActiveTag] = useState<Tag>('popular');

    const featuredGames = [
        {
            id: 2,
            title: "Ticket to Ride",
            description: "Cross North America by train, connecting iconic cities and completing tickets.",
            imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
            minPlayers: 2,
            maxPlayers: 5,
            minPlayTime: 30,
            maxPlayTime: 60,
            rating: 47,
            isHot: false,
            isPopular: true,
            isTopRated: false,
            genres: ["Family", "Route Building"]
        },
        {
            id: 1,
            title: "Catan",
            description: "Build settlements, trade resources, and become the Lord of Catan!",
            imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
            minPlayers: 3,
            maxPlayers: 4,
            minPlayTime: 60,
            maxPlayTime: 120,
            rating: 48,
            isHot: true,
            isPopular: false,
            isTopRated: false,
            genres: ["Strategy", "Trading"]
        },
        {
            id: 7,
            title: "Codenames",
            description: "Give one-word clues to help your team identify secret agents.",
            imageUrl: "/photo-1496449903678-68ddcb189a24.jpg",
            minPlayers: 4,
            maxPlayers: 8,
            minPlayTime: 15,
            maxPlayTime: 30,
            rating: 47,
            isHot: false,
            isPopular: false,
            isTopRated: false,
            genres: ["Party", "Word Game"]
        }
    ]

    const handleTagChange = (tag: Tag) => {
        setActiveTag(tag);
    }

    return (
        <section className="min-h-[500] bg-cyan-50 shadow-[inset_0_3px_4px_rgba(0,0,0,0.4)] rounded-3xl p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">{"Featured Games"}</h2>
                <div className="flex space-x-2">
                    {/* Filter Chips */}
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'popular'
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('popular')}
                    >
                        {"popular"}
                    </Chip>
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'hot'
                                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('hot')}
                    >
                        {"hot"}
                    </Chip>
                    <Chip
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                            activeTag === 'topRated'
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                        onClick={() => handleTagChange('topRated')}
                    >
                        {"High Rate"}
                    </Chip>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {false ? (
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
                    featuredGames
                        .filter(game => {
                            if (activeTag === 'popular') return game.isPopular;
                            if (activeTag === 'hot') return game.isHot;
                            if (activeTag === 'topRated') return game.isTopRated;
                            return true;
                        })
                        .slice(0, 3)
                        .map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))
                )}
            </div>
        </section>
    )
}

interface GameCardProps {
    game: any;
}

function GameCard({ game }: GameCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="hover:transform hover:-translate-y-2 hover:shadow-xl">
            <CardBody className="p-0">
                <div className="relative w-full h-48">
                    <Image src={game.imageUrl}
                           alt={game.title}
                           fill
                           sizes={"100%"}
                    />
                    {game.isHot && (
                        <Chip className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold">
                            {"hot"}
                        </Chip>
                    )}
                    {game.isPopular && (
                        <Chip className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold">
                            {"popular"}
                        </Chip>
                    )}
                    {game.isTopRated && (
                        <div
                            className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {"High Rate"}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{game.title}</h3>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-current"/>
                            <span className="ml-1 text-sm font-medium text-gray-700">{(game.rating / 10).toFixed(1)}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {game.genres.map((genre: any, index: number) => (
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
                        {game.minPlayers === game.maxPlayers
                            ? `${game.minPlayers} ${t('gameCard.players')}`
                            : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                        }
                    </div>
                    <div className="flex items-center gap-1">
                        <AccessTime />
                        {game.minPlayTime === game.maxPlayTime
                            ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                            : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default FeaturedGamesSection