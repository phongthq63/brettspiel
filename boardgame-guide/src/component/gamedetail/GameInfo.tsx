import Image from "next/image";
import React from "react";
import {AccessTime, Casino, Castle, ChangeCircleOutlined, Extension, PeopleAltOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {Progress} from "@heroui/react";

interface GameInfoProps {
    image_box_url: string;
    minPlayers: number;
    maxPlayers: number;
    minPlayTime: number;
    maxPlayTime: number;
    designers?: string[];
    artists?: string[];
    publishers?: string[];
    year?: number;
    gamesPlayed?: number;
    complexity?: number;
    strategy?: number;
    luck?: number;
    interaction?: number;
}

export default function GameInfo({image_box_url, minPlayers, maxPlayers, minPlayTime, maxPlayTime, designers, artists, publishers, year, gamesPlayed, complexity, strategy, luck, interaction,
}: GameInfoProps) {
    const {t} = useTranslation();

    return (
        <div className="p-10">
            <div className="relative mb-40">
                <div className="absolute w-96 h-72 top-[-160] left-[-80]">
                    {image_box_url && (
                        <Image
                            src={image_box_url}
                            alt="Board games box"
                            fill
                            sizes={"100%"}/>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Credits</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm font-semibold">Designers</p>
                        <p className="font-medium">{designers?.join(", ") || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Artists</p>
                        <p className="font-medium">{artists?.join(", ") || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Publishers</p>
                        <p className="font-medium">{publishers?.join(", ") || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Year</p>
                        <p className="font-medium">{year || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Number of games played</p>
                        <p className="font-medium">{gamesPlayed?.toLocaleString() ?? 0}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Number of Players</p>
                        <p className="font-medium flex gap-1">
                            <PeopleAltOutlined fontSize="small"/>
                            {minPlayers === maxPlayers
                                ? `${minPlayers} ${t('players')}`
                                : `${minPlayers}-${maxPlayers} players`}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Play Time</p>
                        <p className="font-medium flex items-center gap-1">
                            <AccessTime fontSize="small"/>
                            {minPlayTime === maxPlayTime
                                ? `${minPlayTime} ${t('minutes')}`
                                : `${minPlayTime}-${maxPlayTime} minutes`}
                        </p>
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
                                    <Extension fontSize="small"/>
                                    <Progress size="sm" value={((complexity ?? 0) / 5) * 100}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Strategy</span>
                                    <span className="text-xs font-medium">{strategy ?? 0}/5</span>
                                </div>
                                <div className="flex items-center gap-3 text-blue-500">
                                    <Castle fontSize="small"/>
                                    <Progress size="sm" value={((strategy ?? 0) / 5) * 100}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Luck</span>
                                    <span className="text-xs font-medium">{luck ?? 0}/5</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Casino fontSize="small"/>
                                    <Progress size="sm" value={((luck ?? 0) / 5) * 100}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Interaction</span>
                                    <span className="text-xs font-medium">{interaction ?? 0}/5</span>
                                </div>
                                <div className="flex items-center gap-3 text-green-500">
                                    <ChangeCircleOutlined fontSize="small"/>
                                    <Progress size="sm" value={((interaction ?? 0) / 5) * 100}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
