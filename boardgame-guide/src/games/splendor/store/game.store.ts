import {create} from 'zustand'
import {TokenGemType} from "@/games/splendor/types/gem";
import {Action, Card, Dialog, Gem, Noble, PhysicsObjectAction, Player} from "@/games/splendor/types/game";

interface GameState {
    gameId: string
    status?: number
    playerIds: string[]
    currentPlayer: string
    nextPlayer: string
    deckCard: {[key: number]: Card[]}
    fieldCard: {[key: number]: Card[]}
    gems: {[key in TokenGemType]: Gem[]}
    deckNoble: Noble[]
    fieldNoble: Noble[]
    players: {[key: string]: Player}
    currentAction?: Action
    physicsObjectActions: PhysicsObjectAction[]
    dialog: Dialog
    isMyTurn: boolean

    // Actions
    setGameId: (gameId: string) => void
    setStatus: (status: number | undefined) => void
    setPlayerIds: (playerIds: string[]) => void
    setCurrentPlayer: (playerId: string) => void
    setNextPlayer: (playerId: string) => void
    setDeckCard: (deck: {[key: number]: Card[]}) => void
    setFieldCard: (field: {[key: number]: Card[]}) => void
    setGems: (gems: {[key in TokenGemType]: Gem[]}) => void
    setDeckNoble: (nobles: Noble[]) => void
    setFieldNoble: (nobles: Noble[]) => void
    setPlayers: (players: {[key: string]: Player}) => void
    setCurrentAction: (action: Action | undefined) => void
    setPhysicsObjectActions: (actions: PhysicsObjectAction[]) => void
    setDialog: (dialog: Dialog) => void
    setIsMyTurn: (userId?: string) => void
}

export const useGameStore = create<GameState>((set) => ({
    // Initial state
    userId: "",
    gameId: "",
    playerIds: [],
    currentPlayer: "",
    nextPlayer: "",
    deckCard: {
        1: [],
        2: [],
        3: []
    },
    fieldCard: {
        1: [],
        2: [],
        3: []
    },
    gems: {
        [TokenGemType.GOLD]: [],
        [TokenGemType.ONYX]: [],
        [TokenGemType.RUBY]: [],
        [TokenGemType.EMERALD]: [],
        [TokenGemType.SAPPHIRE]: [],
        [TokenGemType.DIAMOND]: [],
    },
    deckNoble: [],
    fieldNoble: [],
    players: {},
    physicsObjectActions: [],
    dialog: {
        open: false,
        position: [0, 0, 0],
        rotation: [0, 0, 0]
    },
    isMyTurn: false,

    // Actions
    setGameId: (gameId) => set({ gameId }),
    setStatus: (status) => set({ status }),
    setPlayerIds: (playerIds) => set({ playerIds }),
    setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
    setNextPlayer: (nextPlayer) => set({ nextPlayer }),
    setDeckCard: (deckCard) => set({ deckCard }),
    setFieldCard: (fieldCard) => set({ fieldCard }),
    setGems: (gems) => set({ gems }),
    setDeckNoble: (deckNoble) => set({ deckNoble }),
    setFieldNoble: (fieldNoble) => set({ fieldNoble }),
    setPlayers: (players) => set({ players }),
    setCurrentAction: (currentAction) => set({ currentAction }),
    setPhysicsObjectActions: (physicsObjectActions) => set({ physicsObjectActions }),
    setDialog: (dialog) => set({ dialog }),
    setIsMyTurn: (userId) => set((state) => ({
        isMyTurn: userId === state.currentPlayer
    })),
})) 