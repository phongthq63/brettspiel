import React, {createContext, useContext, useState} from "react";
import {SplendorGameDTO} from "@/games/splendor/service/splendor.service";
import {useUser} from "@/store/user";


export interface INoble {
    id: string,
    url: string,
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface IFieldNoble {
    position: [number, number, number]
    noble?: INoble
}

export interface ICard {
    id: string,
    type: string,
    level: number
    url: string
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface IFieldCard {
    position: [number, number, number]
    card?: ICard
}

export interface IPlayer {
    player_id: string,
    noble: INoble[],
    reserve_card: ICard[],
    gold: number,
    onyx: number,
    ruby: number,
    emerald: number,
    sapphire: number,
    diamond: number,
    card_onyx: ICard[],
    card_ruby: ICard[],
    card_emerald: ICard[],
    card_sapphire: ICard[],
    card_diamond: ICard[],
}

export interface IIngameData {
    gameId: string,
    status: number
    deskNoble: INoble[],
    fieldNoble: IFieldNoble[],
    deskCardLevel1: ICard[],
    fieldCardLevel1: IFieldCard[],
    deskCardLevel2: ICard[],
    fieldCardLevel2: IFieldCard[],
    deskCardLevel3: ICard[],
    fieldCardLevel3: IFieldCard[],
    gold: number,
    onyx: number,
    ruby: number,
    emerald: number,
    sapphire: number,
    diamond: number,
    player: IPlayer[]
}

export const ingameData : IIngameData = {
    gameId: "",
    status: -1,
    deskNoble: [],
    fieldNoble: [],
    deskCardLevel1: [],
    fieldCardLevel1: [],
    deskCardLevel2: [],
    fieldCardLevel2: [],
    deskCardLevel3: [],
    fieldCardLevel3: [],
    gold: 0,
    onyx: 0,
    ruby: 0,
    emerald: 0,
    sapphire: 0,
    diamond: 0,
    player: []
};

const GameContext = createContext<any>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const { user } = useUser()
    const [gameData, setGameData] = useState<SplendorGameDTO>();
    const [isDataReady, setIsDataReady] = useState(false);
    const [currentAction, setCurrentAction] = useState({type: "", data: {id: "", gem: [], option: []}});

    const isMyTurn = user?.user_id == gameData?.ingame_data?.current_player

    return (
        <GameContext.Provider value={{
            gameData, setGameData,
            isDataReady, setIsDataReady,
            isMyTurn,
            currentAction, setCurrentAction,
        }}>
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