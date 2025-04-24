import Image from "next/image";
import {Chip} from "@heroui/react";
import {AccessTime, ChildCareOutlined, PeopleAltOutlined} from "@mui/icons-material";
import React from "react";
import {useTranslation} from "react-i18next";

interface GameBannerProps {
    game: any
}

export default function GameBanner({game}: GameBannerProps) {
    const {t} = useTranslation();


    return (
        <div className="relative h-[600px] md:h-[500px]">
            <div className="absolute w-full h-full grid grid-cols-6 grid-rows-6">
                <div className="relative col-span-6 row-span-6">
                    <Image src="/news-banner-899_wide.jpg"
                           alt="Board games banner"
                           fill
                           sizes={"100%"}/>
                </div>
            </div>
            <div className="absolute w-full h-full grid grid-cols-6 grid-rows-6">
                <div className="col-span-6 lg:col-span-2 row-span-2 flex justify-center items-center">
                    <Image src="/en_2000.png"
                           alt="Board games avatar"
                           width={400}
                           height={300}/>
                </div>
                <div className="col-span-6 lg:col-span-2 row-span-1 lg:row-span-2 row-start-3 lg:row-start-auto lg:col-start-5">
                    <div
                        className="w-full h-full flex flex-col justify-start lg:justify-center items-center lg:items-start gap-2 lg:gap-6 scale-75 lg:scale-100">
                        <div className="flex justify-start items-center gap-2">
                            <Chip
                                classNames={{
                                    base: "bg-cyan-500",
                                    content: "text-white font-semibold text-xs",
                                }}
                                radius="sm"
                                size="sm"
                            >
                                Cards
                            </Chip>
                            <Chip
                                classNames={{
                                    base: "bg-red-500",
                                    content: "text-white font-semibold text-xs",
                                }}
                                radius="sm"
                                size="sm"
                            >
                                Animal
                            </Chip>
                            <Chip
                                classNames={{
                                    base: "bg-blue-500",
                                    content: "text-white font-semibold text-xs",
                                }}
                                radius="sm"
                                size="sm"
                            >
                                Coop
                            </Chip>
                            <Chip
                                classNames={{
                                    base: "bg-black",
                                    content: "text-white font-semibold text-xs",
                                }}
                                radius="sm"
                                size="sm"
                            >
                                Small
                            </Chip>
                        </div>
                        <div className="flex gap-2 text-white text-xs">
                            <div className="flex items-center gap-1">
                                <ChildCareOutlined fontSize="small"/>
                                16+
                            </div>
                            <div className="flex items-center gap-1">
                                <PeopleAltOutlined fontSize="small"/>
                                {game.minPlayers === game.maxPlayers
                                    ? `${game.minPlayers} ${t('gameCard.players')}`
                                    : `${game.minPlayers}-${game.maxPlayers} ${"players"}`
                                }
                            </div>
                            <div className="flex items-center gap-1">
                                <AccessTime fontSize="small"/>
                                {game.minPlayTime === game.maxPlayTime
                                    ? `${game.minPlayTime} ${t('gameCard.minutes')}`
                                    : `${game.minPlayTime}-${game.maxPlayTime} ${"minutes"}`
                                }
                            </div>
                        </div>

                    </div>
                </div>
                {/*<div className="col-span-6 lg:col-span-2 row-span-3 lg:row-span-4 row-start-4 lg:row-start-3">*/}
                {/*    <div className="relative w-full h-full hidden lg:flex justify-center items-center">*/}
                {/*        <Image*/}
                {/*            src="/en_280.png"*/}
                {/*            alt="Board games box"*/}
                {/*            style={{*/}
                {/*                objectFit: "scale-down",*/}
                {/*                maxHeight: "100%"*/}
                {/*            }}*/}
                {/*            width={300}*/}
                {/*            height={300}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}