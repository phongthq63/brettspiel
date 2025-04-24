import { useState, useEffect } from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Chip} from "@heroui/react";
import {useTranslation} from "react-i18next";

export default function GameHistory() {
    const { t } = useTranslation();
    const [playedGames, setPlayedGames] = useState<any[]>([])

    useEffect(() => {
        // For now, we'll use mock data. In a real app, this would come from localStorage or API
        const mockPlayHistory = [
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
                id: 4,
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
                genres: ["Party", "Word Game", "Word Games", "Word Gamess"]
            }
        ]

        setPlayedGames(mockPlayHistory);
    }, [])

    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-bold">{t("gameHistory.title")}</h3>
            </CardHeader>
            <CardBody>
                {playedGames.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">{t("gameHistory.noGames")}</p>
                ) : (
                    <ul className="space-y-3">
                        {playedGames.map((game) => (
                            <li key={game.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                <div className="w-16 h-16 rounded-md bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url(${game.imageUrl})` }}
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{game.title}</h4>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {game.genres && game.genres.map((genre: any) => (
                                            <Chip key={genre} variant="bordered" size="sm" className="text-xs">
                                                {genre}
                                            </Chip>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {t("gameHistory.lastPlayed")}: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardBody>
            <CardFooter>
                <div className="w-full mt-4 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        {t("gameHistory.viewAll")}
                    </a>
                </div>
            </CardFooter>
        </Card>
    )
}