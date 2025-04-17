import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button, Checkbox, Chip, Input, Pagination, Skeleton} from "@heroui/react";
import {AccessTime, PeopleAltOutlined, Search, Star} from '@mui/icons-material';
import {Card, CardBody} from "@heroui/card";
import Image from "next/image";

export default function GamesSection() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // refetch();
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setPage(1);
        // refetch();
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        // refetch();
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    return (
        <section id="games" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('gamesList.title')}</h2>

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
                        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <form
                                className="relative w-full sm:w-auto flex-grow"
                                onSubmit={handleSearch}
                            >
                                <Input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full"
                                    placeholder={t('gamesList.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="ghost"
                                    className="absolute right-0 top-0 mt-2 mr-4 text-gray-500"
                                    isIconOnly
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </form>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-sm text-gray-700 whitespace-nowrap">{t('gamesList.sortBy')}:</span>
                                {/*<Select value={sortBy} onValueChange={handleSortChange}>*/}
                                {/*    <SelectTrigger className="w-[180px]">*/}
                                {/*        <SelectValue placeholder={t('gamesList.sortOptions.popular')} />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectItem value="popular">{t('gamesList.sortOptions.popular')}</SelectItem>*/}
                                {/*        <SelectItem value="rated">{t('gamesList.sortOptions.highestRated')}</SelectItem>*/}
                                {/*        <SelectItem value="newest">{t('gamesList.sortOptions.newest')}</SelectItem>*/}
                                {/*        <SelectItem value="playTime">{t('gamesList.sortOptions.playTime')}</SelectItem>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mb-4 text-sm text-gray-600">
                            {t('gamesList.showing')} <span className="font-medium">{games.length}</span> {t('gamesList.of')} <span className="font-medium">{10}</span> {t('gamesList.games')}
                        </div>

                        {/* Games Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                            {false ? (
                                // Skeleton loaders
                                Array.from({ length: 6 }).map((_, index) => (
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
                                games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {10 > 1 && (
                            <Pagination
                                initialPage={page}
                                total={10}
                                // currentPage={page}
                                // totalPages={10}
                                // onPageChange={handlePageChange}
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
                    <div className="flex justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                            <PeopleAltOutlined className="h-4 w-4 mr-1"/>
                            {game.minPlayers === game.maxPlayers
                                ? `${game.minPlayers} ${t('gameCard.players')}`
                                : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                            }
                        </div>
                        <div className="flex items-center">
                            <AccessTime className="h-4 w-4 mr-1"/>
                            {game.minPlayTime === game.maxPlayTime
                                ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                                : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                            }
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
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

function GameFilter({ filters, onFilterChange }: GameFilterProps) {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState({
        playerCount: [...filters.playerCount],
        playTime: [...filters.playTime],
        genres: [...filters.genres]
    });
    const [showAllGenres, setShowAllGenres] = useState(false);

    const playerOptions = [
        { id: '1', label: t('gameFilter.players.solo') },
        { id: '2', label: t('gameFilter.players.two') },
        { id: '3-4', label: t('gameFilter.players.threeFour') },
        { id: '5+', label: t('gameFilter.players.fivePlus') }
    ];

    const playTimeOptions = [
        { id: 'quick', label: t('gameFilter.playTime.quick') },
        { id: 'medium', label: t('gameFilter.playTime.medium') },
        { id: 'long', label: t('gameFilter.playTime.long') },
        { id: 'epic', label: t('gameFilter.playTime.epic') }
    ];

    const genreOptions = [
        { id: 'Strategy', label: t('gameFilter.genres.strategy') },
        { id: 'Family', label: t('gameFilter.genres.family') },
        { id: 'Party', label: t('gameFilter.genres.party') },
        { id: 'Cooperative', label: t('gameFilter.genres.cooperative') },
        { id: 'Card Game', label: t('gameFilter.genres.card') },
        { id: 'Abstract', label: t('gameFilter.genres.abstract') },
        { id: 'Area Control', label: t('gameFilter.genres.areaControl') },
        { id: 'Word Game', label: t('gameFilter.genres.word') },
        { id: 'Trading', label: t('gameFilter.genres.trading') },
        { id: 'Route Building', label: t('gameFilter.genres.routeBuilding') }
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

    const handleApplyFilters = () => {
        onFilterChange(localFilters);
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{"Filters"}</h3>

            {/* Player Count Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{"Number of Players"}</h4>
                <div className="space-y-2">
                    {playerOptions.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`player-${option.id}`}
                                checked={localFilters.playerCount.includes(option.id)}
                                onCheckedChange={(checked) =>
                                    handlePlayerCountChange(option.id, checked as boolean)
                                }
                            />
                            <p
                                htmlFor={`player-${option.id}`}
                                className="ml-2 text-sm text-gray-600"
                            >
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Play Time Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('gameFilter.playTimeTitle')}</h4>
                <div className="space-y-2">
                    {playTimeOptions.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`playtime-${option.id}`}
                                checked={localFilters.playTime.includes(option.id)}
                                onCheckedChange={(checked) =>
                                    handlePlayTimeChange(option.id, checked as boolean)
                                }
                            />
                            <p
                                htmlFor={`playtime-${option.id}`}
                                className="ml-2 text-sm text-gray-600"
                            >
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('gameFilter.genreTitle')}</h4>
                <div className="space-y-2">
                    {visibleGenres.map(option => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`genre-${option.id}`}
                                checked={localFilters.genres.includes(option.id)}
                                onCheckedChange={(checked) =>
                                    handleGenreChange(option.id, checked as boolean)
                                }
                            />
                            <p
                                // htmlFor={`genre-${option.id}`}
                                className="ml-2 text-sm text-gray-600"
                            >
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                    onClick={() => setShowAllGenres(!showAllGenres)}
                >
                    {showAllGenres ? t('gameFilter.showLess') : t('gameFilter.showMore')}
                </button>
            </div>

            <Button
                className="w-full bg-gradient-primary text-white"
                onClick={handleApplyFilters}
            >
                {t('gameFilter.applyButton')}
            </Button>
            <Button
                className="w-full mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleResetFilters}
            >
                {t('gameFilter.resetButton')}
            </Button>
        </div>
    )
}
