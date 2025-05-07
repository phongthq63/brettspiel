"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {Input, Pagination, Select, SelectItem} from "@heroui/react";
import { GameService, GameDTO, GamePlayersDTO, GamePlayTimeDTO, GenreDTO } from "@/service/game.service";
import { useMobile } from "@/hooks/useMobile";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { GameFilter } from "./GameFilter";
import {AnimatePresence, motion } from "framer-motion";
import {Funnel, Search} from "lucide-react";

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
    const size = 20;
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [filterData, setFilterData] = useState({
        playerOptions: [] as GamePlayersDTO[],
        playTimeOptions: [] as GamePlayTimeDTO[],
        genreOptions: [] as GenreDTO[],
    });

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

    useEffect(() => {
        // Fetch filter data from API
        GameService.getFilterGame()
            .then((response) => {
                if (response.data) {
                    setFilterData({
                        playerOptions: response.data.players || [],
                        playTimeOptions: response.data.play_times || [],
                        genreOptions: response.data.genres || [],
                    });
                }
            })
            .catch((error) => {
                console.error("Failed to fetch filter data:", error);
            });
    }, []);

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
        <section id="games">
            <div className="flex justify-between items-end">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("section.games.title")}</h2>
                <motion.div
                    initial={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                    }}
                    animate={{
                        borderBottomLeftRadius: isFilterExpanded ? "0" : "20px",
                        borderBottomRightRadius: isFilterExpanded ? "0" : "20px",
                    }}
                    transition={{ duration: isFilterExpanded ? 0.5 : 3 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[rgba(156,252,248,0.3)]"
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                >
                    <Funnel />
                    <h3 className="text-xl font-semibold">
                        {t("section.games.filter.title")}
                    </h3>
                </motion.div>
            </div>

            <AnimatePresence>
                {isFilterExpanded && (
                    <motion.div
                        initial={{ maxHeight: 0 }}
                        animate={{ maxHeight: 1000 }}
                        exit={{ maxHeight: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <GameFilter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            playerOptions={filterData.playerOptions}
                            playTimeOptions={filterData.playTimeOptions}
                            genreOptions={filterData.genreOptions}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={searchBarRef} className="w-full mt-6">
                {/* Search and Sort */}
                <div
                    className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Input
                        type="text"
                        size="lg"
                        variant="bordered"
                        placeholder={t("section.games.search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-12 mb-8">
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
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
        </section>
    );
}

