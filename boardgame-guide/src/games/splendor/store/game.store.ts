import {create} from 'zustand'
import {TokenGemType} from "@/games/splendor/types/gem";
import {Action, CardData, Dialog, GemData, NobleData, PhysicsObjectAction, Player} from "@/games/splendor/types/game";
import {GemTokenSize} from "@/games/splendor/component/3d/GemToken";

interface GameStateStore {
    gameId: string
    status: number
    playerIds: string[]
    currentPlayer: string
    nextPlayer: string
    deckCard: {[key: number]: CardData[]}
    fieldCard: {[key: number]: CardData[]}
    gems: Record<TokenGemType, GemData[]>
    deckNoble: NobleData[]
    fieldNoble: NobleData[]
    players: {[key: string]: Player}
    currentAction?: Action
    physicsObjectActions: PhysicsObjectAction[]
    dialog: Dialog
    isLocal: boolean


    // Method
    isPlayerTurn: (playerId: string) => boolean
    setGameState: (data: Partial<GameStateStore>) => void
    setGameId: (gameId: string) => void
    setStatus: (status: number | undefined) => void
    setPlayerIds: (playerIds: string[]) => void
    setCurrentPlayer: (playerId: string) => void
    setNextPlayer: (playerId: string) => void
    setDeckCard: (deck: {[key: number]: CardData[]}) => void
    removeCardDeckCard: (card: {id: string, level: number}) => void
    setFieldCard: (field: {[key: number]: CardData[]}) => void
    removeCardFieldCard: (card: {id: string, level: number}) => void
    setGems: (gems: Record<TokenGemType, GemData[]>) => void
    addGem: (gem: GemData) => void
    addGems: (gems: GemData[]) => void
    removeGem: (gem: {id: string, type: TokenGemType}) => void
    setDeckNoble: (nobles: NobleData[]) => void
    setFieldNoble: (nobles: NobleData[]) => void
    removeNobleFieldNoble: (id: string) => void
    setPlayers: (players: {[key: string]: Player}) => void
    setPlayerGems: (playerId: string, gems: {[key in TokenGemType]: GemData[]}) => void
    addPlayerGem: (playerId: string, gem: GemData) => void
    removePlayerGem: (playerId: string, gem: {id: string, type: TokenGemType}) => void
    removePlayerGems: (playerId: string, gems: {id: string, type: TokenGemType}[]) => void
    addPlayerCard: (playerId: string, card: CardData) => void
    addPlayerReserveCard: (playerId: string, card: CardData) => void
    removePlayerReserveCard: (playerId: string, id: string) => void
    addPlayerNoble:  (playerId: string, noble: NobleData) => void
    setCurrentAction: (action: Action | undefined) => void
    setPhysicsObjectActions: (actions: PhysicsObjectAction[]) => void
    addPhysicsObjectAction: (action: PhysicsObjectAction) => void
    removePhysicsObjectAction: (id: string) => void
    setDialog: (dialog: Dialog) => void
    setIsLocal: (userId: string) => void
}

export const useGameStore = create<GameStateStore>((set, get) => ({
    // Initial state
    gameId: "",
    status: 0,
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
    isLocal: false,


    // Method
    isPlayerTurn: (playerId) => {
        return playerId === get().currentPlayer;
    },
    setGameState: (data) => set((state) => ({ ...state, ...data })),
    setGameId: (gameId) => set({ gameId }),
    setStatus: (status) => set({ status }),
    setPlayerIds: (playerIds) => set({ playerIds }),
    setCurrentPlayer: (currentPlayer) => set({ currentPlayer }),
    setNextPlayer: (nextPlayer) => set({ nextPlayer }),
    setDeckCard: (deckCard) => set({ deckCard }),
    removeCardDeckCard: (card: {id: string, level: number}) => set((state) => ({
        deckCard: {
            ...state.deckCard,
            [card.level]: state.deckCard[card.level].filter(deckCard => deckCard.id != card.id)
        }
    })),
    setFieldCard: (fieldCard) => set({ fieldCard }),
    removeCardFieldCard: (card: {id: string, level: number}) => set((state) => ({
        fieldCard: {
            ...state.fieldCard,
            [card.level]: state.fieldCard[card.level].filter(fieldCard => fieldCard.id != card.id)
        }
    })),
    setGems: (gems) => set({ gems }),
    addGem: (gem: GemData) => set((state) => {
        let gemsOfType = state.gems[gem.type]
        gemsOfType.push(gem)
        gemsOfType = gemsOfType.map((gemOfType, index) => ({
            ...gemOfType,
            position: [gemOfType.position[0], gemOfType.position[1], (index + 0.5) * GemTokenSize.depth],
        }))
        return {
            gems: {...state.gems, [gem.type]: gemsOfType}
        }
    }),
    addGems: (gems: GemData[]) => set((state) => {
        const typeGemMap = Object.groupBy(gems, item => item.type)
        const newGems: Record<TokenGemType, GemData[]> = { ...state.gems }
        for (const type of Object.keys(typeGemMap) as TokenGemType[]) {
            if (typeGemMap[type]) {
                newGems[type] = state.gems[type]
                    .concat(typeGemMap[type])
                    .map((gemOfType, index) => ({
                        ...gemOfType,
                        position: [gemOfType.position[0], gemOfType.position[1], (index + 0.5) * GemTokenSize.depth],
                    }))
            }
        }

        return {
            gems: {...state.gems, ...newGems}
        }
    }),
    removeGem: (gem: {id: string, type: TokenGemType}) => set((state) => ({
        gems: {
            ...state.gems,
            [gem.type]: state.gems[gem.type].filter(typeGem => typeGem.id != gem.id)
        }
    })),
    setDeckNoble: (deckNoble) => set({ deckNoble }),
    setFieldNoble: (fieldNoble) => set({ fieldNoble }),
    removeNobleFieldNoble: (id: string) => set((state) => ({
        fieldNoble: state.fieldNoble.filter(noble => noble.id != id),
    })),
    setPlayers: (players) => set({ players }),
    setPlayerGems: (playerId: string, gems: {[key in TokenGemType]: GemData[]}) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                gems: gems
            }
        }
    })),
    addPlayerGem: (playerId: string, gem: GemData) => set((state) => {
        let playerGems: GemData[] = state.players[playerId].gems[gem.type]
        playerGems.push(gem)
        playerGems = playerGems.map((playerGem, index) => ({
            ...playerGem,
            position: [playerGem.position[0], playerGem.position[1], (index + 0.5) * GemTokenSize.depth],
        }))

        return {
            players: {
                ...state.players,
                [playerId]: {
                    ...state.players[playerId],
                    gems: {
                        ...state.players[playerId].gems,
                        [gem.type]: playerGems
                    }
                }
            }
        }
    }),
    removePlayerGem: (playerId: string, gem: {id: string, type: TokenGemType}) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                gems: {
                    ...state.players[playerId].gems,
                    [gem.type]: state.players[playerId].gems[gem.type].filter(typeGem => typeGem.id != gem.id)
                }
            }
        }
    })),
    removePlayerGems: (playerId: string, gems: {id: string, type: TokenGemType}[]) => set((state) => {
        const typeGemMap = Object.groupBy(gems, item => item.type)
        const newPlayerGems: Record<TokenGemType, GemData[]> = { ...state.players[playerId].gems }
        for (const type of Object.keys(typeGemMap) as TokenGemType[]) {
            if (typeGemMap[type]) {
                newPlayerGems[type] = state.players[playerId].gems[type].filter(typeGem => typeGemMap[type]?.some(returnGem => returnGem.id == typeGem.id))
            }
        }

        return {
            players: {
                ...state.players,
                [playerId]: {
                    ...state.players[playerId],
                    gems: {
                        ...state.players[playerId].gems,
                        ...newPlayerGems
                    }
                }
            }
        }
    }),
    addPlayerCard: (playerId: string, card: CardData) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                cards: {
                    ...state.players[playerId].cards,
                    [card.type]: [
                        ...state.players[playerId].cards[card.type],
                        card
                    ]
                }
            }
        }
    })),
    addPlayerReserveCard: (playerId: string, card: CardData) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                reserveCards: [
                    ...state.players[playerId].reserveCards,
                    card
                ]
            }
        }
    })),
    removePlayerReserveCard: (playerId: string, id: string) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                reserveCards: state.players[playerId].reserveCards.filter(card => card.id == id)
            }
        }
    })),
    addPlayerNoble: (playerId: string, noble: NobleData) => set((state) => ({
        players: {
            ...state.players,
            [playerId]: {
                ...state.players[playerId],
                nobles: [
                    ...state.players[playerId].nobles,
                    noble
                ]
            }
        }
    })),
    setCurrentAction: (currentAction) => set({ currentAction }),
    setPhysicsObjectActions: (physicsObjectActions) => set({ physicsObjectActions }),
    addPhysicsObjectAction: (action: PhysicsObjectAction) => set((state) => {
        switch (action.type) {
            case "noble":
            case "card":
                if (state.physicsObjectActions.some(physicsObjectAction => physicsObjectAction.id == action.id)) {
                    return {}
                }
                break
        }

        return {
            physicsObjectActions: [
                ...state.physicsObjectActions,
                action
            ]
        }
    }),
    removePhysicsObjectAction: (id: string) => set((state) => ({
        physicsObjectActions: state.physicsObjectActions.filter(physicsObjectAction => physicsObjectAction.id != id)
    })),
    setDialog: (dialog) => set({ dialog }),
    setIsLocal: (userId) => set((state) => ({
        isLocal: userId === state.players[state.currentPlayer].id || userId === state.players[state.currentPlayer].local
    }))
})) 