import {CardGem} from "@/games/splendor/types/card";
import {CardNoble} from "@/games/splendor/types/noble";
import {TokenGem} from "@/games/splendor/types/gem";


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