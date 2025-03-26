import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {useUser} from "@/store/user";
import {TokenGemType} from "@/games/splendor/types/gem";
import {Action, Card, Dialog, Gem, Noble, PhysicsObjectAction, Player} from "@/games/splendor/types/game";


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
    currentAction: Action | undefined
    setCurrentAction: Dispatch<SetStateAction<Action | undefined>>
    physicsObjectActions: PhysicsObjectAction[]
    setPhysicsObjectActions: Dispatch<SetStateAction<PhysicsObjectAction[]>>
    dialog: Dialog
    setDialog: Dispatch<SetStateAction<Dialog>>
    isMyTurn: boolean
} | undefined>(undefined);

export const GameSplendorProvider = ({children}: any) => {
    const {user} = useUser()
    const [gameId, setGameId] = useState<string>("")
    const [status, setStatus] = useState<number>()
    const [playerIds, setPlayerIds] = useState<string[]>([])
    const [currentPlayer, setCurrentPlayer] = useState<string>("")
    const [nextPlayer, setNextPlayer] = useState<string>("")
    const [deckCard, setDeckCard] = useState<{[key: number]: Card[]}>({
        [1]: [],
        [2]: [],
        [3]: []
    })
    const [fieldCard, setFieldCard] = useState<{[key: number]: Card[]}>({
        [1]: [],
        [2]: [],
        [3]: []
    })
    const [gems, setGems] = useState<{[key in TokenGemType]: Gem[]}>({
        [TokenGemType.GOLD]: [],
        [TokenGemType.ONYX]: [],
        [TokenGemType.RUBY]: [],
        [TokenGemType.EMERALD]: [],
        [TokenGemType.SAPPHIRE]: [],
        [TokenGemType.DIAMOND]: [],
    })
    const [deckNoble, setDeckNoble] = useState<Noble[]>([])
    const [fieldNoble, setFieldNoble] = useState<Noble[]>([])
    const [players, setPlayers] = useState<{[key: string]: Player}>({})
    const [currentAction, setCurrentAction] = useState<Action>()
    const [physicsObjectActions, setPhysicsObjectActions] = useState<PhysicsObjectAction[]>([])
    const [dialog, setDialog] = useState<Dialog>({
        open: false,
        position: [0, 0, 0],
        rotation: [0, 0, 0]
    })

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
            currentAction, setCurrentAction,
            physicsObjectActions , setPhysicsObjectActions,
            dialog, setDialog,
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