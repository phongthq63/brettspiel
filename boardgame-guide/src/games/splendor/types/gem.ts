export enum TokenGemType {
    GOLD = "gold",
    DIAMOND = 'diamond',
    EMERALD = 'emerald',
    ONYX = 'onyx',
    RUBY = 'ruby',
    SAPPHIRE = 'sapphire'
}

export interface TokenGem {
    id: string
    type: TokenGemType
    url: string
    color: string
}