import GemToken, {GemTokenSize} from "@/games/splendor/component/3d/GemToken";
import GemCard, {GemCardSize} from "@/games/splendor/component/3d/GemCard";
import React, {memo, useEffect} from "react";
import {TokenGemType} from "@/games/splendor/types/gem";
import {useGameSplendor} from "@/games/splendor/store/game";
import {CardVO, NobleVO} from "@/games/splendor/service/splendor.service";
import {CardDictionary} from "@/games/splendor/constants/card";
import {CardGemType} from "@/games/splendor/types/card";
import {useSharedRef} from "@/games/splendor/store/ref";
import NobleCard, {NobleCardSize} from "@/games/splendor/component/3d/NobleCard";
import {
    PlayerPosition
} from "@/games/splendor/constants/game";
import {Euler, Vector3} from "three";
import {NobleDictionary} from "@/games/splendor/constants/noble";
import {generateUUID} from "@/utils";
import {GemDiamond, GemEmerald, GemGold, GemOnyx, GemRuby, GemSapphire} from "@/games/splendor/constants/gem";
import {Card, Gem} from "@/games/splendor/types/game";


interface PlayerBoardProps {
    playerId: string
    playerData: {[key: string]: any}
    position: [number, number, number]
    rotation: [number, number, number]
    onClickGem?: (gem: Gem) => void
    onClickReserveCard?: (card: Card) => void
}

const PlayerBoard = ({playerId, playerData, position, rotation, onClickGem, onClickReserveCard} : PlayerBoardProps) => {
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        setPlayers,
        playerCards, setPlayerCards,
        playerReserveCards, setPlayerReserveCards,
        playerNobles, setPlayerNobles,
        playerGems, setPlayerGems
    } = useGameSplendor()


    useEffect(() => {
        if (!playerData) return

        const vector = new Vector3().fromArray(position)
        const euler = new Euler(rotation[0], rotation[1], rotation[2])

        //
        setPlayers(prevState => ({
            ...prevState,
            [playerId]: {
                id: playerId,
                name: playerId,
                avatar: playerId,
                score: playerData.score
            }
        }))

        // Gem
        {
            const goldPosition = new Vector3().fromArray(PlayerPosition.gold)
                .add(vector)
                .applyEuler(euler)
            const diamondPosition = new Vector3().fromArray(PlayerPosition.diamond)
                .add(vector)
                .applyEuler(euler)
            const sapphirePosition = new Vector3().fromArray(PlayerPosition.sapphire)
                .add(vector)
                .applyEuler(euler)
            const rubyPosition = new Vector3().fromArray(PlayerPosition.ruby)
                .add(vector)
                .applyEuler(euler)
            const emeraldPosition = new Vector3().fromArray(PlayerPosition.emerald)
                .add(vector)
                .applyEuler(euler)
            const onyxPosition = new Vector3().fromArray(PlayerPosition.onyx)
                .add(vector)
                .applyEuler(euler)
            setPlayerGems((prevState) => ({
                ...prevState,
                [playerId]: ({
                    [TokenGemType.GOLD]: Array.from({length: playerData.gold ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemGold,
                                id: generateUUID(),
                                owner: playerId,
                                position: [goldPosition.x, goldPosition.y, index * GemTokenSize.depth + goldPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.DIAMOND]: Array.from({length: playerData.diamond ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemDiamond,
                                id: generateUUID(),
                                owner: playerId,
                                position: [diamondPosition.x, diamondPosition.y, index * GemTokenSize.depth + diamondPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.SAPPHIRE]: Array.from({length: playerData.sapphire ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemSapphire,
                                id: generateUUID(),
                                owner: playerId,
                                position: [sapphirePosition.x, sapphirePosition.y, index * GemTokenSize.depth + sapphirePosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.EMERALD]: Array.from({length: playerData.emerald ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemEmerald,
                                id: generateUUID(),
                                owner: playerId,
                                position: [emeraldPosition.x, emeraldPosition.y, index * GemTokenSize.depth + emeraldPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.RUBY]: Array.from({length: playerData.ruby ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemRuby,
                                id: generateUUID(),
                                owner: playerId,
                                position: [rubyPosition.x, rubyPosition.y, index * GemTokenSize.depth + rubyPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.ONYX]: Array.from({length: playerData.onyx ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                ...GemOnyx,
                                id: generateUUID(),
                                owner: playerId,
                                position: [onyxPosition.x, onyxPosition.y, index * GemTokenSize.depth + onyxPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        })
                })
            }))
        }
        // Card
        {
            if (playerData.cards) {
                const diamondCardPosition = new Vector3().fromArray(PlayerPosition.diamond)
                    .add(vector)
                    .applyEuler(euler)
                const sapphireCardPosition = new Vector3().fromArray(PlayerPosition.sapphire)
                    .add(vector)
                    .applyEuler(euler)
                const emeraldCardPosition = new Vector3().fromArray(PlayerPosition.emerald)
                    .add(vector)
                    .applyEuler(euler)
                const rubyCardPosition = new Vector3().fromArray(PlayerPosition.ruby)
                    .add(vector)
                    .applyEuler(euler)
                const onyxCardPosition = new Vector3().fromArray(PlayerPosition.onyx)
                    .add(vector)
                    .applyEuler(euler)
                setPlayerCards((prevState) => ({
                    ...prevState,
                    [playerId]: [
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.DIAMOND)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [diamondCardPosition.x, index * PlayerPosition.distance + diamondCardPosition.y, 0.1 - index * GemCardSize.depth + diamondCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [sapphireCardPosition.x, index * PlayerPosition.distance + sapphireCardPosition.y, 0.1 - index * GemCardSize.depth + sapphireCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.EMERALD)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [emeraldCardPosition.x, index * PlayerPosition.distance + emeraldCardPosition.y, 0.1 - index * GemCardSize.depth + emeraldCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.RUBY)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [rubyCardPosition.x, index * PlayerPosition.distance + rubyCardPosition.y, 0.1 - index * GemCardSize.depth + rubyCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.ONYX)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [onyxCardPosition.x, index * PlayerPosition.distance + onyxCardPosition.y, 0.1 - index * GemCardSize.depth + onyxCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            }))
                    ]
                }))
            }
        }
        // Reserve Card
        if (playerData.reserve_cards) {
            const reserveCardPosition = new Vector3().fromArray(PlayerPosition.reserveCard)
                .add(vector)
                .applyEuler(euler)
            setPlayerReserveCards((prevState) => ({
                ...prevState,
                [playerId]: playerData.reserve_cards?.map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [index * (GemCardSize.width + 0.1) + reserveCardPosition.x, reserveCardPosition.y, index * GemCardSize.depth + reserveCardPosition.z],
                    rotation: [euler.x, Math.PI + euler.y, euler.z]
                })) ?? []
            }))
        }
        // Noble
        if (playerData.nobles) {
            const noblePosition = new Vector3().fromArray(PlayerPosition.noble)
                .add(vector)
                .applyEuler(euler)
            setPlayerNobles((prevState) => ({
                ...prevState,
                [playerId]: playerData.nobles?.map((noble: NobleVO, index: number)=> ({
                    ...noble,
                    ...NobleDictionary[noble.id ?? ''],
                    position: [index * PlayerPosition.distance + noblePosition.x, noblePosition.y, index * NobleCardSize.depth + noblePosition.z + 0.2],
                    rotation: [euler.x, euler.y, euler.z]
                })) ?? []
            }))
        }

    }, [playerId, playerData, position, rotation]);


    return (
        <group>
            <group>
                {playerGems[playerId]?.diamond.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={TokenGemType.DIAMOND}
                              onClick={() => onClickGem?.(gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.DIAMOND)
                    .map((card) => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {playerGems[playerId]?.sapphire.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={TokenGemType.SAPPHIRE}
                              onClick={() => onClickGem?.(gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                    .map((card) => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {playerGems[playerId]?.emerald.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={TokenGemType.EMERALD}
                              onClick={() => onClickGem?.(gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.EMERALD)
                    .map((card) => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {playerGems[playerId]?.ruby.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={TokenGemType.RUBY}
                              onClick={() => onClickGem?.(gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.RUBY)
                    .map((card) => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>
            <group>
                {playerGems[playerId]?.onyx.map((gem) => (
                    <GemToken key={gem.id}
                              id={gem.id}
                              type={TokenGemType.ONYX}
                              onClick={() => onClickGem?.(gem)}
                              position={gem.position}
                              rotation={gem.rotation}
                              ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.ONYX)
                    .map((card) => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>

            {playerGems[playerId]?.gold.map(gem => (
                <GemToken key={gem.id}
                          id={gem.id}
                          type={TokenGemType.GOLD}
                          onClick={() => onClickGem?.(gem)}
                          position={gem.position}
                          rotation={gem.rotation}
                          ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
            ))}

            {playerReserveCards[playerId]?.map(card => (
                <GemCard key={card.id}
                         id={card.id}
                         level={card.level}
                         url={card.url}
                         onClick={() => onClickReserveCard?.(card)}
                         position={card.position}
                         rotation={card.rotation}
                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
            ))}

            {playerNobles[playerId]?.map((noble) => (
                <NobleCard key={noble.id}
                           id={noble.id}
                           url={noble.url}
                           position={noble.position}
                           rotation={noble.rotation}
                           ref={(element: any) => nobleRefs.current[noble.id] = element}/>
            ))}
        </group>
    )
}

export default memo(PlayerBoard)