"use client"

import GameBanner from "@/component/gamedetail/GameBanner";
import GameInformation from "@/component/gamedetail/GameInformation";
import GameIntro from "@/component/gamedetail/GameIntro";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {GameDetailDTO, GameService} from "@/service/game.service";
import {Button} from "@heroui/react";
import {useTranslation} from "react-i18next";
import GameVideo, {Platform} from "@/component/ui/GameVideo";

interface GameDetailProps {
    id: string;
}

export default function GameDetail({ id }: GameDetailProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const [gameData, setGameData] = useState<GameDetailDTO>();

    useEffect(() => {
        async function fetchGameData() {
            try {
                const response = await GameService.getGameInfo({ gameId: id });
                if (response.data) {
                    setGameData(response.data);
                } else {
                    router.push("/404"); // Redirect to 404 if no data
                }
            } catch (error) {
                console.error("Failed to fetch game data:", error);
                router.push("/404"); // Redirect to 404 on error
            }
        }

        fetchGameData();
    }, [id, router]);

    const handleClickPlayNow = () => {
        router.push(gameData?.play_url || "/404");
    }

    const handleClickTutorial = () => {
        router.push(gameData?.tutorial_url || "/404");
    }

    return (
        <div>
            <GameBanner
                id={gameData?.id || ""}
                imageBannerUrl={gameData?.image_banner_url || ""}
                imageNameUrl={gameData?.image_name_url || ""}
                minPlayers={gameData?.min_players || 1}
                maxPlayers={gameData?.max_players || 1}
                minPlayTime={gameData?.min_play_time || 30}
                maxPlayTime={gameData?.max_play_time || 30}
                genres={gameData?.genres?.map((genre) => genre.name || "") || []}
            />

            <div className="grid grid-cols-7 grid-rows-5">
                <div className="col-span-7 lg:col-span-2 lg:row-span-5">
                    <GameInformation
                        image_box_url={gameData?.image_box_url || ""}
                        minPlayers={gameData?.min_players || 1}
                        maxPlayers={gameData?.max_players || 1}
                        minPlayTime={gameData?.min_play_time || 30}
                        maxPlayTime={gameData?.max_play_time || 30}
                        designers={gameData?.designers || []}
                        artists={gameData?.artists || []}
                        publishers={gameData?.publishers || []}
                        year={gameData?.year || 0}
                        gamesPlayed={gameData?.games_played || 0}
                        complexity={gameData?.complexity || 0}
                        strategy={gameData?.strategy || 0}
                        luck={gameData?.luck || 0}
                        interaction={gameData?.interaction || 0}
                    />
                </div>
                <div className="col-span-7 lg:col-span-3 lg:row-span-5 lg:col-start-3">
                    <GameIntro
                        name={gameData?.name || ""}
                        description={gameData?.description || ""}
                        isFavorite={false}
                        rules={gameData?.rules?.map(rule => ({
                            name: rule.name ?? "",
                            language: rule.language ?? "",
                            image_icon_url: rule.image_icon_url ?? "",
                            document_url: rule.document_url ?? "",
                        })) ?? []}/>
                </div>
                <div className="col-span-7 lg:col-span-2 lg:col-start-6">
                    <div className="flex flex-col justify-center items-center gap-4 p-4">
                        <Button
                            className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] border-4 hover:border-none border-[rgba(110,123,251,1)] bg-clip-text hover:bg-clip-border text-transparent hover:text-white w-64 h-20 text-3xl font-semibold uppercase"
                            style={{
                                backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                                transition: "all 0.1s"
                            }}
                            onPress={handleClickPlayNow}
                        >
                            {t("playNow")}
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-[rgba(156,252,248,1)] to-[rgba(110,123,251,1)] border-4 hover:border-none border-[rgba(110,123,251,1)] bg-clip-text hover:bg-clip-border text-transparent hover:text-white w-64 h-20 text-3xl font-semibold uppercase"
                            style={{
                                backgroundImage: "linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)",
                                transition: "all 0.1s"
                            }}
                            onPress={handleClickTutorial}
                        >
                            {t("tutorial")}
                        </Button>
                    </div>
                </div>
                <div className="col-span-7 lg:col-span-2 lg:row-span-4 lg:col-start-6 lg:row-start-2">
                    <div className="flex flex-col justify-center items-center gap-6 p-4">
                        {gameData?.videos?.map((video) => (
                            <GameVideo
                                key={video.id}
                                video={{
                                    id: video.id ?? "",
                                    title: video.title ?? "",
                                    videoId: "VHAK-gU9gi0",
                                    platform: (video.platform ?? "youtube") as Platform,
                                    thumbnail: "/photo-1611996575749-79a3a250f948.jpg",
                                }}/>
                        ))}
                        <GameVideo video={{
                            id: "",
                            title: "How to play",
                            videoId: "VHAK-gU9gi0",
                            platform: "youtube",
                            thumbnail: "/photo-1611996575749-79a3a250f948.jpg",
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

