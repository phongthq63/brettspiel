import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Button, Chip, Skeleton} from "@heroui/react";
import React from "react";
import {useRouter} from "next/navigation";
import {Clock, Star, Users} from "lucide-react";

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageBoxUrl: string;
    isHot?: boolean;
    isPopular?: boolean;
    isTopRated?: boolean;
    genres: string[];
    rating: number;
    minPlayers: number;
    maxPlayers: number;
    minPlayTime: number;
    maxPlayTime: number;
    playUrl: string;
}

export function GameCard({title, description, imageUrl, imageBoxUrl, isHot, isPopular, isTopRated, genres, rating, minPlayers, maxPlayers, minPlayTime, maxPlayTime, playUrl,
                  }: GameCardProps) {
    const router = useRouter();
    const { t } = useTranslation();

    const handlerClickPlay = () => {
        router.push(playUrl);
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.5}}
            >
                <div className="relative h-full transition-transform duration-300 ease-in-out hover:-translate-y-2">
                    <Image
                        src={imageBoxUrl}
                        alt="Board games box"
                        width={140}
                        height={100}
                        className="absolute hidden xl:block left-[-60] translate-y-1/4 z-10"
                    />
                    <Card className="h-full hover:shadow-xl">
                        <CardBody className="p-0">
                            <div className="relative w-full h-48">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    sizes={"100%"}
                                />
                                <div className="absolute top-2 left-2 flex gap-2">
                                    {isPopular && (
                                        <Chip
                                            className="bg-blue-500 text-white text-xs font-bold rounded"
                                            size="sm"
                                        >
                                            {"popular"}
                                        </Chip>
                                    )}
                                    {isHot && (
                                        <Chip className="bg-red-500 text-white text-xs font-bold rounded"
                                              size="sm"
                                        >
                                            {"hot"}
                                        </Chip>
                                    )}
                                    {isTopRated && (
                                        <Chip
                                            className="bg-yellow-300 text-white text-xs font-bold rounded"
                                            size="sm"
                                        >
                                            {"High Rate"}
                                        </Chip>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                                    <div className="flex items-center">
                                        <Star size="16px" className="text-yellow-300 fill-current"/>
                                        <span className="ml-1 text-sm font-medium text-gray-700">
                                    {(rating / 10).toFixed(1)}
                                </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {genres.map((genre, index) => (
                                        <Chip
                                            key={index}
                                            className="px-2 py-1 text-xs"
                                            size="sm"
                                        >
                                            {genre}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Users size="16px" />
                                    {minPlayers === maxPlayers
                                        ? `${minPlayers} ${t("players")}`
                                        : `${minPlayers}-${maxPlayers} ${t("players")}`}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size="16px" />
                                    {minPlayTime === maxPlayTime
                                        ? `${minPlayTime} ${t("minutes")}`
                                        : `${minPlayTime}-${maxPlayTime} ${t("minutes")}`}
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] font-medium text-white"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                                }}
                                onPress={handlerClickPlay}
                            >
                                {t("playNow")}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export function GameCardSkeleton() {
    return (
        <Card className="h-full hover:shadow-xl">
            <CardBody className="p-0">
                <div className="relative w-full h-48">
                    <Skeleton className="w-full h-full"/>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <Skeleton className="h-6 w-3/4"/>
                        <Skeleton className="h-5 w-10"/>
                    </div>
                    <Skeleton className="h-4 w-full mb-3"/>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {Array.from({length: 3}).map((_, chipIndex) => (
                            <Skeleton
                                key={chipIndex}
                                className="h-6 w-16 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-3">
                <div className="w-full flex justify-between text-xs text-gray-500">
                    <Skeleton className="h-4 w-24"/>
                    <Skeleton className="h-4 w-24"/>
                </div>
                <Skeleton className="h-10 w-full rounded-md"/>
            </CardFooter>
        </Card>
    )
}
