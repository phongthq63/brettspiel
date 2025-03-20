import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {useUser} from "@/store/user";
import {TokenGemType} from "@/games/splendor/types/gem";
import {Card, Gem, Noble} from "@/games/splendor/types/game";


export interface Player {
    id: string
    name: string
    avatar: string
    score: number
}

export interface FocusObject {
    id: string
    type: 'card' | 'gem' | 'noble'
    gem?: {
        type: TokenGemType
        owner?: string
        oldPosition: [number, number, number]
        oldRotation: [number, number, number]
    },
    card?: {
        ref: { [key: string]: any }
        animation: gsap.core.Timeline
    },
    noble?: {
        ref: { [key: string]: any }
        animation: gsap.core.Timeline
    }
}

const GameContext = createContext<{
    gameId: string
    setGameId: Dispatch<SetStateAction<string>>
    status: number | undefined
    setStatus: Dispatch<SetStateAction<number | undefined>>
    playerIds: string[]
    setPlayerIds: Dispatch<SetStateAction<string[]>>
    currentPlayer: string
    setCurrentPlayer: Dispatch<SetStateAction<string>>
    nextPlayer: string
    setNextPlayer: Dispatch<SetStateAction<string>>
    deckCard: {[key: number]: Card[]}
    setDeckCard: Dispatch<SetStateAction<{[key: number]: Card[]}>>
    fieldCard: {[key: number]: Card[]}
    setFieldCard: Dispatch<SetStateAction<{[key: number]: Card[]}>>
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

    focusObjects: FocusObject[]
    addFocusObjects: (focusObject: FocusObject) => void
    removeFocusObjects: (id: string) => void

    isMyTurn: boolean
    // [key: string]: any;
} | undefined>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const {user} = useUser()
    const [gameId, setGameId] = useState<string>("")
    const [status, setStatus] = useState<number>()
    const [playerIds, setPlayerIds] = useState<string[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<string>("")
    const [nextPlayer, setNextPlayer] = useState<string>("")
    const [deckCard, setDeckCard] = useState<{[key: number]: Card[]}>({})
    const [fieldCard, setFieldCard] = useState<{[key: number]: Card[]}>({})
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

    const [focusObjects, setFocusObjects] = useState<FocusObject[]>([])
    const addFocusObjects = (focusObject: FocusObject) => {
        if (focusObjects.some(fo => fo.id == focusObject.id)) return
        setFocusObjects((prevState) => [...prevState, focusObject])
    }
    const removeFocusObjects = (id: string) => {
        setFocusObjects((prevState) => prevState.filter(object => object.id != id))
    }

    const isMyTurn = user?.user_id == currentPlayer

    return (
        <GameContext.Provider value={{
            gameId, setGameId,
            status, setStatus,
            playerIds, setPlayerIds,
            currentPlayer, setCurrentPlayer,
            nextPlayer, setNextPlayer,
            deckCard, setDeckCard,
            fieldCard, setFieldCard,
            deckNoble, setDeckNoble,
            fieldNoble, setFieldNoble,
            gems, setGems,
            players, setPlayers,
            playerCards, setPlayerCards,
            playerReserveCards, setPlayerReserveCards,
            playerNobles, setPlayerNobles,
            playerGems, setPlayerGems,

            focusObjects, addFocusObjects, removeFocusObjects,

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