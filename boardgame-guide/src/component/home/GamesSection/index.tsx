"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { Search } from "@mui/icons-material";
import { GameService, GameDTO } from "@/service/game.service";
import { useMobile } from "@/hooks/useMobile";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { GameFilter } from "./GameFilter";

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
    const size = 6;
    const searchBarRef = useRef<HTMLDivElement>(null);

    const fetchGames = useCallback(
        (page: number) => {
            GameService.getListGame({
                keyword: searchQuery,
                players: filters.playerCount,
                playTimes: filters.playTime,
                genres: filters.genres,
                softBy: sortBy,
                page: page - 1,
                size: size,
            })
                .then((response) => {
                    if (response.data) {
                        setGames(response.data.list || []);
                        setTotalGame(response.data.total || 0);
                        setTotalPages(response.data.total ? Math.ceil(response.data.total / size) : 1);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch games:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [searchQuery, filters, sortBy]
    );

    useEffect(() => {
        fetchGames(page);
    }, [sortBy, page]);

    const handlerSearch = () => {
        fetchGames(1);
        setPage(1);
    };

    const handlerSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
        setPage(1);
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);

        if (isMobile && searchBarRef.current) {
            searchBarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="games" className="p-5 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("section.games.title")}</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-1/5">
                    <GameFilter filters={filters} onFilterChange={handleFilterChange} />
                </div>

                {/* Right Content - Games Grid */}
                <div ref={searchBarRef} className="w-full lg:w-4/5">
                    {/* Search and Sort */}
                    <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Input
                            type="text"
                            size="lg"
                            variant="bordered"
                            placeholder={t("section.games.search.placeholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handlerSearch(); // Trigger search on Enter key press
                                }
                            }}
                            endContent={
                                <Search
                                    className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
                                    onClick={handlerSearch}
                                />
                            }
                        />
                        <Select
                            className="w-full sm:max-w-36"
                            label={t("section.games.sort.label")}
                            size="sm"
                            variant="bordered"
                            selectedKeys={[sortBy]}
                            onChange={(e) => handlerSortChange(e.target.value)}
                        >
                            <SelectItem key="popular">{t("section.games.sort.options.popular")}</SelectItem>
                            <SelectItem key="top_rated">{t("section.games.sort.options.highestRated")}</SelectItem>
                            <SelectItem key="hot">{t("section.games.sort.options.hot")}</SelectItem>
                        </Select>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-gray-600">
                        {t("section.games.showing")} <span className="font-medium">{games.length}</span>{" "}
                        {t("section.games.of")} <span className="font-medium">{totalGame}</span>{" "}
                        {t("section.games.games")}
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-12 mb-8">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, index) => (
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
                                      playUrl={game.play_url ?? "/"}
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
