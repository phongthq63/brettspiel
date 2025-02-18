import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {SplendorGameDTO} from "@/games/splendor/service/splendor.service";
import {useUser} from "@/store/user";
import {TokenGemType} from "@/games/splendor/constants/gem";


export interface Noble {
    id: string
    url: string
    position: number[]
    rotation: number[]
}

export interface Card {
    id: string
    type: string
    level: number
    url: string
    position: number[]
    rotation: number[]
}
export interface Gem {
    id: string
    owner: string
    position: number[]
    rotation: number[]
}

export interface Action {
    type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble"
    card?: {id: string}
    noble?: {id: string}
    gem?: {
        id: string
        type: TokenGemType
        count: number
    }[]
    option?: string[]
}

const GameContext = createContext<{
    gameData: SplendorGameDTO | undefined
    setGameData: Dispatch<SetStateAction<SplendorGameDTO | undefined>>
    status: number
    setStatus: Dispatch<SetStateAction<number>>
    currentPlayer: string
    setCurrentPlayer: Dispatch<SetStateAction<string>>
    nextPlayer: string
    setNextPlayer: Dispatch<SetStateAction<string>>
    deckCard3: Card[]
    setDeckCard3: Dispatch<SetStateAction<Card[]>>
    deckCard2: Card[]
    setDeckCard2: Dispatch<SetStateAction<Card[]>>
    deckCard1: Card[]
    setDeckCard1: Dispatch<SetStateAction<Card[]>>
    fieldCard3: Card[]
    setFieldCard3: Dispatch<SetStateAction<Card[]>>
    fieldCard2: Card[]
    setFieldCard2: Dispatch<SetStateAction<Card[]>>
    fieldCard1: Card[]
    setFieldCard1: Dispatch<SetStateAction<Card[]>>
    golds: Gem[]
    setGolds: Dispatch<SetStateAction<Gem[]>>
    onyxes: Gem[]
    setOnyxes: Dispatch<SetStateAction<Gem[]>>
    rubies: Gem[]
    setRubies: Dispatch<SetStateAction<Gem[]>>
    emeralds: Gem[]
    setEmeralds: Dispatch<SetStateAction<Gem[]>>
    sapphires: Gem[]
    setSapphires: Dispatch<SetStateAction<Gem[]>>
    diamonds: Gem[]
    setDiamonds: Dispatch<SetStateAction<Gem[]>>
    deckNoble: Noble[]
    setDeckNoble: Dispatch<SetStateAction<Noble[]>>
    fieldNoble: Noble[]
    setFieldNoble: Dispatch<SetStateAction<Noble[]>>
    currentAction: Action | undefined
    setCurrentAction: Dispatch<SetStateAction<Action | undefined>>

    [key: string]: any;
} | undefined>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const { user } = useUser()
    const [gameData, setGameData] = useState<SplendorGameDTO>();
    const [status, setStatus] = useState<number>(0);
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [nextPlayer, setNextPlayer] = useState<string>("");
    const [deckCard3, setDeckCard3] = useState<Card[]>([]);
    const [deckCard2, setDeckCard2] = useState<Card[]>([]);
    const [deckCard1, setDeckCard1] = useState<Card[]>([]);
    const [fieldCard3, setFieldCard3] = useState<Card[]>([]);
    const [fieldCard2, setFieldCard2] = useState<Card[]>([]);
    const [fieldCard1, setFieldCard1] = useState<Card[]>([]);
    const [golds, setGolds] = useState<Gem[]>([]);
    const [onyxes, setOnyxes] = useState<Gem[]>([]);
    const [rubies, setRubies] = useState<Gem[]>([]);
    const [emeralds, setEmeralds] = useState<Gem[]>([]);
    const [sapphires, setSapphires] = useState<Gem[]>([]);
    const [diamonds, setDiamonds] = useState<Gem[]>([]);
    const [deckNoble, setDeckNoble] = useState<Noble[]>([]);
    const [fieldNoble, setFieldNoble] = useState<Noble[]>([]);
    const [currentAction, setCurrentAction] = useState<Action>();

    const isMyTurn = user?.user_id == gameData?.ingame_data?.current_player

    return (
        <GameContext.Provider value={{
            gameData, setGameData,
            status, setStatus,
            currentPlayer, setCurrentPlayer,
            nextPlayer, setNextPlayer,
            deckCard3, setDeckCard3,
            deckCard2, setDeckCard2,
            deckCard1, setDeckCard1,
            fieldCard3, setFieldCard3,
            fieldCard2, setFieldCard2,
            fieldCard1, setFieldCard1,
            deckNoble, setDeckNoble,
            fieldNoble, setFieldNoble,
            golds, setGolds,
            onyxes , setOnyxes,
            rubies , setRubies,
            emeralds, setEmeralds,
            sapphires, setSapphires,
            diamonds, setDiamonds,
            currentAction, setCurrentAction,
            isMyTurn,
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