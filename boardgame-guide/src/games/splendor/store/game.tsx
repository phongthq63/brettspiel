import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {useUser} from "@/store/user";
import {CardGemType} from "@/games/splendor/constants/card";
import {TokenGemType} from "@/games/splendor/constants/gem";


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

const GameContext = createContext<{
    gameId: string
    setGameId: Dispatch<SetStateAction<string>>
    status: number
    setStatus: Dispatch<SetStateAction<number>>
    playerIds: string[]
    setPlayerIds: Dispatch<SetStateAction<string[]>>
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
    gems: {[key in TokenGemType]: Gem[]}
    setGems: Dispatch<SetStateAction<{[key in TokenGemType]: Gem[]}>>
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
    playerGems: {[key: string]: {[key in TokenGemType]: Gem[]}}
    setPlayerGems: Dispatch<SetStateAction<{[key: string]: {[key in TokenGemType]: Gem[]}}>>

    [key: string]: any;
} | undefined>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const {user} = useUser()
    const [gameId, setGameId] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [playerIds, setPlayerIds] = useState<string[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<string>("")
    const [nextPlayer, setNextPlayer] = useState<string>("")
    const [deckCard3, setDeckCard3] = useState<Card[]>([])
    const [deckCard2, setDeckCard2] = useState<Card[]>([])
    const [deckCard1, setDeckCard1] = useState<Card[]>([])
    const [fieldCard3, setFieldCard3] = useState<Card[]>([])
    const [fieldCard2, setFieldCard2] = useState<Card[]>([])
    const [fieldCard1, setFieldCard1] = useState<Card[]>([])
    const [gems, setGems] = useState<{[key in TokenGemType]: Gem[]}>({
        diamond: [],
        emerald: [],
        gold: [],
        onyx: [],
        ruby: [],
        sapphire: []
    })
    const [deckNoble, setDeckNoble] = useState<Noble[]>([])
    const [fieldNoble, setFieldNoble] = useState<Noble[]>([])
    const [players, setPlayers] = useState<{[key: string]: Player}>({})
    const [playerCards, setPlayerCards] = useState<{[key: string]: Card[]}>({})
    const [playerReserveCards, setPlayerReserveCards] = useState<{[key: string]: Card[]}>({})
    const [playerNobles, setPlayerNobles] = useState<{[key: string]: Noble[]}>({})
    const [playerGems, setPlayerGems] = useState<{[key: string]: {[key in TokenGemType]: Gem[]}}>({})


    const isMyTurn = user?.user_id == currentPlayer

    return (
        <GameContext.Provider value={{
            gameId, setGameId,
            status, setStatus,
            playerIds, setPlayerIds,
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
            gems, setGems,
            players, setPlayers,
            playerCards, setPlayerCards,
            playerReserveCards, setPlayerReserveCards,
            playerNobles, setPlayerNobles,
            playerGems, setPlayerGems,
            isMyTurn,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameSplendor = () => {
    const context = useContext(GameContext);
    if (context == undefined) {
        throw new Error("useGameSplendor must be used within a GameSplendorProvider");
    }
    return context;
}