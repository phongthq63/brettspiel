"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { GameDetailDTO } from "@/service/server/game.service";

const GameDetailContext = createContext<{
    data: GameDetailDTO;
} | undefined>(undefined);

interface GameDetailProviderProps {
    data: GameDetailDTO;
    children: ReactNode;
}

export const GameDetailProvider: React.FC<GameDetailProviderProps> = ({ data, children }) => {
    return (
        <GameDetailContext.Provider value={{ data }}>
            {children}
        </GameDetailContext.Provider>
    );
};

export const useGameDetail = () => {
    const context = useContext(GameDetailContext);
    if (!context) {
        throw new Error("useGameDetail must be used within a GameDetailProvider");
    }
    return context;
};
