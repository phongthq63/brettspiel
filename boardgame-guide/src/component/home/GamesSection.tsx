"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {Button, Checkbox, Chip, Input, Pagination, Select, SelectItem, Skeleton} from "@heroui/react";
import { Search } from "@mui/icons-material";
import { GameService, GameDTO } from "@/service/game.service";
import { AccessTime, PeopleAltOutlined, Star } from '@mui/icons-material';
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import { GamePlayersDTO, GamePlayTimeDTO, GenreDTO } from "@/service/game.service";
import { motion, AnimatePresence } from "framer-motion";
import {useMobile} from "@/hooks/useMobile";

export default function GamesSection() {
    const { t } = useTranslation();
    const { isMobile } = useMobile();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        playerCount: [] as string[],
        playTime: [] as string[],
        genres: [] as string[],
    });
    const [games, setGames] = useState<GameDTO[]>([]);
    const [totalGame, setTotalGame] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const searchBarRef = useRef<HTMLDivElement>(null); // Reference to the Results Count section

    const fetchGames = () => {
        GameService.getListGame({
            players: filters.playerCount,
            playTimes: filters.playTime,
            genres: filters.genres,
            softBy: sortBy,
            page: page - 1,
            size: 6,
        })
            .then((response) => {
                if (response.data) {
                    setGames(response.data.list || []);
                    setTotalGame(response.data.total || 0);
                    setTotalPages(response.data.total ? Math.ceil(response.data.total / 6) : 1);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch games:", error);
            })
            .finally(() => {
                setIsLoading(false); // Stop initial loading
            });
    };

    useEffect(() => {
        fetchGames();
    }, [filters, sortBy, page]);

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);

        // Scroll to the Results Count section
        if (isMobile && searchBarRef.current) {
            searchBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="games" className="p-5 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("section.games.title")}</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-1/4">
                    <GameFilter filters={filters} onFilterChange={handleFilterChange} />
                </div>

                {/* Right Content - Games Grid */}
                <div ref={searchBarRef} className="w-full lg:w-3/4">
                    {/* Search and Sort */}
                    <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Input
                            type="text"
                            size="lg"
                            variant="bordered"
                            placeholder={t("section.games.search.placeholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            endContent={<Search />}
                        />
                        <Select
                            className="w-full sm:max-w-36"
                            label={t("section.games.sort.label")}
                            size="sm"
                            variant="bordered"
                            selectedKeys={[sortBy]}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <SelectItem key="popular">{t("section.games.sort.options.popular")}</SelectItem>
                            <SelectItem key="rated">{t("section.games.sort.options.highestRated")}</SelectItem>
                            <SelectItem key="newest">{t("section.games.sort.options.newest")}</SelectItem>
                        </Select>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-gray-600">
                        {t("section.games.showing")} <span className="font-medium">{games.length}</span>{" "}
                        {t("section.games.of")} <span className="font-medium">{totalGame}</span>{" "}
                        {t("section.games.games")}
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <GameCardSkeleton key={`skeleton-${index}`} />
                            ))
                            : games.map((game) => (
                                <GameCard
                                    key={game.id}
                                    id={game.id ?? ""}
                                    title={game.title ?? ""}
                                    description={game.description ?? ""}
                                    imageUrl={game.image_url}
                                    imageBoxUrl={game.image_box_url ?? ""}
                                    isHot={game.hot}
                                    isPopular={game.popular}
                                    isTopRated={game.top_rated}
                                    genres={game.genres?.map((genre) => genre.name || "") ?? []}
                                    rating={0}
                                    minPlayers={game.min_players ?? 1}
                                    maxPlayers={game.max_players ?? 1}
                                    minPlayTime={game.min_play_time ?? 30}
                                    maxPlayTime={game.max_play_time ?? 30}
                                />
                            ))}
                    </div>

                    {/* Pagination */}
                    <div className="w-full flex justify-end">
                        {totalPages > 1 && (
                            <Pagination
                                classNames={{
                                    cursor: "bg-gradient-to-r from-[rgba(156,252,248,0.7)] to-[rgba(110,123,251,1)]",
                                }}
                                variant="light"
                                showControls
                                initialPage={page}
                                page={page}
                                total={totalPages}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
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
    const [playerOptions, setPlayerOptions] = useState<GamePlayersDTO[]>([]);
    const [playTimeOptions, setPlayTimeOptions] = useState<GamePlayTimeDTO[]>([]);
    const [genreOptions, setGenreOptions] = useState<GenreDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch filter data from API
        GameService.getFilterGame()
            .then((response) => {
                if (response.data) {
                    setPlayerOptions(response.data.players || []);
                    setPlayTimeOptions(response.data.play_times || []);
                    setGenreOptions(response.data.genres || []);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch filter data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

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

    return isLoading ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <Skeleton className="h-6 w-3/4 mb-4"/>
            <Skeleton className="h-4 w-full mb-3"/>
            <Skeleton className="h-4 w-full mb-3"/>
        </div>
    ) : (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("section.games.filter.title")}</h3>

            {/* Player Count Filter */}
            {playerOptions.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t("section.games.filter.players.title")}</h4>
                    <div className="space-y-2">
                        {playerOptions.map(option => (
                            <div key={option.id} className="flex items-center">
                                <Checkbox
                                    id={`player-${option.id}`}
                                    checked={localFilters.playerCount.includes(option.id || "")}
                                    onValueChange={(checked) =>
                                        handlePlayerCountChange(option.id || "", checked as boolean)
                                    }
                                />
                                <p className="ml-2 text-sm text-gray-600">
                                    {option.display}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Play Time Filter */}
            {playTimeOptions.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t('section.games.filter.playTime.title')}</h4>
                    <div className="space-y-2">
                        {playTimeOptions.map(option => (
                            <div key={option.id} className="flex items-center">
                                <Checkbox
                                    id={`playtime-${option.id}`}
                                    checked={localFilters.playTime.includes(option.id || "")}
                                    onValueChange={(checked) =>
                                        handlePlayTimeChange(option.id || "", checked as boolean)
                                    }
                                />
                                <p className="ml-2 text-sm text-gray-600">
                                    {option.display}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Genre Filter */}
            {genreOptions.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t('section.games.filter.genres.title')}</h4>
                    <div className="space-y-2">
                        {visibleGenres.map(option => (
                            <div key={option.id} className="flex items-center">
                                <Checkbox
                                    id={`genre-${option.id}`}
                                    checked={localFilters.genres.includes(option.id || "")}
                                    onValueChange={(checked) =>
                                        handleGenreChange(option.id || "", checked as boolean)
                                    }
                                />
                                <p className="ml-2 text-sm text-gray-600">
                                    {option.name}
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
            )}
            <Button
                className="w-full mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onPress={handleResetFilters}
            >
                {t('section.games.filter.reset')}
            </Button>
        </div>
    )
}

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    imageBoxUrl?: string;
    isHot?: boolean;
    isPopular?: boolean;
    isTopRated?: boolean;
    genres: string[];
    rating: number;
    minPlayers: number;
    maxPlayers: number;
    minPlayTime: number;
    maxPlayTime: number;
}

function GameCard({
    id,
    title,
    description,
    imageUrl,
    imageBoxUrl,
    isHot,
    isPopular,
    isTopRated,
    genres,
    rating,
    minPlayers,
    maxPlayers,
    minPlayTime,
    maxPlayTime,
}: GameCardProps) {
    const { t } = useTranslation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
            >
                <div className="relative h-full transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    {imageBoxUrl && (
                        <Image
                            src={imageBoxUrl}
                            alt="Board games box"
                            width={140}
                            height={100}
                            className="absolute hidden xl:block left-[-60] translate-y-1/4 z-10"
                        />
                    )}
                    <Card className="h-full hover:shadow-xl">
                        <CardBody className="p-0">
                            <div className="relative w-full h-48">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={title}
                                        fill
                                        sizes={"100%"}
                                    />
                                )}
                                <div className="absolute top-2 left-2 flex gap-2">
                                    {isPopular && (
                                        <Chip
                                            className="bg-blue-500 text-white text-xs font-bold rounded"
                                            size="sm"
                                        >
                                            {"popular"}
                                        </Chip>
                                    )}
                                    {isHot && (
                                        <Chip className="bg-red-500 text-white text-xs font-bold rounded"
                                              size="sm"
                                        >
                                            {"hot"}
                                        </Chip>
                                    )}
                                    {isTopRated && (
                                        <Chip
                                            className="bg-yellow-300 text-white text-xs font-bold rounded"
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
                                        <Star className="h-5 w-5 text-yellow-500 fill-current"/>
                                        <span className="ml-1 text-sm font-medium text-gray-700">
                                    {(rating / 10).toFixed(1)}
                                </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {genres.map((genre, index) => (
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
                                    <PeopleAltOutlined/>
                                    {minPlayers === maxPlayers
                                        ? `${minPlayers} ${t("gameCard.players")}`
                                        : `${minPlayers}-${maxPlayers} ${t("gameCard.players")}`}
                                </div>
                                <div className="flex items-center gap-1">
                                    <AccessTime/>
                                    {minPlayTime === maxPlayTime
                                        ? `${minPlayTime} ${t("gameCard.minutes")}`
                                        : `${minPlayTime}-${maxPlayTime} ${t("gameCard.minutes")}`}
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                                }}
                            >
                                {t("playNow")}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function GameCardSkeleton() {
    return (
        <Card className="h-full hover:shadow-xl">
            <CardBody className="p-0">
                <div className="relative w-full h-48">
                    <Skeleton className="w-full h-full"/>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <Skeleton className="h-6 w-3/4"/>
                        <Skeleton className="h-5 w-10"/>
                    </div>
                    <Skeleton className="h-4 w-full mb-3"/>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {Array.from({length: 3}).map((_, chipIndex) => (
                            <Skeleton
                                key={chipIndex}
                                className="h-6 w-16 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-3">
                <div className="w-full flex justify-between text-xs text-gray-500">
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
                <Skeleton className="h-10 w-full rounded-md"/>
            </CardFooter>
        </Card>
    )
}
