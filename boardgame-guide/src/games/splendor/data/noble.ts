import {CardNoble} from "@/games/splendor/types/noble";


export const Nobles : CardNoble[] = [
    {
        id: "noble_3b3b3w",
        url: "/game/splendor/noble/noble_3b3b3w.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_3b3r3g",
        url: "/game/splendor/noble/noble_3b3r3g.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_3b3r3w",
        url: "/game/splendor/noble/noble_3b3r3w.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_3g3b3r",
        url: "/game/splendor/noble/noble_3g3b3r.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_3g3b3w",
        url: "/game/splendor/noble/noble_3g3b3w.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_4b4g",
        url: "/game/splendor/noble/noble_4b4g.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_4b4r",
        url: "/game/splendor/noble/noble_4b4r.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_4b4w",
        url: "/game/splendor/noble/noble_4b4w.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_4r4g",
        url: "/game/splendor/noble/noble_4r4g.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    },
    {
        id: "noble_4w4b",
        url: "/game/splendor/noble/noble_4w4b.jpg",
        urlBack: "/game/splendor/noble/noble-back.jpg"
    }
];

export const NobleDictionary = Nobles.reduce((dict: { [id: string] : CardNoble }, item) => {
    dict[item.id] = item;
    return dict
}, {})
