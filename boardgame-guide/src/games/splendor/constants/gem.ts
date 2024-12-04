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

export const GEM_DIAMOND: ITokenGemProps = {
    id: "diamond",
    type: TokenGemType.DIAMOND,
    url: "/game/splendor/gem/diamond.jpg",
    color: "white"
};

export const GEM_EMERALD: ITokenGemProps = {
    id: "emerald",
    type: TokenGemType.EMERALD,
    url: "/game/splendor/gem/emerald.jpg",
    color: "green"
};

export const GEM_GOLD: ITokenGemProps = {
    id: "gold",
    type: TokenGemType.GOLD,
    url: "/game/splendor/gem/gold.jpg",
    color: "yellow"
};

export const GEM_ONYX: ITokenGemProps = {
    id: "onyx",
    type: TokenGemType.ONYX,
    url: "/game/splendor/gem/onyx.jpg",
    color: "black"
};

export const GEM_RUBY: ITokenGemProps = {
    id: "ruby",
    type: TokenGemType.RUBY,
    url: "/game/splendor/gem/ruby.jpg",
    color: "red"
};

export const GEM_SAPPHIRE: ITokenGemProps = {
    id: "sapphire",
    type: TokenGemType.SAPPHIRE,
    url: "/game/splendor/gem/sapphire.jpg",
    color: "blue"
};
