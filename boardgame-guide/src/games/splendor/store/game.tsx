import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {SplendorGameDTO} from "@/games/splendor/service/splendor.service";
import {useUser} from "@/store/user";

const GameContext = createContext<any>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const { user } = useUser();
    const [gameData, setGameData] = useState<SplendorGameDTO>();
    const [isDataReady, setIsDataReady] = useState<boolean>(false);
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

    const cardRefs = useRef<any>({});
    const nobleRefs = useRef<any>({});
    
    
    useEffect(() => {
        if (user && gameData) {
            if (user.user_id == gameData.ingame_data?.current_player) {
                setIsMyTurn(true)
            } else {
                setIsMyTurn(false)
            }
        }
    }, [user, gameData])


    return (
        <GameContext.Provider value={{ gameData, setGameData, isDataReady, setIsDataReady, isMyTurn, cardRefs, nobleRefs }}>
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