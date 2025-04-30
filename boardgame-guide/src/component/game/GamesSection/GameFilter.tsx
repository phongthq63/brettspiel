import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {GamePlayersDTO, GamePlayTimeDTO, GenreDTO} from "@/service/game.service";
import {Button, Checkbox, CheckboxGroup} from "@heroui/react";

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
    playerOptions: GamePlayersDTO[];
    playTimeOptions: GamePlayTimeDTO[];
    genreOptions: GenreDTO[];
}

export function GameFilter({filters, onFilterChange, playerOptions, playTimeOptions, genreOptions,}: GameFilterProps) {
    const { t } = useTranslation();
    const [localFilters, setLocalFilters] = useState({
        playerCount: [...filters.playerCount],
        playTime: [...filters.playTime],
        genres: [...filters.genres],
    });
    const [showAllGenres, setShowAllGenres] = useState(false);

    const visibleGenres = showAllGenres ? genreOptions : genreOptions.slice(0, 10);

    const handlePlayerCountChange = (players: string[]) => {
        setLocalFilters((prev) => ({
            ...prev,
            playerCount: players,
        }));
        onFilterChange({
            ...localFilters,
            playerCount: players,
        });
    };

    const handlePlayTimeChange = (playTimes: string[]) => {
        setLocalFilters((prev) => ({
            ...prev,
            playTime: playTimes,
        }));
        onFilterChange({
            ...localFilters,
            playTime: playTimes,
        });
    };

    const handleGenreChange = (genres: string[]) => {
        setLocalFilters((prev) => ({
            ...prev,
            genres: genres,
        }));
        onFilterChange({
            ...localFilters,
            genres: genres,
        });
    };

    const handleResetFilters = () => {
        setLocalFilters({
            playerCount: [],
            playTime: [],
            genres: [],
        });
        onFilterChange({
            playerCount: [],
            playTime: [],
            genres: [],
        });
    };

    return playerOptions.length <= 0 && playTimeOptions.length <= 0 && genreOptions.length <= 0 ? (
        <></>
    ) : (
        <div className="bg-[rgba(156,252,248,0.3)] p-4 rounded-l-xl rounded-br-xl">
            <div>
                {/* Player Count Filter */}
                {playerOptions.length > 0 && (
                    <div className="mb-6">
                        <CheckboxGroup
                            classNames={{
                                label: "text-sm font-semibold text-gray-700",
                            }}
                            label={t("section.games.filter.players.title")}
                            value={localFilters.playerCount}
                            onValueChange={(values) => handlePlayerCountChange(values)}
                            orientation="horizontal"
                        >
                            {playerOptions.map((option) => (
                                <Checkbox
                                    key={`player-${option.id}`}
                                    classNames={{
                                        label: "text-sm text-gray-600",
                                    }}
                                    value={option.id}
                                >
                                    {option.display}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                )}

                {/* Play Time Filter */}
                {playTimeOptions.length > 0 && (
                    <div className="mb-6">
                        <CheckboxGroup
                            classNames={{
                                label: "text-sm font-semibold text-gray-700",
                            }}
                            label={t("section.games.filter.playTime.title")}
                            value={localFilters.playTime}
                            onValueChange={(values) => handlePlayTimeChange(values)}
                            orientation="horizontal"
                        >
                            {playTimeOptions.map((option) => (
                                <Checkbox
                                    key={`playtime-${option.id}`}
                                    classNames={{
                                        label: "text-sm text-gray-600",
                                    }}
                                    value={option.id}
                                >
                                    {option.display}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                )}

                {/* Genre Filter */}
                {genreOptions.length > 0 && (
                    <div className="mb-6">
                        <CheckboxGroup
                            classNames={{
                                label: "text-sm font-semibold text-gray-700",
                            }}
                            label={t("section.games.filter.genres.title")}
                            value={localFilters.genres}
                            onValueChange={(values) => handleGenreChange(values)}
                            orientation="horizontal"
                        >
                            {visibleGenres.map((option) => (
                                <Checkbox
                                    key={`genre-${option.id}`}
                                    classNames={{
                                        label: "text-sm text-gray-600",
                                    }}
                                    value={option.id}
                                >
                                    {option.name}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                        <h3
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none cursor-pointer"
                            onClick={() => setShowAllGenres(!showAllGenres)}
                        >
                            {showAllGenres ? t("section.games.filter.showLess") : t("section.games.filter.showMore")}
                        </h3>
                    </div>
                )}
                <Button
                    className="w-full mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onPress={handleResetFilters}
                >
                    {t("section.games.filter.reset")}
                </Button>
            </div>
        </div>
    );
}
