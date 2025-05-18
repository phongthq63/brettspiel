"use client"

import {useTranslation} from "react-i18next";
import {Users, Gamepad} from "lucide-react";

interface LiveStats {
    playerCount: number
    gameCount: number
}

export default function GameStatsSticky() {
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
        <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <div
                    className="bg-white rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 p-2 border border-gray-200 flex items-center gap-2 transition-all hover:shadow-xl">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2.5 rounded-lg shadow">
                        <Users size={16}/>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{t('gameStats.currentPlayers')}</p>
                        <p className="text-sm font-bold text-gray-800">
                            {playerCount.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 p-2 border border-gray-200 flex items-center gap-2 transition-all hover:shadow-xl">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2.5 rounded-lg shadow">
                        <Gamepad size={16}/>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{t('gameStats.currentGames')}</p>
                        <p className="text-sm font-bold text-gray-800">
                            {gameCount.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}