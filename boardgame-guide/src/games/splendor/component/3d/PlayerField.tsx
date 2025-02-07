import {
    TokenGemSize,
    TokenDiamond,
    TokenEmerald, TokenGold, TokenOnyx,
    TokenRuby,
    TokenSapphire
} from "@/games/splendor/component/3d/TokenGem";
import {
    PLAYER_CARD_POSITION,
    PLAYER_GEM_POSITION,
    PLAYER_NOBLE_POSITION,
    PLAYER_POSITION
} from "@/games/splendor/constants/game";
import {CardGemSize, CardGem} from "@/games/splendor/component/3d/CardGem";
import React from "react";
import {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";


interface IPlayerSpace {
    player_id: string
    gold: number
    diamond: number
    sapphire: number
    emerald: number
    ruby: number
    onyx: number
    card_diamond: ICardPlayerSpace[]
    card_sapphire: ICardPlayerSpace[]
    card_emerald: ICardPlayerSpace[]
    card_ruby: ICardPlayerSpace[]
    card_onyx: ICardPlayerSpace[]
    reserve_card: IReserveCardPlayerSpace[]
    noble: INoblePlayerSpace[]
}

interface ICardPlayerSpace {
    id: string
    level: number
    url: string
}

interface IReserveCardPlayerSpace {
    id: string
    level: number
    url: string
}

interface INoblePlayerSpace {
    id: string
    url: string
}

export function ListPlayerSpace({playersData}: {playersData: IPlayerSpace[]}) {
    return (
        <>
            {
                playersData.map((playerData: IPlayerSpace, index) => {
                    let position: [number, number, number];
                    let rotation: [number, number, number];
                    if (playersData.length == 2) {
                        switch (index) {
                            case 0:
                                position = [PLAYER_POSITION.player1.position.x, PLAYER_POSITION.player1.position.y, PLAYER_POSITION.player1.position.z]
                                rotation = [PLAYER_POSITION.player1.rotation.x, PLAYER_POSITION.player1.rotation.y, PLAYER_POSITION.player1.rotation.z]
                                break;
                            case 1:
                                position = [PLAYER_POSITION.player3.position.x, PLAYER_POSITION.player3.position.y, PLAYER_POSITION.player3.position.z]
                                rotation = [PLAYER_POSITION.player3.rotation.x, PLAYER_POSITION.player3.rotation.y, PLAYER_POSITION.player3.rotation.z]
                                break;
                            default:
                                position = [0, 0, 0]
                                rotation = [0, 0, 0]
                                break;
                        }
                    } else {
                        switch (index) {
                            case 0:
                                position = [PLAYER_POSITION.player1.position.x, PLAYER_POSITION.player1.position.y, PLAYER_POSITION.player1.position.z]
                                rotation = [PLAYER_POSITION.player1.rotation.x, PLAYER_POSITION.player1.rotation.y, PLAYER_POSITION.player1.rotation.z]
                                break;
                            case 1:
                                position = [PLAYER_POSITION.player2.position.x, PLAYER_POSITION.player2.position.y, PLAYER_POSITION.player2.position.z]
                                rotation = [PLAYER_POSITION.player2.rotation.x, PLAYER_POSITION.player2.rotation.y, PLAYER_POSITION.player2.rotation.z]
                                break;
                            case 2:
                                position = [PLAYER_POSITION.player3.position.x, PLAYER_POSITION.player3.position.y, PLAYER_POSITION.player3.position.z]
                                rotation = [PLAYER_POSITION.player3.rotation.x, PLAYER_POSITION.player3.rotation.y, PLAYER_POSITION.player3.rotation.z]
                                break;
                            case 3:
                                position = [PLAYER_POSITION.player4.position.x, PLAYER_POSITION.player4.position.y, PLAYER_POSITION.player4.position.z]
                                rotation = [PLAYER_POSITION.player4.rotation.x, PLAYER_POSITION.player4.rotation.y, PLAYER_POSITION.player4.rotation.z]
                                break;
                            default:
                                position = [0, 0, 0]
                                rotation = [0, 0, 0]
                                break;
                        }
                    }

                    return (<PlayerField key={playerData.player_id} playerData={playerData} position={position} rotation={rotation} />)
                })
            }
        </>
    )
}

export function PlayerField({playerData, position, rotation}: {playerData: IPlayerSpace, position: [number, number, number], rotation: [number, number, number]}) {
    return (
        <group position={position} rotation={rotation}>
            <group>
                {
                    Array.from({length: playerData.gold}, (_, i) => i)
                        .map(index => {
                            return (
                                <TokenGold key={`gold-${index}`}
                                           position={[PLAYER_GEM_POSITION.gold.x, PLAYER_GEM_POSITION.gold.y, PLAYER_GEM_POSITION.gold.z + index * TokenGemSize.depth]}/>
                            )
                        })
                }
                {
                    Array.from({length: playerData.diamond}, (_, i) => i)
                        .map(index => {
                            return (
                                <TokenDiamond key={`diamond-${index}`}
                                              position={[PLAYER_GEM_POSITION.diamond.x, PLAYER_GEM_POSITION.diamond.y, PLAYER_GEM_POSITION.diamond.z + index * TokenGemSize.depth]}/>
                            )
                        })
                }
                {
                    Array.from({length: playerData.sapphire}, (_, i) => i)
                        .map(index => {
                            return (
                                <TokenSapphire key={`sapphire-${index}`}
                                               position={[PLAYER_GEM_POSITION.sapphire.x, PLAYER_GEM_POSITION.sapphire.y, PLAYER_GEM_POSITION.sapphire.z + index * TokenGemSize.depth]}/>
                            )
                        })
                }
                {
                    Array.from({length: playerData.emerald}, (_, i) => i)
                        .map(index => {
                            return (<TokenEmerald key={`emerald-${index}`}
                                                  position={[PLAYER_GEM_POSITION.emerald.x, PLAYER_GEM_POSITION.emerald.y, PLAYER_GEM_POSITION.emerald.z + index * TokenGemSize.depth]}/>)
                        })
                }
                {
                    Array.from({length: playerData.ruby}, (_, i) => i)
                        .map(index => {
                            return (
                                <TokenRuby key={`ruby-${index}`}
                                           position={[PLAYER_GEM_POSITION.ruby.x, PLAYER_GEM_POSITION.ruby.y, PLAYER_GEM_POSITION.ruby.z + index * TokenGemSize.depth]}/>
                            )
                        })
                }
                {
                    Array.from({length: playerData.onyx}, (_, i) => i)
                        .map(index => {
                            return (
                                <TokenOnyx key={`onyx-${index}`}
                                           position={[PLAYER_GEM_POSITION.onyx.x, PLAYER_GEM_POSITION.onyx.y, PLAYER_GEM_POSITION.onyx.z + index * TokenGemSize.depth]}/>
                            )
                        })
                }
            </group>
            <group>
                {
                    playerData.card_diamond
                        .map((card, index) => {
                            switch (card.level) {
                                case 1:
                                    return (
                                        <CardGem key={card.id}
                                                 url={card.url}
                                                 position={[PLAYER_CARD_POSITION.diamond.x, PLAYER_CARD_POSITION.diamond.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.diamond.z + (playerData.card_diamond.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 2:
                                    return (
                                        <CardGem key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.diamond.x, PLAYER_CARD_POSITION.diamond.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.diamond.z + (playerData.card_diamond.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 3:
                                    return (
                                        <CardGem key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.diamond.x, PLAYER_CARD_POSITION.diamond.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.diamond.z + (playerData.card_diamond.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                default:
                                    return <></>
                            }
                        })
                }
                {
                    playerData.card_sapphire
                        .map((card, index) => {
                            switch (card.level) {
                                case 1:
                                    return (
                                        <CardGem key={card.id}
                                                 url={card.url}
                                                 position={[PLAYER_CARD_POSITION.sapphire.x, PLAYER_CARD_POSITION.sapphire.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.sapphire.z + (playerData.card_sapphire.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 2:
                                    return (
                                        <CardGemLevel2 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.sapphire.x, PLAYER_CARD_POSITION.sapphire.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.sapphire.z + (playerData.card_sapphire.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 3:
                                    return (
                                        <CardGemLevel3 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.sapphire.x, PLAYER_CARD_POSITION.sapphire.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.sapphire.z + (playerData.card_sapphire.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                default:
                                    return <></>
                            }

                        })
                }
                {
                    playerData.card_emerald
                        .map((card, index) => {
                            switch (card.level) {
                                case 1:
                                    return (
                                        <CardGem key={card.id}
                                                 url={card.url}
                                                 position={[PLAYER_CARD_POSITION.emerald.x, PLAYER_CARD_POSITION.emerald.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.emerald.z + (playerData.card_emerald.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 2:
                                    return (
                                        <CardGemLevel2 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.emerald.x, PLAYER_CARD_POSITION.emerald.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.emerald.z + (playerData.card_emerald.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 3:
                                    return (
                                        <CardGemLevel3 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.emerald.x, PLAYER_CARD_POSITION.emerald.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.emerald.z + (playerData.card_emerald.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                default:
                                    return <></>
                            }
                        })
                }
                {
                    playerData.card_ruby
                        .map((card, index) => {
                            switch (card.level) {
                                case 1:
                                    return (
                                        <CardGem key={card.id}
                                                 url={card.url}
                                                 position={[PLAYER_CARD_POSITION.ruby.x, PLAYER_CARD_POSITION.ruby.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.ruby.z + (playerData.card_ruby.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 2:
                                    return (
                                        <CardGemLevel2 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.ruby.x, PLAYER_CARD_POSITION.ruby.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.ruby.z + (playerData.card_ruby.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 3:
                                    return (
                                        <CardGemLevel3 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.ruby.x, PLAYER_CARD_POSITION.ruby.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.ruby.z + (playerData.card_ruby.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                default:
                                    return <></>
                            }
                        })
                }
                {
                    playerData.card_onyx
                        .map((card, index) => {
                            switch (card.level) {
                                case 1:
                                    return (
                                        <CardGem key={card.id}
                                                 url={card.url}
                                                 position={[PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z + (playerData.card_onyx.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 2:
                                    return (
                                        <CardGemLevel2 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z + (playerData.card_onyx.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                case 3:
                                    return (
                                        <CardGemLevel3 key={card.id}
                                                       url={card.url}
                                                       position={[PLAYER_CARD_POSITION.onyx.x, PLAYER_CARD_POSITION.onyx.y + PLAYER_CARD_POSITION.distance, PLAYER_CARD_POSITION.onyx.z + (playerData.card_onyx.length - 1 - index) * CardGemSize.depth]} />
                                    )
                                default:
                                    return <></>
                            }
                        })
                }
            </group>
            <group>
                {
                    playerData.noble.map((noble, index) => {
                        return (
                            <CardNoble key={noble.id}
                                       url={noble.url}
                                       position={[PLAYER_NOBLE_POSITION.position.x, PLAYER_NOBLE_POSITION.position.y + index * (CardNobleSize.width + PLAYER_NOBLE_POSITION.distance), PLAYER_NOBLE_POSITION.position.z]}
                                       rotation={[0, 0, 0]}/>
                        )
                    })
                }
            </group>
        </group>
    )
}