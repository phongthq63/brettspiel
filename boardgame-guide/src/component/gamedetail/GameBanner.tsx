"use client";

import Image from "next/image";
import {Chip} from "@heroui/react";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getRandomColor} from "@/utils";
import {Baby, Clock, Users} from "lucide-react";


interface GameBannerProps {
    imageBannerUrl: string;
    imageNameUrl: string;
    minPlayers: number;
    maxPlayers: number;
    minPlayTime: number;
    maxPlayTime: number;
    genres: string[];
}

export default function GameBanner({
    imageBannerUrl,
    imageNameUrl,
    minPlayers,
    maxPlayers,
    minPlayTime,
    maxPlayTime,
    genres,
}: GameBannerProps) {
    const {t} = useTranslation();
    const [genreChips, setGenreChips] = useState<{
        name: string;
        color: string;
    }[]>([]);


    useEffect(() => {
        setGenreChips(genres.map((genre) => ({name: genre, color: getRandomColor()})));
    }, [genres]);

    return (
        <div className="relative h-[600px] md:h-[500px]">
            <div className="absolute w-full h-full grid grid-cols-6 grid-rows-6">
                <div className="relative col-span-6 row-span-6 bg-gray-300">
                    <Image src={imageBannerUrl}
                           alt="Board games banner"
                           fill
                           sizes={"100%"}
                           className="object-cover"
                    />
                </div>
            </div>
            <div className="absolute w-full h-full grid grid-cols-6 grid-rows-6">
                <div className="col-span-2 row-span-2 hidden lg:flex justify-center items-center">
                    <Image src={imageNameUrl}
                           alt="Board games avatar"
                           width={400}
                           height={300}/>
                </div>
                <div className="col-span-6 lg:col-span-2 row-span-1 lg:row-span-2 row-start-2 lg:row-start-1 lg:col-start-5">
                    <div
                        className="w-full h-full flex flex-col justify-start lg:justify-center items-center lg:items-start gap-2 lg:gap-6 scale-75 lg:scale-100">
                        <div className="flex justify-start items-center gap-2">
                            {genreChips.map((genreChip, index) => (
                                <Chip
                                    key={index}
                                    style={{ backgroundColor: genreChip.color }}
                                    classNames={{
                                        content: "text-white font-semibold text-xs",
                                    }}
                                    radius="sm"
                                    size="sm"
                                >
                                    {genreChip.name}
                                </Chip>
                            ))}
                        </div>
                        <div className="flex gap-2 text-white text-xs">
                            <div className="flex items-center gap-1">
                                <Baby size="16px" />
                                16+
                            </div>
                            <div className="flex items-center gap-1">
                                <Users size="16px" />
                                {minPlayers === maxPlayers
                                    ? `${minPlayers} ${t('players')}`
                                    : `${minPlayers}-${maxPlayers} ${t('players')}`
                                }
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size="16px" />
                                {minPlayTime === maxPlayTime
                                    ? `${minPlayTime} ${t('minutes')}`
                                    : `${minPlayTime}-${maxPlayTime} ${t('minutes')}`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

