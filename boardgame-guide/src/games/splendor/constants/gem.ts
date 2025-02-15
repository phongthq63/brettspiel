enum TokenGemType {
    GOLD = "gold",
    DIAMOND = 'diamond',
    EMERALD = 'emerald',
    ONYX = 'onyx',
    RUBY = 'ruby',
    SAPPHIRE = 'sapphire'
}

interface ITokenGemProps {
    id: string
    type: TokenGemType
    url: string
    color: string
}

export const GemGold: ITokenGemProps = {
    id: "gold",
    type: TokenGemType.GOLD,
    url: "/game/splendor/gem/gold.jpg",
    color: "yellow"
};

export const GemDiamond: ITokenGemProps = {
    id: "diamond",
    type: TokenGemType.DIAMOND,
    url: "/game/splendor/gem/diamond.jpg",
    color: "white"
};

export const GemEmerald: ITokenGemProps = {
    id: "emerald",
    type: TokenGemType.EMERALD,
    url: "/game/splendor/gem/emerald.jpg",
    color: "green"
};

export const GemOnyx: ITokenGemProps = {
    id: "onyx",
    type: TokenGemType.ONYX,
    url: "/game/splendor/gem/onyx.jpg",
    color: "black"
};

export const GemRuby: ITokenGemProps = {
    id: "ruby",
    type: TokenGemType.RUBY,
    url: "/game/splendor/gem/ruby.jpg",
    color: "red"
};

export const GemSapphire: ITokenGemProps = {
    id: "sapphire",
    type: TokenGemType.SAPPHIRE,
    url: "/game/splendor/gem/sapphire.jpg",
    color: "blue"
};
