"use client";

import GameVideo, { Platform } from "@/component/ui/GameVideo";
import { GameRule } from "@/component/game-detail/GameRule";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button, Chip } from "@heroui/react";
import { getRandomColor } from "@/utils";
import { Baby, Clock, Users } from "lucide-react";
import { ImageGallery } from "@/component/ui/ImageGallery";
import GamePlay from "@/component/game-detail/GamePlay";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { GameIntro } from "@/component/game-detail/GameIntro";
import { useGameDetail } from "@/store/game-detail.context";
import {AuthWrapper} from "@/hoc/AuthWrapper";


export function GameDetail() {
    const router = useRouter();
    const { t } = useTranslation();
    const { data } = useGameDetail();
    const [genreChips, setGenreChips] = useState<{
        name: string;
        color: string;
    }[]>([]);
    const [showGamePlay, setShowGamePlay] = useState(false);
    const gamePlayRef = useRef<HTMLDivElement>(null);

    // Random chip color
    useEffect(() => {
        setGenreChips(
            data.genres?.map((genre) => ({
                name: genre.name ?? "",
                color: getRandomColor(),
            })) ?? []
        );
    }, [data]);

    const images = [
        "/photo-1496449903678-68ddcb189a24.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
        "/photo-1611996575749-79a3a250f948.jpg",
    ];

    const handleClickPlayNow = () => {
        setShowGamePlay(true);
        setTimeout(() => {
            if (gamePlayRef.current) {
                const top = gamePlayRef.current.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: top - 100,
                    behavior: "smooth",
                });
            }
        }, 300);
    };

    const onClosePlayNow = () => {
        setShowGamePlay(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClickTutorial = () => {
        router.push(data.tutorial_url || "/404");
    };

    return (
        <>
            {/* Game Banner */}
            <div className="relative h-[600px] md:h-[500px] shadow z-10">
                <div className="absolute w-full h-full">
                    <div className="relative w-full h-full bg-gray-300">
                        {data.image_banner_url && (
                            <Image
                                className="object-cover"
                                src={data.image_banner_url}
                                alt="Board games banner"
                                fill
                                sizes={"100%"}
                                priority
                            />
                        )}
                    </div>
                </div>
                <div className="absolute w-full h-full grid grid-cols-6 grid-rows-7">
                    <div className="col-span-2 row-span-2 hidden lg:flex justify-center items-center">
                        <div className="relative w-full h-full">
                            {data.image_name_url && (
                                <Image
                                    className="object-cover"
                                    src={data.image_name_url}
                                    alt="Board games avatar"
                                    fill
                                    sizes="100%"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className="col-span-6 lg:col-span-2 row-span-1 lg:row-span-2 row-start-2 lg:row-start-1 lg:col-start-5">
                        <div
                            className="w-full h-full flex flex-col justify-start lg:justify-center items-center lg:items-start gap-2 lg:gap-6 scale-75 lg:scale-100">
                            <div className="flex justify-start items-center gap-2">
                                {genreChips.map((genreChip, index) => (
                                    <Chip
                                        key={index}
                                        style={{ backgroundColor: genreChip.color }}
                                        classNames={{
                                            base: "shadow-md",
                                            content: "text-white font-semibold text-xs",
                                        }}
                                        radius="sm"
                                        size="sm"
                                    >
                                        {genreChip.name}
                                    </Chip>
                                ))}
                            </div>
                            <div className="flex gap-3 text-white text-xs">
                                <div className="flex items-center gap-1">
                                    <Baby size="16px" />
                                    {data.min_age ?? 1}+
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users size="16px" />
                                    {data.min_players === data.max_players
                                        ? `${data.min_players} ${t("players")}`
                                        : `${data.min_players}-${data.max_players} ${t("players")}`}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size="16px" />
                                    {data.min_play_time === data.max_play_time
                                        ? `${data.min_play_time} ${t("minutes")}`
                                        : `${data.min_play_time}-${data.max_play_time} ${t("minutes")}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block col-span-2 row-start-7">
                        <div className="absolute w-[280px] top-[-160] left-0">
                            {data.image_box_url && (
                                <Image
                                    className="drop-shadow-md"
                                    src={data.image_box_url}
                                    alt="Board games box"
                                    width={400}
                                    height={300}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className="col-span-6 lg:col-span-2 row-span-2 col-start-1 lg:col-start-5 row-start-6 flex justify-center lg:justify-start items-center gap-6 px-4 lg:px-0 lg:pr-2">
                        <AuthWrapper>
                            <Button
                                className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white w-52 h-16 text-2xl font-semibold uppercase shadow-lg"
                                onPress={handleClickPlayNow}
                            >
                                {t("playNow")}
                            </Button>
                        </AuthWrapper>

                        <Button
                            className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] bg-clip-border text-white w-52 h-16 text-2xl font-semibold uppercase shadow-lg"
                            onPress={handleClickTutorial}
                        >
                            {t("tutorial")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Game Play */}
            <div className="overflow-hidden transition-all duration-500">
                <AnimatePresence>
                    {showGamePlay && (
                        <motion.div
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative bg-[#0077b6] pt-10 px-2 pb-20 z-0"
                        >
                            <AuthWrapper>
                                <div>
                                    <GamePlay ref={gamePlayRef} onClose={onClosePlayNow}/>
                                </div>
                            </AuthWrapper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Game Info */}
            <div className="flex flex-col lg:flex-row mt-8 mb-60">
                <div className="w-full lg:w-3/12 flex flex-col gap-8 px-4 mt-10 mb-20">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Credits</h2>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-sm font-semibold">Designers</p>
                                <p className="font-medium">{data.designers?.join(", ") || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Artists</p>
                                <p className="font-medium">{data.artists?.join(", ") || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Publishers</p>
                                <p className="font-medium">{data.publishers?.join(", ") || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Year</p>
                                <p className="font-medium">{data.year || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Game Links */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Links</h2>
                        <div className="flex flex-col gap-3">
                            {data.links?.map((link) => (
                                <div key={link.id} className="flex gap-2">
                                    <div className="relative w-6 h-4">
                                        <Image
                                            src={link.icon_url ?? ""}
                                            alt={`${link.name} icon`}
                                            fill
                                            sizes="100%"
                                        />
                                    </div>
                                    <Link
                                        href={link.url ?? "/404"}
                                        target="_blank"
                                        className="text-sm text-blue-500 hover:underline cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 order-first lg:order-none flex flex-col gap-8 px-4 mb-8">
                    <GameIntro />
                    <GameRule />
                </div>
                <div className="w-full lg:w-3/12 order-last lg:order-none flex flex-col gap-4 px-4">
                    <ImageGallery images={images}/>
                    <div className="flex flex-col justify-center items-center gap-6">
                        {data.videos?.map((video) => (
                            <GameVideo
                                key={video.id}
                                id={video.id ?? ""}
                                title={video.title}
                                videoId={video.id ?? ""}
                                platform={(video.platform?.toLowerCase() || "youtube") as Platform}
                                thumbnailUrl={video.thumbnail_url}
                                videoUrl={video.url}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

