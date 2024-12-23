import React, {createContext, useContext, useState} from "react";
import {SplendorGameDTO} from "@/games/splendor/service/splendor.service";

const GameContext = createContext<any>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const [gameData, setGameData] = useState<SplendorGameDTO>();

    return (
        <GameContext.Provider value={{ gameData, setGameData }}>
            {children}
        </GameContext.Provider>
    )
};

export const useGameSplendor = () => {
    const context = useContext(GameContext);
    if (context == undefined) {
        throw new Error("useGameSplendor must be used within a GameSplendorProvider");
    }
    return context;
};