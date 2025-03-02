import TokenGem, {TokenGemSize,} from "@/games/splendor/component/3d/TokenGem";
import {PlayerPosition} from "@/games/splendor/constants/game";
import CardGem, {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import React, {useEffect, useState} from "react";
import {TokenGemType} from "@/games/splendor/constants/gem";
import {Card, Gem, Noble, useGameSplendor} from "@/games/splendor/store/game";
import {CardVO, NobleVO} from "@/games/splendor/service/splendor.service";
import {CardDictionary, CardGemType} from "@/games/splendor/constants/card";
import {useSharedRef} from "@/games/splendor/store/ref";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import CardNoble, {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";


interface PlayerFieldProps {
    id: string
    position: [number, number, number]
    rotation: [number, number, number]
    data: any
}

const PlayerField = ({id, position, rotation, data} : PlayerFieldProps) => {
    const {
        setPlayerCards,
        setPlayerReserveCards,
        setPlayerNobles,
        setPlayerGolds,
        setPlayerDiamonds,
        setPlayerSapphires,
        setPlayerEmeralds,
        setPlayerRubies,
        setPlayerOnyxes
    } = useGameSplendor()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const [golds, setGolds] = useState<Gem[]>([])
    const [diamondCards, setDiamondCards] = useState<Card[]>([])
    const [diamonds, setDiamonds] = useState<Gem[]>([])
    const [sapphireCards, setSapphireCards] = useState<Card[]>([])
    const [sapphires, setSapphires] = useState<Gem[]>([])
    const [emeraldCards, setEmeraldCards] = useState<Card[]>([])
    const [emeralds, setEmeralds] = useState<Gem[]>([])
    const [rubyCards, setRubyCards] = useState<Card[]>([])
    const [rubies, setRubies] = useState<Gem[]>([])
    const [onyxCards, setOnyxCards] = useState<Card[]>([])
    const [onyxes, setOnyxes] = useState<Gem[]>([])
    const [reserveCards, setReserveCards] = useState<Card[]>([])
    const [nobles, setNobles] = useState<Noble[]>([])

    
    // Update state
    useEffect(() => {
        // Gem
        {
            // Gold
            const tmpGolds: Gem[] = Array.from({length: data.gold}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.gold[0], PlayerPosition.gold[1], index * TokenGemSize.depth + PlayerPosition.gold[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setGolds(tmpGolds)
            setPlayerGolds((prevState) => ({
                ...prevState,
                [id]: tmpGolds
            }))

            // Diamond
            const tmpDiamonds: Gem[] = Array.from({length: data.diamond}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.diamond[0], PlayerPosition.diamond[1], index * TokenGemSize.depth + PlayerPosition.diamond[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setDiamonds(tmpDiamonds)
            setPlayerDiamonds((prevState) => ({
                ...prevState,
                [id]: tmpDiamonds
            }))

            // Sapphire
            const tmpSapphires: Gem[] = Array.from({length: data.sapphire}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.sapphire[0], PlayerPosition.sapphire[1], index * TokenGemSize.depth + PlayerPosition.sapphire[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setSapphires(tmpSapphires)
            setPlayerSapphires((prevState) => ({
                ...prevState,
                [id]: tmpSapphires
            }))

            // Emerald
            const tmpEmeralds: Gem[] = Array.from({length: data.emerald}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.emerald[0], PlayerPosition.emerald[1], index * TokenGemSize.depth + PlayerPosition.emerald[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setEmeralds(tmpEmeralds)
            setPlayerEmeralds((prevState) => ({
                ...prevState,
                [id]: tmpEmeralds
            }))

            // Ruby
            const tmpRubies: Gem[] = Array.from({length: data.ruby}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.ruby[0], PlayerPosition.ruby[1], index * TokenGemSize.depth + PlayerPosition.ruby[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setRubies(tmpRubies)
            setPlayerRubies((prevState) => ({
                ...prevState,
                [id]: tmpRubies
            }))

            // Onyx
            const tmpOnyxes: Gem[] = Array.from({length: data.onyx}, (_, i) => i)
                .map((index) => {
                    return {
                        id: crypto.randomUUID(),
                        owner: id,
                        position: [PlayerPosition.onyx[0], PlayerPosition.onyx[1], index * TokenGemSize.depth + PlayerPosition.onyx[2] + 0.2],
                        rotation: [0, 0, 0]
                    }
                })
            setOnyxes(tmpOnyxes)
            setPlayerOnyxes((prevState) => ({
                ...prevState,
                [id]: tmpOnyxes
            }))
        }
        // Card
        {
            const tmpDiamondCards = data.cards.filter((card: CardVO) => card.type == CardGemType.DIAMOND)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [PlayerPosition.diamond[0], index * PlayerPosition.distance + PlayerPosition.diamond[1], 0.1 - index * CardGemSize.depth + PlayerPosition.diamond[2]],
                    rotation: [0, 0, 0]
                }))
            const tmpSapphireCards = data.cards.filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [PlayerPosition.sapphire[0], index * PlayerPosition.distance + PlayerPosition.sapphire[1], 0.1 - index * CardGemSize.depth + PlayerPosition.sapphire[2]],
                    rotation: [0, 0, 0]
                }))
            const tmpEmeraldCards = data.cards.filter((card: CardVO) => card.type == CardGemType.EMERALD)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [PlayerPosition.emerald[0], index * PlayerPosition.distance + PlayerPosition.emerald[1], 0.1 - index * CardGemSize.depth + PlayerPosition.emerald[2]],
                    rotation: [0, 0, 0]
                }))
            const tmpRubyCards = data.cards.filter((card: CardVO) => card.type == CardGemType.RUBY)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [PlayerPosition.ruby[0], index * PlayerPosition.distance + PlayerPosition.ruby[1], 0.1 - index * CardGemSize.depth + PlayerPosition.ruby[2]],
                    rotation: [0, 0, 0]
                }))
            const tmpOnyxCards = data.cards.filter((card: CardVO) => card.type == CardGemType.ONYX)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [PlayerPosition.onyx[0], index * PlayerPosition.distance + PlayerPosition.onyx[1], 0.1 - index * CardGemSize.depth + PlayerPosition.onyx[2]],
                    rotation: [0, 0, 0]
                }))
            setDiamondCards(tmpDiamondCards)
            setSapphireCards(tmpSapphireCards)
            setEmeraldCards(tmpEmeraldCards)
            setRubyCards(tmpRubyCards)
            setOnyxCards(tmpOnyxCards)
            setPlayerCards((prevState) => ({
                ...prevState,
                [id]: [...tmpDiamondCards, ...tmpSapphireCards, ...tmpEmeraldCards, ...tmpRubyCards, ...tmpOnyxCards]
            }))
        }

        // Reserve Card
        const tmpCards = data.reserve_cards.map((card: CardVO, index: number) => ({
            ...card,
            ...CardDictionary[card?.id || ''],
            position: [index * PlayerPosition.distance + PlayerPosition.reserveCard[0], PlayerPosition.reserveCard[1], index * CardGemSize.depth * PlayerPosition.reserveCard[2]],
            rotation: [0, Math.PI, 0]
        }))
        setReserveCards(tmpCards)
        setPlayerReserveCards((prevState) => ({
            ...prevState, [id]: tmpCards
        }))

        // Noble
        const tmpNobles = data.nobles.map((noble: NobleVO, index: number)=> ({
            ...noble,
            ...NobleDictionary[noble.id ?? ''],
            position: [index * PlayerPosition.distance + PlayerPosition.noble[0], PlayerPosition.noble[1], index * CardNobleSize.depth + PlayerPosition.noble[2] + 0.2],
            rotation: [0, 0, 0]
        }))
        setNobles(tmpNobles)
        setPlayerNobles((prevState) => ({
            ...prevState,
            [id]: [...tmpNobles]
        }))

    }, []);

    return (
        <group position={position} rotation={rotation}>
            <group>
                {diamonds.map((diamond) => (
                    <TokenGem key={diamond.id}
                              id={diamond.id}
                              type={TokenGemType.DIAMOND}
                              position={diamond.position}
                              parentRotation={rotation}
                              ref={(element: any) => (gemRefs.current[diamond.id] = element)}/>
                ))}
                {diamondCards.map((card) => (
                    <CardGem key={card.id}
                             id={card.id}
                             level={card.level}
                             url={card.url}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {sapphires.map((sapphire) => (
                    <TokenGem key={sapphire.id}
                              id={sapphire.id}
                              type={TokenGemType.SAPPHIRE}
                              position={sapphire.position}
                              parentRotation={rotation}
                              ref={(element: any) => (gemRefs.current[sapphire.id] = element)}/>
                ))}
                {sapphireCards.map((card) => (
                    <CardGem key={card.id}
                             id={card.id}
                             level={card.level}
                             url={card.url}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {emeralds.map((emerald) => (
                    <TokenGem key={emerald.id}
                              id={emerald.id}
                              type={TokenGemType.EMERALD}
                              position={emerald.position}
                              parentRotation={rotation}
                              ref={(element: any) => (gemRefs.current[emerald.id] = element)}/>
                ))}
                {emeraldCards.map((card) => (
                    <CardGem key={card.id}
                             id={card.id}
                             level={card.level}
                             url={card.url}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {rubies.map((ruby) => (
                    <TokenGem key={ruby.id}
                              id={ruby.id}
                              type={TokenGemType.RUBY}
                              position={ruby.position}
                              parentRotation={rotation}
                              ref={(element: any) => (gemRefs.current[ruby.id] = element)}/>
                ))}
                {rubyCards.map((card) => (
                    <CardGem key={card.id}
                             id={card.id}
                             level={card.level}
                             url={card.url}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {onyxes.map((onyx) => (
                    <TokenGem key={onyx.id}
                              id={onyx.id}
                              type={TokenGemType.ONYX}
                              position={onyx.position}
                              parentRotation={rotation}
                              ref={(element: any) => (gemRefs.current[onyx.id] = element)}/>
                ))}
                {onyxCards.map((card) => (
                    <CardGem key={card.id}
                             id={card.id}
                             level={card.level}
                             url={card.url}
                             position={card.position}
                             rotation={card.rotation}
                             ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>

            {golds.map(gold => (
                <TokenGem key={gold.id}
                          id={gold.id}
                          type={TokenGemType.GOLD}
                          position={gold.position}
                          parentRotation={rotation}
                          ref={(element: any) => (gemRefs.current[gold.id] = element)}/>
            ))}

            {reserveCards.map(card => (
                <CardGem key={card.id}
                         id={card.id}
                         level={card.level}
                         url={card.url}
                         position={card.position}
                         rotation={card.rotation}
                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
            ))}

            {nobles.map((noble) => (
                <CardNoble key={noble.id}
                           id={noble.id}
                           url={noble.url}
                           position={noble.position}
                           rotation={noble.rotation}
                           ref={(element: any) => nobleRefs.current[noble.id] = element}/>
            ))}
        </group>
    )
}

export default PlayerField;