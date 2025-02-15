enum CardGemType {
    DIAMOND = 'diamond',
    EMERALD = 'emerald',
    ONYX = 'onyx',
    RUBY = 'ruby',
    SAPPHIRE = 'sapphire'
}

interface ICardGemProps {
    id: string
    type: CardGemType
    level: number
    url: string
}

export const Cards : ICardGemProps[] = [
    {
        id: 'diamond_3',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_3.jpg'
    },
    {
        id: 'diamond_4',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_4.jpg'
    },
    {
        id: 'diamond_21',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_21.jpg'
    },
    {
        id: 'diamond_22',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_22.jpg'
    },
    {
        id: 'diamond_221',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_221.jpg'
    },
    {
        id: 'diamond_311',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_311.jpg'
    },
    {
        id: 'diamond_1111',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_1111.jpg'
    },
    {
        id: 'diamond_1211',
        type: CardGemType.DIAMOND,
        level: 1,
        url: '/game/splendor/card/1/diamond_1211.jpg'
    },
    {
        id: 'emerald_3',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_3.jpg'
    },
    {
        id: 'emerald_4',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_4.jpg'
    },
    {
        id: 'emerald_21',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_21.jpg'
    },
    {
        id: 'emerald_22',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_22.jpg'
    },
    {
        id: 'emerald_122',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_122.jpg'
    },
    {
        id: 'emerald_131',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_131.jpg'
    },
    {
        id: 'emerald_1111',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_1111.jpg'
    },
    {
        id: 'emerald_1112',
        type: CardGemType.EMERALD,
        level: 1,
        url: '/game/splendor/card/1/emerald_1112.jpg'
    },
    {
        id: 'onyx_3',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_3.jpg'
    },
    {
        id: 'onyx_4',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_4.jpg'
    },
    {
        id: 'onyx_21',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_21.jpg'
    },
    {
        id: 'onyx_22',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_22.jpg'
    },
    {
        id: 'onyx_221',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_221.jpg'
    },
    {
        id: 'onyx_131',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_131.jpg'
    },
    {
        id: 'onyx_1111',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_1111.jpg'
    },
    {
        id: 'onyx_1211',
        type: CardGemType.ONYX,
        level: 1,
        url: '/game/splendor/card/1/onyx_1211.jpg'
    },
    {
        id: 'ruby_3',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_3.jpg'
    },
    {
        id: 'ruby_21',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_21.jpg'
    },
    {
        id: 'ruby_22',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_22.jpg'
    },
    {
        id: 'ruby_113',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_113.jpg'
    },
    {
        id: 'ruby_212',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_212.jpg'
    },
    {
        id: 'ruby_1111',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_1111.jpg'
    },
    {
        id: 'ruby_2111',
        type: CardGemType.RUBY,
        level: 1,
        url: '/game/splendor/card/1/ruby_2111.jpg'
    },
    {
        id: 'sapphire_3',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_3.jpg'
    },
    {
        id: 'sapphire_4',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_4.jpg'
    },
    {
        id: 'sapphire_12',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_12.jpg'
    },
    {
        id: 'sapphire_22',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_22.jpg'
    },
    {
        id: 'sapphire_122',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_122.jpg'
    },
    {
        id: 'sapphire_131',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_131.jpg'
    },
    {
        id: 'sapphire_1111',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_1111.jpg'
    },
    {
        id: 'sapphire_1121',
        type: CardGemType.SAPPHIRE,
        level: 1,
        url: '/game/splendor/card/1/sapphire_1121.jpg'
    },
    {
        id: 'diamond_5',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_5.jpg'
    },
    {
        id: 'diamond_6',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_6.jpg'
    },
    {
        id: 'diamond_53',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_53.jpg'
    },
    {
        id: 'diamond_142',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_142.jpg'
    },
    {
        id: 'diamond_233',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_233.jpg'
    },
    {
        id: 'diamond_322',
        type: CardGemType.DIAMOND,
        level: 2,
        url: '/game/splendor/card/2/diamond_322.jpg'
    },
    {
        id: 'emerald_5',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_5.jpg'
    },
    {
        id: 'emerald_6',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_6.jpg'
    },
    {
        id: 'emerald_53',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_53.jpg'
    },
    {
        id: 'emerald_421',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_421.jpg'
    },
    {
        id: 'emerald_323',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_323.jpg'
    },
    {
        id: 'emerald_232',
        type: CardGemType.EMERALD,
        level: 2,
        url: '/game/splendor/card/2/emerald_232.jpg'
    },
    {
        id: 'onyx_5',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_5.jpg'
    },
    {
        id: 'onyx_6',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_6.jpg'
    },
    {
        id: 'onyx_53',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_53.jpg'
    },
    {
        id: 'onyx_142',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_142.jpg'
    },
    {
        id: 'onyx_332',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_332.jpg'
    },
    {
        id: 'onyx_322',
        type: CardGemType.ONYX,
        level: 2,
        url: '/game/splendor/card/2/onyx_322.jpg'
    },
    {
        id: 'ruby_5',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_5.jpg'
    },
    {
        id: 'ruby_6',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_6.jpg'
    },
    {
        id: 'ruby_35',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_35.jpg'
    },
    {
        id: 'ruby_142',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_142.jpg'
    },
    {
        id: 'ruby_223',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_223.jpg'
    },
    {
        id: 'ruby_323',
        type: CardGemType.RUBY,
        level: 2,
        url: '/game/splendor/card/2/ruby_323.jpg'
    },
    {
        id: 'sapphire_5',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_5.jpg'
    },
    {
        id: 'sapphire_6',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_6.jpg'
    },
    {
        id: 'sapphire_53',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_53.jpg'
    },
    {
        id: 'sapphire_214',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_214.jpg'
    },
    {
        id: 'sapphire_223',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_223.jpg'
    },
    {
        id: 'sapphire_233',
        type: CardGemType.SAPPHIRE,
        level: 2,
        url: '/game/splendor/card/2/sapphire_233.jpg'
    },
    {
        id: 'diamond_7',
        type: CardGemType.DIAMOND,
        level: 3,
        url: '/game/splendor/card/3/diamond_7.jpg'

    },
    {
        id: 'diamond_37',
        type: CardGemType.DIAMOND,
        level: 3,
        url: '/game/splendor/card/3/diamond_37.jpg'
    },
    {
        id: 'diamond_336',
        type: CardGemType.DIAMOND,
        level: 3,
        url: '/game/splendor/card/3/diamond_336.jpg'
    },
    {
        id: 'diamond_3353',
        type: CardGemType.DIAMOND,
        level: 3,
        url: '/game/splendor/card/3/diamond_3353.jpg'
    },
    {
        id: 'emerald_7',
        type: CardGemType.EMERALD,
        level: 3,
        url: '/game/splendor/card/3/emerald_7.jpg'
    },
    {
        id: 'emerald_73',
        type: CardGemType.EMERALD,
        level: 3,
        url: '/game/splendor/card/3/emerald_73.jpg'
    },
    {
        id: 'emerald_363',
        type: CardGemType.EMERALD,
        level: 3,
        url: '/game/splendor/card/3/emerald_363.jpg',
    },
    {
        id: 'emerald_5333',
        type: CardGemType.EMERALD,
        level: 3,
        url: '/game/splendor/card/3/emerald_5333.jpg'
    },
    {
        id: 'onyx_7',
        type: CardGemType.ONYX,
        level: 3,
        url: '/game/splendor/card/3/onyx_7.jpg'
    },
    {
        id: 'onyx_73',
        type: CardGemType.ONYX,
        level: 3,
        url: '/game/splendor/card/3/onyx_73.jpg'
    },
    {
        id: 'onyx_363',
        type: CardGemType.ONYX,
        level: 3,
        url: '/game/splendor/card/3/onyx_363.jpg'
    },
    {
        id: 'onyx_3353',
        type: CardGemType.ONYX,
        level: 3,
        url: '/game/splendor/card/3/onyx_3353.jpg'
    },
    {
        id: 'ruby_7',
        type: CardGemType.RUBY,
        level: 3,
        url: '/game/splendor/card/3/ruby_7.jpg'
    },
    {
        id: 'ruby_73',
        type: CardGemType.RUBY,
        level: 3,
        url: '/game/splendor/card/3/ruby_73.jpg'
    },
    {
        id: 'ruby_363',
        type: CardGemType.RUBY,
        level: 3,
        url: '/game/splendor/card/3/ruby_363.jpg'
    },
    {
        id: 'ruby_3533',
        type: CardGemType.RUBY,
        level: 3,
        url: '/game/splendor/card/3/ruby_3533.jpg'
    },
    {
        id: 'sapphire_7',
        type: CardGemType.SAPPHIRE,
        level: 3,
        url: '/game/splendor/card/3/sapphire_7.jpg'
    },
    {
        id: 'sapphire_73',
        type: CardGemType.SAPPHIRE,
        level: 3,
        url: '/game/splendor/card/3/sapphire_73.jpg'
    },
    {
        id: 'sapphire_633',
        type: CardGemType.SAPPHIRE,
        level: 3,
        url: '/game/splendor/card/3/sapphire_633.jpg'
    },
    {
        id: 'sapphire_3335',
        type: CardGemType.SAPPHIRE,
        level: 3,
        url: '/game/splendor/card/3/sapphire_3335.jpg'
    }
];

export const CardDictionary = Cards.reduce((dict: { [id: string] : ICardGemProps }, item) => {
    dict[item.id] = item;
    return dict
}, {})

