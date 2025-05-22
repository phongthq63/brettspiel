import {CardGem, CardGemType} from "@/games/splendor/types/card";
import {CardNoble} from "@/games/splendor/types/noble";
import {TokenGem, TokenGemType} from "@/games/splendor/types/gem";


export interface NobleData extends CardNoble{
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface CardData extends CardGem {
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface GemData extends TokenGem {
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Player {
    id: string
    name: string
    avatar: string
    score: number
    nobles: NobleData[]
    cards: Record<CardGemType, CardData[]>
    reserveCards: CardData[]
    gems: Record<TokenGemType, GemData[]>
}

export interface PhysicsObjectAction {
    id: string
    type: 'noble' | 'card' | 'gem' | "gem-player"
    ref: { [key: string]: any }
    animation?: gsap.core.Timeline
    state: NobleData | CardData | GemData
}

export interface Action {
    type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble"
    option?: ("gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble")[]
    card?: {
        id: string,
        level: number,
        deck?: boolean,
        ownerId?: string,
        cost: {
            gold?: number
            onyx?: number
            ruby?: number
            emerald?: number
            sapphire?: number
            diamond?: number
        }
    }
    noble?: {id: string}
    gem?: {
        id: string
        type: TokenGemType
        count: number
    }[]
}

export interface Dialog {
    open: boolean,
    position: [number, number, number],
    rotation: [number, number, number]
}