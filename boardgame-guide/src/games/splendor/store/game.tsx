import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {TokenGemType} from "@/games/splendor/constants/gem";
import {useUser} from "@/store/user";
import {CardGemType} from "@/games/splendor/constants/card";


export interface Noble {
    id: string
    url: string
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Card {
    id: string
    type: CardGemType
    level: 1 | 2 | 3 | number
    url: string
    position: [number, number, number]
    rotation: [number, number, number]
}
export interface Gem {
    id: string
    owner?: string
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Player {
    id: string
    name: string
    avatar: string
    score: number
}

export interface Action {
    type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble" | string
    card?: {
        id: string,
        level: number,
        deck: boolean
    }
    noble?: {id: string}
    gem?: {
        id: string
        type: TokenGemType
        count: number
    }[]
    option?: string[]
}

const GameContext = createContext<{
    gameId: string
    setGameId: Dispatch<SetStateAction<string>>
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
    players: {[key: string]: Player}
    setPlayers: Dispatch<SetStateAction<{[key: string]: Player}>>
    playerCards: {[key: string]: Card[]}
    setPlayerCards: Dispatch<SetStateAction<{[key: string]: Card[]}>>
    playerReserveCards: {[key: string]: Card[]}
    setPlayerReserveCards: Dispatch<SetStateAction<{[key: string]: Card[]}>>
    playerNobles: {[key: string]: Noble[]}
    setPlayerNobles: Dispatch<SetStateAction<{[key: string]: Noble[]}>>
    playerGolds: {[key: string]: Gem[]},
    setPlayerGolds: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    playerOnyxes: {[key: string]: Gem[]},
    setPlayerOnyxes: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    playerRubies: {[key: string]: Gem[]},
    setPlayerRubies: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    playerEmeralds: {[key: string]: Gem[]},
    setPlayerEmeralds: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    playerSapphires: {[key: string]: Gem[]},
    setPlayerSapphires: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    playerDiamonds: {[key: string]: Gem[]},
    setPlayerDiamonds: Dispatch<SetStateAction<{[key: string]: Gem[]}>>
    currentAction: Action | undefined
    setCurrentAction: Dispatch<SetStateAction<Action | undefined>>

    [key: string]: any;
} | undefined>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const {user} = useUser()
    const [gameId, setGameId] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [currentPlayer, setCurrentPlayer] = useState<string>("")
    const [nextPlayer, setNextPlayer] = useState<string>("")
    const [deckCard3, setDeckCard3] = useState<Card[]>([])
    const [deckCard2, setDeckCard2] = useState<Card[]>([])
    const [deckCard1, setDeckCard1] = useState<Card[]>([])
    const [fieldCard3, setFieldCard3] = useState<Card[]>([])
    const [fieldCard2, setFieldCard2] = useState<Card[]>([])
    const [fieldCard1, setFieldCard1] = useState<Card[]>([])
    const [golds, setGolds] = useState<Gem[]>([])
    const [onyxes, setOnyxes] = useState<Gem[]>([])
    const [rubies, setRubies] = useState<Gem[]>([])
    const [emeralds, setEmeralds] = useState<Gem[]>([])
    const [sapphires, setSapphires] = useState<Gem[]>([])
    const [diamonds, setDiamonds] = useState<Gem[]>([])
    const [deckNoble, setDeckNoble] = useState<Noble[]>([])
    const [fieldNoble, setFieldNoble] = useState<Noble[]>([])
    const [players, setPlayers] = useState<{[key: string]: Player}>({})
    const [playerCards, setPlayerCards] = useState<{[key: string]: Card[]}>({})
    const [playerReserveCards, setPlayerReserveCards] = useState<{[key: string]: Card[]}>({})
    const [playerNobles, setPlayerNobles] = useState<{[key: string]: Noble[]}>({})
    const [playerGolds, setPlayerGolds] = useState<{[key: string]: Gem[]}>({})
    const [playerOnyxes, setPlayerOnyxes] = useState<{[key: string]: Gem[]}>({})
    const [playerRubies, setPlayerRubies] = useState<{[key: string]: Gem[]}>({})
    const [playerEmeralds, setPlayerEmeralds] = useState<{[key: string]: Gem[]}>({})
    const [playerSapphires, setPlayerSapphires] = useState<{[key: string]: Gem[]}>({})
    const [playerDiamonds, setPlayerDiamonds] = useState<{[key: string]: Gem[]}>({})
    const [currentAction, setCurrentAction] = useState<Action>()


    const isMyTurn = user?.user_id == currentPlayer

    return (
        <GameContext.Provider value={{
            gameId, setGameId,
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
            players, setPlayers,
            playerCards, setPlayerCards,
            playerReserveCards, setPlayerReserveCards,
            playerNobles, setPlayerNobles,
            playerGolds, setPlayerGolds,
            playerOnyxes, setPlayerOnyxes,
            playerRubies, setPlayerRubies,
            playerEmeralds, setPlayerEmeralds,
            playerSapphires, setPlayerSapphires,
            playerDiamonds, setPlayerDiamonds,
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