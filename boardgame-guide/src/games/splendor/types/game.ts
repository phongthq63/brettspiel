import {CardGem, CardGemType} from "@/games/splendor/types/card";
import {CardNoble} from "@/games/splendor/types/noble";
import {TokenGem, TokenGemType} from "@/games/splendor/types/gem";


export interface Noble extends CardNoble{
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Card extends CardGem {
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Gem extends TokenGem {
    position: [number, number, number]
    rotation: [number, number, number]
}

export interface Player {
    id: string
    name: string
    avatar: string
    score: number
    nobles: Noble[]
    cards: {[key in CardGemType]: Card[]}
    reserveCards: Card[]
    gems: {[key in TokenGemType]: Gem[]}
}

export interface GemAction {
    type: TokenGemType
    owner?: string
    oldPosition: [number, number, number]
    oldRotation: [number, number, number]
}
export interface ObjectAction {
    ref: { [key: string]: any }
    animation: gsap.core.Timeline
}
export interface PhysicsObjectAction {
    id: string
    type: 'noble' | 'card' | 'gem'
    data: GemAction | ObjectAction
    state: Noble | Card | Gem
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