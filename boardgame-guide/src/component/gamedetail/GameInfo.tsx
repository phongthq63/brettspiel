import Image from "next/image";
import React from "react";
import {AccessTime, Casino, Castle, ChangeCircleOutlined, Extension, PeopleAltOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {Progress} from "@heroui/react";


interface GameInfoProps {
    game: any
}

export default function GameInfo({game}: GameInfoProps) {
    const {t} = useTranslation();


    return (
        <div className="p-10">
            <div className="relative mb-40">
                <div className="absolute w-96 h-72 top-[-160] left-[-80]">
                    <Image
                        src="/en_280.png"
                        alt="Board games box"
                        fill/>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Credits</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm font-semibold">Designer</p>
                        <p className="font-medium">Kevin Russ</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Artist</p>
                        <p className="font-medium">Michael Menzel, Pete Fenlon</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Publisher</p>
                        <p className="font-medium">Catan</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Year</p>
                        <p className="font-medium">1995</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Number of games played</p>
                        <p className="font-medium">5,111,567</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Number of Players</p>
                        <p className="font-medium flex gap-1">
                            <PeopleAltOutlined fontSize="small"/>
                            {game.minPlayers === game.maxPlayers
                                ? `${game.minPlayers} ${t('gameCard.players')}`
                                : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Play Time</p>
                        <p className="font-medium flex items-center gap-1">
                            <AccessTime fontSize="small"/>
                            {game.minPlayTime === game.maxPlayTime
                                ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                                : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                            }
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Ratings</p>
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Complexity</span>
                                    <span className="text-xs font-medium">2/5</span>
                                </div>
                                <div className="flex items-center gap-3 text-red-500">
                                    <Extension fontSize="small"/>
                                    <Progress size="sm" value={40}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Strategy</span>
                                    <span className="text-xs font-medium">3/5</span>
                                </div>
                                <div className="flex items-center gap-3 text-blue-500">
                                    <Castle fontSize="small"/>
                                    <Progress size="sm" value={60}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Luck</span>
                                    <span className="text-xs font-medium">3/5</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Casino fontSize="small"/>
                                    <Progress size="sm" value={60}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Interaction</span>
                                    <span className="text-xs font-medium">4/5</span>
                                </div>
                                <div className="flex items-center gap-3 text-green-500">
                                    <ChangeCircleOutlined fontSize="small"/>
                                    <Progress size="sm" value={80}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}