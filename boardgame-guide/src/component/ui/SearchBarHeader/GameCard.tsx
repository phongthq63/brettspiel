import {useTranslation} from "react-i18next";
import Image from "next/image";
import {Card, CardBody} from "@heroui/card";
import {AccessTime, PeopleAltOutlined} from "@mui/icons-material";
import React from "react";

interface GameCardProps {
    game: any;
}

export function GameCard({game}: GameCardProps) {
    const {t} = useTranslation();

    return (
        <div className="relative">
            <Image src="/en_280.png"
                   alt="Board games box"
                   width={100}
                   height={80}
                   className="absolute hidden xl:block left-[-50] translate-y-1/5 z-10"/>
            <Card className="w-52 hover:shadow-xl">
                <CardBody className="relative p-0 overflow-visible">
                    <div className="relative w-full h-24">
                        <Image src={game.imageUrl}
                               alt={game.title}
                               fill
                               sizes={"100%"}
                        />
                    </div>
                    <div className="p-2">
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">{game.title}</h3>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-3 mb-2">{game.description}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                                <PeopleAltOutlined fontSize="small" />
                                <h6 className="ml-1">
                                    {game.minPlayers === game.maxPlayers
                                        ? `${game.minPlayers} ${t('gameCard.players')}`
                                        : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                                    }
                                </h6>

                            </div>
                            <div className="flex items-center">
                                <AccessTime fontSize="small" />
                                <h6 className="ml-1">
                                    {game.minPlayTime === game.maxPlayTime
                                        ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                                        : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                                    }
                                </h6>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}