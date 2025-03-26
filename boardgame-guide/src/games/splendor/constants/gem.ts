import {TokenGem, TokenGemType} from "@/games/splendor/types/gem";

export const GemDictionary: {[key in TokenGemType]: TokenGem} = {
    gold: {
        id: "gold",
        type: TokenGemType.GOLD,
        url: "/game/splendor/gem/gold.jpg",
        color: "yellow"
    },
    diamond: {
        id: "diamond",
        type: TokenGemType.DIAMOND,
        url: "/game/splendor/gem/diamond.jpg",
        color: "white"
    },
    sapphire: {
        id: "sapphire",
        type: TokenGemType.SAPPHIRE,
        url: "/game/splendor/gem/sapphire.jpg",
        color: "blue"
    },
    emerald: {
        id: "emerald",
        type: TokenGemType.EMERALD,
        url: "/game/splendor/gem/emerald.jpg",
        color: "green"
    },
    ruby: {
        id: "ruby",
        type: TokenGemType.RUBY,
        url: "/game/splendor/gem/ruby.jpg",
        color: "red"
    },
    onyx: {
        id: "onyx",
        type: TokenGemType.ONYX,
        url: "/game/splendor/gem/onyx.jpg",
        color: "black"
    }
}
