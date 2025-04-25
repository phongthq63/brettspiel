"use client"

import {useTranslation} from "react-i18next";
import {PeopleAltOutlined, VideogameAssetOutlined} from "@mui/icons-material";

interface LiveStats {
    playerCount: number
    gameCount: number
}

export default function GameStats({children}: any) {
    const { t } = useTranslation();

    // Use React Query to fetch live stats data
    const data: LiveStats = {
        playerCount: 0,
        gameCount: 0
    }

    // Default values while loading
    const playerCount = data?.playerCount || 1000;
    const gameCount = data?.gameCount || 300;

    return (
        <div className="relative">
            <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-3 transition-all hover:shadow-xl">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2.5 rounded-lg shadow">
                            <PeopleAltOutlined/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('gameStats.currentPlayers')}</p>
                            <p className="text-sm font-bold text-gray-800 dark:text-white">
                                {playerCount.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-3 transition-all hover:shadow-xl">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2.5 rounded-lg shadow">
                            <VideogameAssetOutlined/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('gameStats.currentGames')}</p>
                            <p className="text-sm font-bold text-gray-800 dark:text-white">
                                {gameCount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}