"use client"

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button, Checkbox, Chip, Input, Pagination, Select, SelectItem, Skeleton} from "@heroui/react";
import {AccessTime, PeopleAltOutlined, Search, Star} from '@mui/icons-material';
import {Card, CardBody, CardFooter} from "@heroui/card";
import Image from "next/image";

export default function GamesSection() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        playerCount: [] as string[],
        playTime: [] as string[],
        genres: [] as string[]
    });

    const games = [
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
        },
        {
            id: 3,
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

    // const {
    //     games,
    //     total,
    //     totalPages,
    //     isLoading,
    //     error,
    //     refetch
    // } = useGames({
    //     page,
    //     limit: 6,
    //     search: searchQuery,
    //     sortBy,
    //     ...filters
    // });

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // refetch();
    // };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setPage(1);
        // refetch();
    };

    // const handleSortChange = (value: string) => {
    //     setSortBy(value);
    //     // refetch();
    // };
    //
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    return (
        <section id="games"
                 className="bg-cyan-50 shadow-[inset_0_3px_4px_rgba(0,0,0,0.3)] rounded-3xl p-5 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('section.games.title')}</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-1/4">
                    <GameFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                {/* Right Content - Games Grid */}
                <div className="w-full lg:w-3/4">
                    {/* Search and Sort */}
                    <div
                        className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Input
                            type="text"
                            size="lg"
                            variant="bordered"
                            placeholder={t('section.games.search.placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            endContent={<Search/>}
                        />
                        <Select
                            className="w-full sm:max-w-36" label={t("section.games.sort.label")}
                            size="sm"
                            variant="bordered"
                            selectedKeys={[sortBy]}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <SelectItem key="popular">{t('section.games.sort.options.popular')}</SelectItem>
                            <SelectItem key="rated">{t('section.games.sort.options.highestRated')}</SelectItem>
                            <SelectItem key="newest">{t('section.games.sort.options.newest')}</SelectItem>
                        </Select>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-gray-600">
                        {t('section.games.showing')} <span
                        className="font-medium">{games.length}</span> {t('section.games.of')} <span
                        className="font-medium">{10}</span> {t('section.games.games')}
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        {false ? (
                            // Skeleton loaders
                            Array.from({length: 6}).map((_, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <Skeleton className="w-full h-48"/>
                                    <div className="p-4">
                                        <Skeleton className="h-6 w-3/4 mb-2"/>
                                        <Skeleton className="h-4 w-full mb-3"/>
                                        <div className="flex gap-2 mb-3">
                                            <Skeleton className="h-6 w-16"/>
                                            <Skeleton className="h-6 w-16"/>
                                        </div>
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-24"/>
                                            <Skeleton className="h-4 w-24"/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            games.map((game) => (
                                <GameCard key={game.id} game={game}/>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="w-full flex justify-end">
                        {10 > 1 && (
                            <Pagination
                                classNames={{
                                    cursor: "bg-gradient-to-r from-[rgba(156,252,248,0.7)] to-[rgba(110,123,251,1)]",
                                }}
                                variant="light"
                                showControls
                                initialPage={page}
                                page={page}
                                total={10}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

interface GameCardProps {
    game: any;
}

function GameCard({game}: GameCardProps) {
    const {t} = useTranslation();

    return (
        <div className="relative hover:transform hover:-translate-y-2">
            <Image src="/en_280.png"
                   alt="Board games box"
                   width={140}
                   height={100}
                   className="absolute hidden xl:block left-[-60] translate-y-1/4 z-10"/>
            <Card className="h-full hover:shadow-xl">
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
                                <span
                                    className="ml-1 text-sm font-medium text-gray-700">{(game.rating / 10).toFixed(1)}</span>
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
                <CardFooter className="flex flex-col gap-3">
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
                    <Button
                        className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white"
                        style={{
                            backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"
                        }}
                    >
                        {t("playNow")}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

interface GameFilterProps {
    filters: {
        playerCount: string[];
        playTime: string[];
        genres: string[];
    };
    onFilterChange: (filters: {
        playerCount: string[];
        playTime: string[];
        genres: string[];
    }) => void;
}

function GameFilter({filters, onFilterChange}: GameFilterProps) {
    const {t} = useTranslation();
    const [localFilters, setLocalFilters] = useState({
        playerCount: [...filters.playerCount],
        playTime: [...filters.playTime],
        genres: [...filters.genres]
    });
    const [showAllGenres, setShowAllGenres] = useState(false);

    const playerOptions = [
        {id: '1', label: t('section.games.filter.players.solo')},
        {id: '2', label: t('section.games.filter.players.two')},
        {id: '3-4', label: t('section.games.filter.players.threeFour')},
        {id: '5+', label: t('section.games.filter.players.fivePlus')}
    ];

    const playTimeOptions = [
        { id: 'quick', label: t('section.games.filter.playTime.quick') },
        { id: 'medium', label: t('section.games.filter.playTime.medium') },
        { id: 'long', label: t('section.games.filter.playTime.long') },
        { id: 'epic', label: t('section.games.filter.playTime.epic') }
    ];

    const genreOptions = [
        { id: 'Strategy', label: t('section.games.filter.genres.strategy') },
        { id: 'Family', label: t('section.games.filter.genres.family') },
        { id: 'Party', label: t('section.games.filter.genres.party') },
        { id: 'Cooperative', label: t('section.games.filter.genres.cooperative') },
        { id: 'Card Game', label: t('section.games.filter.genres.card') },
        { id: 'Abstract', label: t('section.games.filter.genres.abstract') },
        { id: 'Area Control', label: t('section.games.filter.genres.areaControl') },
        { id: 'Word Game', label: t('section.games.filter.genres.word') },
        { id: 'Trading', label: t('section.games.filter.genres.trading') },
        { id: 'Route Building', label: t('section.games.filter.genres.routeBuilding') }
    ];

    const visibleGenres = showAllGenres ? genreOptions : genreOptions.slice(0, 5);

    const handlePlayerCountChange = (id: string, checked: boolean) => {
        setLocalFilters(prev => {
            const newPlayerCount = checked
                ? [...prev.playerCount, id]
                : prev.playerCount.filter(item => item !== id);

            return {
                ...prev,
                playerCount: newPlayerCount
            };
        });
    };

    const handlePlayTimeChange = (id: string, checked: boolean) => {
        setLocalFilters(prev => {
            const newPlayTime = checked
                ? [...prev.playTime, id]
                : prev.playTime.filter(item => item !== id);

            return {
                ...prev,
                playTime: newPlayTime
            };
        });
    };

    const handleGenreChange = (id: string, checked: boolean) => {
        setLocalFilters(prev => {
            const newGenres = checked
                ? [...prev.genres, id]
                : prev.genres.filter(item => item !== id);

            return {
                ...prev,
                genres: newGenres
            };
        });
    };

    const handleResetFilters = () => {
        setLocalFilters({
            playerCount: [],
            playTime: [],
            genres: []
        });
        onFilterChange({
            playerCount: [],
            playTime: [],
            genres: []
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("section.games.filter.title")}</h3>

            {/* Player Count Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t("section.games.filter.players.title")}</h4>
                <div className="space-y-2">
                    {playerOptions.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`player-${option.id}`}
                                checked={localFilters.playerCount.includes(option.id)}
                                onValueChange={(checked) =>
                                    handlePlayerCountChange(option.id, checked)
                                }
                            />
                            <p className="ml-2 text-sm text-gray-600">
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Play Time Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('section.games.filter.playTime.title')}</h4>
                <div className="space-y-2">
                    {playTimeOptions.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`playtime-${option.id}`}
                                checked={localFilters.playTime.includes(option.id)}
                                onValueChange={(checked) =>
                                    handlePlayTimeChange(option.id, checked as boolean)
                                }
                            />
                            <p className="ml-2 text-sm text-gray-600">
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('section.games.filter.genres.title')}</h4>
                <div className="space-y-2">
                    {visibleGenres.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`genre-${option.id}`}
                                checked={localFilters.genres.includes(option.id)}
                                onValueChange={(checked) =>
                                    handleGenreChange(option.id, checked as boolean)
                                }
                            />
                            <p className="ml-2 text-sm text-gray-600">
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
                <h3 className="mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none cursor-pointer"
                    onClick={() => setShowAllGenres(!showAllGenres)}
                >
                    {showAllGenres ? t('section.games.filter.showLess') : t('section.games.filter.showMore')}
                </h3>
            </div>
            <Button
                className="w-full mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onPress={handleResetFilters}
            >
                {t('section.games.filter.reset')}
            </Button>
        </div>
    )
}
