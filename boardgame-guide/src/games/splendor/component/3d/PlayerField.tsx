import TokenGem, {TokenGemSize} from "@/games/splendor/component/3d/TokenGem";
import CardGem, {CardGemSize} from "@/games/splendor/component/3d/CardGem";
import React, {useCallback, useEffect} from "react";
import {TokenGemType} from "@/games/splendor/constants/gem";
import {Gem, useGameSplendor} from "@/games/splendor/store/game";
import {CardVO, NobleVO} from "@/games/splendor/service/splendor.service";
import {CardDictionary, CardGemType} from "@/games/splendor/constants/card";
import {useSharedRef} from "@/games/splendor/store/ref";
import CardNoble, {CardNobleSize} from "@/games/splendor/component/3d/CardNoble";
import {useUser} from "@/store/user";
import {useGameAction} from "@/games/splendor/store/action";
import {
    DiamondPosition,
    EmeraldPosition, GoldPosition, OnyxPosition, PlayerPosition,
    RubyPosition,
    SapphirePosition
} from "@/games/splendor/constants/game";
import {Euler, MathUtils, Vector3} from "three";
import gsap from "gsap";
import {NobleDictionary} from "@/games/splendor/constants/noble";


interface PlayerFieldProps {
    playerId: string
    playerData: {[key: string]: any}
    position: [number, number, number]
    rotation: [number, number, number]
}

const PlayerField = ({playerId, playerData, position, rotation} : PlayerFieldProps) => {
    const {user} = useUser()
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        playerIds,
        gems, setGems,
        setPlayers,
        playerCards, setPlayerCards,
        playerReserveCards, setPlayerReserveCards,
        playerNobles, setPlayerNobles,
        playerGems, setPlayerGems,
        isMyTurn
    } = useGameSplendor()
    const {
        currentAction, setCurrentAction,
        selectedGems, setSelectedGems
    } = useGameAction()


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
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [goldPosition.x, goldPosition.y, index * TokenGemSize.depth + goldPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.DIAMOND]: Array.from({length: playerData.diamond ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [diamondPosition.x, diamondPosition.y, index * TokenGemSize.depth + diamondPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.SAPPHIRE]: Array.from({length: playerData.sapphire ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [sapphirePosition.x, sapphirePosition.y, index * TokenGemSize.depth + sapphirePosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.EMERALD]: Array.from({length: playerData.emerald ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [emeraldPosition.x, emeraldPosition.y, index * TokenGemSize.depth + emeraldPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.RUBY]: Array.from({length: playerData.ruby ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [rubyPosition.x, rubyPosition.y, index * TokenGemSize.depth + rubyPosition.z + 0.2],
                                rotation: [euler.x, euler.y, euler.z]
                            }
                        }),
                    [TokenGemType.ONYX]: Array.from({length: playerData.onyx ?? 0}, (_, i) => i)
                        .map((index) => {
                            return {
                                id: crypto.randomUUID(),
                                owner: playerId,
                                position: [onyxPosition.x, onyxPosition.y, index * TokenGemSize.depth + onyxPosition.z + 0.2],
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
                                position: [diamondCardPosition.x, index * PlayerPosition.distance + diamondCardPosition.y, 0.1 - index * CardGemSize.depth + diamondCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [sapphireCardPosition.x, index * PlayerPosition.distance + sapphireCardPosition.y, 0.1 - index * CardGemSize.depth + sapphireCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.EMERALD)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [emeraldCardPosition.x, index * PlayerPosition.distance + emeraldCardPosition.y, 0.1 - index * CardGemSize.depth + emeraldCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.RUBY)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [rubyCardPosition.x, index * PlayerPosition.distance + rubyCardPosition.y, 0.1 - index * CardGemSize.depth + rubyCardPosition.z],
                                rotation: [euler.x, euler.y, euler.z]
                            })),
                        ...playerData.cards.filter((card: CardVO) => card.type == CardGemType.ONYX)
                            .map((card: CardVO, index: number) => ({
                                ...card,
                                ...CardDictionary[card?.id || ''],
                                position: [onyxCardPosition.x, index * PlayerPosition.distance + onyxCardPosition.y, 0.1 - index * CardGemSize.depth + onyxCardPosition.z],
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
                    position: [index * PlayerPosition.distance + reserveCardPosition.x, reserveCardPosition.y, index * CardGemSize.depth * reserveCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
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
                    position: [index * PlayerPosition.distance + noblePosition.x, noblePosition.y, index * CardNobleSize.depth + noblePosition.z + 0.2],
                    rotation: [euler.x, euler.y, euler.z]
                })) ?? []
            }))
        }

    }, []);


    const onClickGem = useCallback((type: TokenGemType) => {
        if (user?.user_id != playerId) return
        if (!isMyTurn) return
        if (!currentAction) return
        if (currentAction && currentAction.type != "gather-gem") return

        //
        const player = (playerIds.indexOf(playerId) ?? 0) + 1
        if (player == 0) return         // Không phải người chơi
        const playerLocate = PlayerPosition.total[playerIds.length ?? 0]?.player[player]
        if (!playerLocate) return       // Ko tim thay config vi tri player

        const deckGems: Gem[] = gems[type]
        const playerDeckGems: Gem[] = playerGems[playerId][type]
        let gemPosition: Vector3
        switch (type) {
            case TokenGemType.DIAMOND:
                gemPosition = new Vector3().fromArray(DiamondPosition.desk)
                break
            case TokenGemType.SAPPHIRE:
                gemPosition = new Vector3().fromArray(SapphirePosition.desk)
                break
            case TokenGemType.EMERALD:
                gemPosition = new Vector3().fromArray(EmeraldPosition.desk)
                break
            case TokenGemType.RUBY:
                gemPosition = new Vector3().fromArray(RubyPosition.desk)
                break
            case TokenGemType.ONYX:
                gemPosition = new Vector3().fromArray(OnyxPosition.desk)
                break
            case TokenGemType.GOLD:
                gemPosition = new Vector3().fromArray(GoldPosition.desk)
                break
        }
        if (playerDeckGems.length <= 0) return
        let gemReturn: Gem = playerDeckGems[playerDeckGems.length - 1]
        for (let i = playerDeckGems.length - 1; i >= 0; i--) {
            if (!currentAction?.gem?.some(gem => gem.id == gemReturn.id && gem.count < 0)) {
                break
            }

            gemReturn = deckGems[i]
        }

        // Update action if in turn
        if (currentAction.gem?.some(gem => gem.id == gemReturn.id)) {
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: prevState?.gem?.filter(gem => gem.id != gemReturn?.id)
            }))
        } else {
            setCurrentAction((prevState) => ({
                type: "gather-gem",
                gem: [...(prevState?.gem || []), {
                    id: gemReturn.id,
                    type: type,
                    count: -1
                }]
            }))
        }

        const instance = gemRefs.current[gemReturn.id]

        // Stop physics
        instance.stopPhysics()

        // Animation
        const startPosition = instance.position.clone()
        const startRotation = instance.rotation.clone()
        const targetPosition = gemPosition
            .setZ((deckGems.length - 1 + 0.5) * TokenGemSize.depth)
        const arcHeight = 1.5 // Adjust this value for a bigger/smaller arc
        const animation = gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                duration: 0.4,
                onUpdate: function () {
                    const progress = this.progress() // Progress from 0 → 1
                    instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
                }
            }, "0.1")
        animation
            .then(() => {
                // Start physics
                instance.startPhysics()

                // Update state
                setGems((prevState) => ({
                    ...prevState,
                    [type]: [
                        ...prevState[type],
                        {
                            id: gemReturn.id,
                            position: targetPosition.toArray(),
                            rotation: gemReturn.rotation
                        }
                    ]
                }))
                setPlayerGems((prevState) => ({
                    ...prevState,
                    [playerId]: ({
                        ...prevState[playerId],
                        [type]: prevState[playerId][type].filter(gem => gem.id != gemReturn.id)
                    })
                }))
            })
        if (selectedGems.some(selectedGem => selectedGem.id == gemReturn.id)) {
            setSelectedGems((prevState) => prevState.filter(gem => gem.id != gemReturn.id))
        } else {
            setSelectedGems((prevState) => [...prevState, {
                id: gemReturn.id,
                type: type,
                owner: playerId,
                oldPosition: startPosition,
                oldRotation: startRotation
            }])
        }
    }, [playerId, user, playerIds, currentAction, gems, playerGems, selectedGems])


    return (
        <group>
            <group>
                {playerGems[playerId]?.diamond.map((diamond) => (
                    <TokenGem key={diamond.id}
                              id={diamond.id}
                              type={TokenGemType.DIAMOND}
                              onClick={() => onClickGem(TokenGemType.DIAMOND)}
                              position={diamond.position}
                              rotation={diamond.rotation}
                              ref={(element: any) => (gemRefs.current[diamond.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.DIAMOND)
                    .map((card) => (
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
                {playerGems[playerId]?.sapphire.map((sapphire) => (
                    <TokenGem key={sapphire.id}
                              id={sapphire.id}
                              type={TokenGemType.SAPPHIRE}
                              onClick={() => onClickGem(TokenGemType.SAPPHIRE)}
                              position={sapphire.position}
                              rotation={sapphire.rotation}
                              ref={(element: any) => (gemRefs.current[sapphire.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                    .map((card) => (
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
                {playerGems[playerId]?.emerald.map((emerald) => (
                    <TokenGem key={emerald.id}
                              id={emerald.id}
                              type={TokenGemType.EMERALD}
                              onClick={() => onClickGem(TokenGemType.EMERALD)}
                              position={emerald.position}
                              rotation={emerald.rotation}
                              ref={(element: any) => (gemRefs.current[emerald.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.EMERALD)
                    .map((card) => (
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
                {playerGems[playerId]?.ruby.map((ruby) => (
                    <TokenGem key={ruby.id}
                              id={ruby.id}
                              type={TokenGemType.RUBY}
                              onClick={() => onClickGem(TokenGemType.RUBY)}
                              position={ruby.position}
                              rotation={ruby.rotation}
                              ref={(element: any) => (gemRefs.current[ruby.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.RUBY)
                    .map((card) => (
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
                {playerGems[playerId]?.onyx.map((onyx) => (
                    <TokenGem key={onyx.id}
                              id={onyx.id}
                              type={TokenGemType.ONYX}
                              onClick={() => onClickGem(TokenGemType.ONYX)}
                              position={onyx.position}
                              rotation={onyx.rotation}
                              ref={(element: any) => (gemRefs.current[onyx.id] = element)}/>
                ))}
                {playerCards[playerId]?.filter((card: CardVO) => card.type == CardGemType.ONYX)
                    .map((card) => (
                        <CardGem key={card.id}
                                 id={card.id}
                                 level={card.level}
                                 url={card.url}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                ))}
            </group>

            {playerGems[playerId]?.gold.map(gold => (
                <TokenGem key={gold.id}
                          id={gold.id}
                          type={TokenGemType.GOLD}
                          onClick={() => onClickGem(TokenGemType.GOLD)}
                          position={gold.position}
                          rotation={gold.rotation}
                          ref={(element: any) => (gemRefs.current[gold.id] = element)}/>
            ))}

            {playerReserveCards[playerId]?.map(card => (
                <CardGem key={card.id}
                         id={card.id}
                         level={card.level}
                         url={card.url}
                         position={card.position}
                         rotation={card.rotation}
                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
            ))}

            {playerNobles[playerId]?.map((noble) => (
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