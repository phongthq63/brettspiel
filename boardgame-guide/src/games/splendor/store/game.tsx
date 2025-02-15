import React, {createContext, useContext, useState} from "react";
import {SplendorGameDTO} from "@/games/splendor/service/splendor.service";
import {useUser} from "@/store/user";
import {
    Card, Gem,
    Noble
} from "@/games/splendor/constants/game";

const GameContext = createContext<any>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const { user } = useUser()
    const [gameData, setGameData] = useState<SplendorGameDTO>();
    const [status, setStatus] = useState<number>();
    const [currentPlayer, setCurrentPlayer] = useState<string>();
    const [nextPlayer, setNextPlayer] = useState<string>();
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
    const [currentAction, setCurrentAction] = useState({type: "", data: {id: "", gem: [], option: []}});

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
            onyxes , setOnyxes ,
            rubies , setRubies,
            emeralds, setEmeralds,
            sapphires, setSapphires,
            diamonds, setDiamonds,
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