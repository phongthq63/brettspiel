export enum CardGemType {
    DIAMOND = 'diamond',
    EMERALD = 'emerald',
    ONYX = 'onyx',
    RUBY = 'ruby',
    SAPPHIRE = 'sapphire'
}

export interface CardGem {
    id: string
    type: CardGemType
    level: 1 | 2 | 3
    url: string
    cost: {
        gold?: number
        onyx?: number
        ruby?: number
        emerald?: number
        sapphire?: number
        diamond?: number
    }
}