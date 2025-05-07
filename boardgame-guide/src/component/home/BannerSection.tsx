"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { HomeService } from "@/service/game.service";
import { BannerDTO } from "@/service/game.service";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {useRouter} from "next/navigation";

const BannerSection = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [banners, setBanners] = useState<BannerDTO[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentBanner = banners[currentIndex];

    useEffect(() => {
        // Fetch banner data from API
        HomeService.getListBanner()
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setBanners(response.data);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch banner data:", error);
            });
    }, []);

    useEffect(() => {
        // Auto-rotate banners every 5 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 20000);

        return () => clearInterval(interval);
    }, [banners]);


    const onClickTutorial = (gameTutorialUrl: string) => {
        router.push(gameTutorialUrl);
    }

    const onClickPlayNow = (gamePlayUrl: string) => {
        router.push(gamePlayUrl);
    }

    return (
        <section className="relative h-[500px] md:h-[700px] mb-60 overflow-hidden">
            <div className="absolute w-full h-full">
                {currentBanner?.image_url && (
                    <AnimatePresence>
                        <motion.div
                            key={currentBanner?.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.8 }}
                            className="absolute w-full h-full grid grid-cols-5 grid-rows-5"
                        >
                            {/* Image Banner */}
                            <motion.div
                                className="relative col-span-5 row-span-4 shadow-2xl bg-gray-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Image
                                    src={currentBanner?.image_url}
                                    alt={currentBanner?.game_title || "Banner"}
                                    fill
                                    sizes={"100%"}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
            <div className="absolute w-full h-full grid grid-cols-5 grid-rows-5">
                <div className="col-span-3 row-span-3 col-start-2"></div>
                <div className="col-span-5 row-start-4 bg-black/60">
                    <div className="h-full grid grid-cols-5 grid-rows-1">
                        <div className="flex items-center col-span-5 lg:col-span-3 lg:col-start-2 mx-4">
                            <motion.h2
                                className="font-bold text-3xl text-white line-clamp-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8 }}
                            >
                                {currentBanner?.game_title}
                            </motion.h2>
                        </div>
                        <div className="hidden lg:flex justify-center items-center col-start-1 row-start-1">
                            {currentBanner?.game_image_box_url && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentBanner?.id + "-box-image"} // Ensure unique key for animation
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <Image
                                            src={currentBanner.game_image_box_url}
                                            alt={currentBanner?.game_title || "Image box game"}
                                            width={400}
                                            height={300}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center col-span-5 lg:col-span-3 lg:col-start-2 row-start-5 mx-4">
                    <motion.div
                        className="my-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-gray-700 text-lg line-clamp-3">
                            {currentBanner?.game_description}
                        </p>
                    </motion.div>
                    {currentBanner && (
                        <div className="flex justify-end w-full gap-4">
                            <Button
                                className="bg-[#0077B6] font-semibold text-white shadow-md"
                                onPress={() => onClickTutorial(currentBanner?.game_tutorial_url ?? "/")}
                            >
                                {t("tutorial")}
                            </Button>
                            <Button
                                className="bg-[#03045E] font-semibold text-white shadow-md"
                                onPress={() => onClickPlayNow(currentBanner?.game_play_url ?? "/")}
                            >
                                {t("playNow")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
