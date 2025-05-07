"use client";

import React, {useState, useEffect, useRef} from "react";
import {Button, Progress, Tooltip} from "@heroui/react";
import {Castle, Dice6, Puzzle, RefreshCcw, Star} from "lucide-react";

interface GameIntroProps {
    name: string;
    description: string;
    isFavorite?: boolean;
    complexity?: number;
    strategy?: number;
    luck?: number;
    interaction?: number;
}

export default function GameIntro({ name, description, isFavorite, complexity, strategy, luck, interaction }: GameIntroProps) {
    const [isFavoriteGame, setIsFavoriteGame] = useState<boolean>(isFavorite ?? false);
    const [isFullIntroGame, setIsFullIntroGame] = useState<boolean>(true);
    const introRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (introRef.current) {
            const lineHeight = parseFloat(getComputedStyle(introRef.current).lineHeight);
            const maxHeight = lineHeight * 5; // 5 lines
            setIsFullIntroGame(introRef.current.scrollHeight < maxHeight);
        }
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div>
                <div className="flex justify-between mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                    {isFavoriteGame ? (
                        <Tooltip content={"Remove from Bookmarks"}>
                            <Button
                                className="bg-transparent"
                                isIconOnly
                                onPress={() => setIsFavoriteGame(false)}
                            >
                                <Star size="26px" className="text-yellow-300 fill-current" />
                            </Button>

                        </Tooltip>
                    ) : (
                        <Tooltip content={"Add to Bookmarks"}>
                            <Button
                                className="bg-transparent"
                                isIconOnly
                                onPress={() => setIsFavoriteGame(true)}
                            >
                                <Star size="26px" className="text-yellow-300"/>
                            </Button>
                        </Tooltip>
                    )}
                </div>
                <div className="mb-4">
                    <p ref={introRef} className={`font-medium ${!isFullIntroGame ? 'line-clamp-5' : ''}`}>
                        {description}
                    </p>
                </div>
                {!isFullIntroGame && (
                    <div className="flex justify-end">
                        <h3 className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none cursor-pointer"
                            onClick={() => setIsFullIntroGame(true)}
                        >
                            Read more
                        </h3>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-semibold">Ratings</p>
                <div>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Complexity</span>
                            <span className="text-xs font-medium">{complexity ?? 0}/5</span>
                        </div>
                        <div className="flex items-center gap-3 text-red-500">
                            <Puzzle size="16px" />
                            <Progress size="sm" value={((complexity ?? 0) / 5) * 100}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Strategy</span>
                            <span className="text-xs font-medium">{strategy ?? 0}/5</span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-500">
                            <Castle size="16px" />
                            <Progress size="sm" value={((strategy ?? 0) / 5) * 100}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Luck</span>
                            <span className="text-xs font-medium">{luck ?? 0}/5</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Dice6 size="16px" />
                            <Progress size="sm" value={((luck ?? 0) / 5) * 100}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Interaction</span>
                            <span className="text-xs font-medium">{interaction ?? 0}/5</span>
                        </div>
                        <div className="flex items-center gap-3 text-green-500">
                            <RefreshCcw size="16px" />
                            <Progress size="sm" value={((interaction ?? 0) / 5) * 100}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}