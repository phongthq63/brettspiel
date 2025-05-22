import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";
import {useFetchGameData} from "@/games/splendor/hooks/useFetchGameData";
import GameCanvas from "@/games/splendor/component/3d/GameRenderer";
import PlayerInfoCard from "@/games/splendor/component/ui/PlayerInfoCard";
import React from "react";
import ActionDescription from "@/games/splendor/component/ui/ActionDescription";
import {motion} from "framer-motion";

export default function GamePlaySection({gameId}: {gameId: string}) {
    useFetchGameData(gameId)
    const players = useGameStore(useShallow((state) => state.players))


    return (
        <div>
            <div className="relative w-full mb-60">
                <div className="w-full h-[70dvh] xl:h-[calc(100vh-100px)]">
                    <GameCanvas/>
                </div>
                <div
                    className="relative md:absolute top-0 right-0 w-full md:w-64 grid grid-cols-2 md:grid-cols-1 gap-1">
                    {Object.keys(players).map((playerId: string) => (
                        <motion.div
                            key={playerId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <PlayerInfoCard playerId={playerId} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <ActionDescription/>
        </div>
    )
}