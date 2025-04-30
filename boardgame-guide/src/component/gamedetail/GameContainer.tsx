"use client"

import GameBanner from "@/component/gamedetail/GameBanner";
import GameInfo from "@/component/gamedetail/GameInfo";
import GameIntro from "@/component/gamedetail/GameIntro";
import GamePlay from "@/component/gamedetail/GamePlay";
import GamePreview from "@/component/gamedetail/GamePreview";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {GameDetailDTO, GameService} from "@/service/game.service";

interface GameContainerProps {
    id: string;
}

export default function GameContainer({ id }: GameContainerProps) {
    const router = useRouter();
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
                    <GameInfo
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
                    <GameIntro />
                </div>
                <div className="col-span-7 lg:col-span-2 lg:col-start-6">
                    <GamePlay />
                </div>
                <div className="col-span-7 lg:col-span-2 lg:row-span-4 lg:col-start-6 lg:row-start-2">
                    <GamePreview />
                </div>
            </div>
        </div>
    );
}
