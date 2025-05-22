import GemToken from "@/games/splendor/component/3d/GemToken";
import GemCard from "@/games/splendor/component/3d/GemCard";
import React, {memo, useEffect, useState} from "react";
import {useSharedRef} from "@/games/splendor/store/ref.context";
import NobleCard from "@/games/splendor/component/3d/NobleCard";
import {useGameController} from "@/games/splendor/hooks/useGameController";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";
import {GemData} from "@/games/splendor/types/game";


interface PlayerBoardProps {
    playerId: string
}

const PlayerBoard = ({playerId} : PlayerBoardProps) => {
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {onClickPlayerGem, onClickPlayerReserveCard} = useGameController()
    const players = useGameStore(useShallow((state) => state.players))
    const player = players[playerId]
    const [golds, setGolds] = useState<GemData[]>([])
    const [diamonds, setDiamonds] = useState<GemData[]>([])
    const [sapphires, setSapphires] = useState<GemData[]>([])
    const [emeralds, setEmeralds] = useState<GemData[]>([])
    const [rubies, setRubies] = useState<GemData[]>([])
    const [onyxes, setOnyxes] = useState<GemData[]>([])


    useEffect(() => {
        if (!player) return

        setGolds(player.gems.gold)
        setDiamonds(player.gems.diamond)
        setSapphires(player.gems.sapphire)
        setEmeralds(player.gems.emerald)
        setRubies(player.gems.ruby)
        setOnyxes(player.gems.onyx)
    }, [player]);


    return (
        <>
            {player && (
                <group>
                    <group>
                        {diamonds.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickPlayerGem(playerId, gem)}
                                      position={gem.position}
                                      rotation={gem.rotation}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {player.cards.diamond.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))}
                    </group>
                    <group>
                        {sapphires.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickPlayerGem(playerId, gem)}
                                      position={gem.position}
                                      rotation={gem.rotation}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {player.cards.sapphire.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))}
                    </group>
                    <group>
                        {emeralds.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickPlayerGem(playerId, gem)}
                                      position={gem.position}
                                      rotation={gem.rotation}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {player.cards.emerald.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))}
                    </group>
                    <group>
                        {rubies.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickPlayerGem(playerId, gem)}
                                      position={gem.position}
                                      rotation={gem.rotation}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {player.cards.ruby.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))}
                    </group>
                    <group>
                        {onyxes.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickPlayerGem(playerId, gem)}
                                      position={gem.position}
                                      rotation={gem.rotation}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {player.cards.onyx.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))}
                    </group>

                    {golds.map(gem => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickPlayerGem(playerId, gem)}
                                  position={gem.position}
                                  rotation={gem.rotation}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}

                    {player.reserveCards.map(card => (
                        <GemCard key={card.id}
                                 id={card.id}
                                 onClick={() => onClickPlayerReserveCard(playerId, card)}
                                 position={card.position}
                                 rotation={card.rotation}
                                 ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                    ))}

                    {player.nobles.map((noble) => (
                        <NobleCard key={noble.id}
                                   id={noble.id}
                                   position={noble.position}
                                   rotation={noble.rotation}
                                   ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                    ))}
                </group>
            )}
        </>
    )
}

export default memo(PlayerBoard)