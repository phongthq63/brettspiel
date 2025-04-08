import GemCard from "@/games/splendor/component/3d/GemCard";
import NobleCard from "@/games/splendor/component/3d/NobleCard";
import React, {useEffect, useState} from "react";
import GamePlane from "@/games/splendor/component/3d/GamePlane";
import GameTable, {GameTableSize} from "@/games/splendor/component/3d/GameTable";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref.context";
import GemToken from "@/games/splendor/component/3d/GemToken";
import PlayerBoard from "@/games/splendor/component/3d/PlayerBoard";
import ActionDialog from "@/games/splendor/component/3d/ActionDialog";
import {useGameSocket} from "@/games/splendor/hooks/useGameSocket";
import {useGameController} from "@/games/splendor/hooks/useGameController";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";
import {Gem} from "@/games/splendor/types/game";


function GameArea() {
    const {cardRefs, nobleRefs, gemRefs} = useSharedRef()
    const {
        gameId,
        playerIds,
        deckCard,
        fieldCard,
        gems,
        deckNoble,
        fieldNoble,
        dialog
    } = useGameStore(useShallow((state) => ({
        gameId: state.gameId,
        playerIds: state.playerIds,
        deckCard: state.deckCard,
        fieldCard: state.fieldCard,
        gems: state.gems,
        deckNoble: state.deckNoble,
        fieldNoble: state.fieldNoble,
        dialog: state.dialog
    })))
    const {
        onClickNoble,
        onClickNotCurrentNoble,
        onClickDeckCard,
        onClickCard,
        onClickNotCurrentCard,
        onClickGem,
    } = useGameController()
    useGameSocket(gameId)
    const [golds, setGolds] = useState<Gem[]>([])
    const [diamonds, setDiamonds] = useState<Gem[]>([])
    const [sapphires, setSapphires] = useState<Gem[]>([])
    const [emeralds, setEmeralds] = useState<Gem[]>([])
    const [rubies, setRubies] = useState<Gem[]>([])
    const [onyxes, setOnyxes] = useState<Gem[]>([])


    useEffect(() => {
        setGolds(gems.gold)
        setDiamonds(gems.diamond)
        setSapphires(gems.sapphire)
        setEmeralds(gems.emerald)
        setRubies(gems.ruby)
        setOnyxes(gems.onyx)
    }, [gems]);


    return (
        <>
            <OrbitControls/>
            <ambientLight intensity={2}/>
            <GamePlane position={[0, 0, -5]}/>
            <GameTable position={[0, 0, -GameTableSize.depth / 2]}/>
            <group>
                <group>
                    <group>
                        {
                            deckCard[3]?.map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickDeckCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                        {
                            deckCard[2]?.map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickDeckCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                        {
                            deckCard[1]?.map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickDeckCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                    </group>
                    <group>
                        {
                            fieldCard[3].map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickCard(card)}
                                         onClickNotThis={() => onClickNotCurrentCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                        {
                            fieldCard[2].map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickCard(card)}
                                         onClickNotThis={() => onClickNotCurrentCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                        {
                            fieldCard[1].map((card) => (
                                <GemCard key={card.id}
                                         id={card.id}
                                         onClick={() => onClickCard(card)}
                                         onClickNotThis={() => onClickNotCurrentCard(card)}
                                         position={card.position}
                                         rotation={card.rotation}
                                         ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                            ))
                        }
                    </group>
                    <group>
                        {golds.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {onyxes.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickGem(gem)}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {rubies.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickGem(gem)}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {emeralds.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickGem(gem)}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {sapphires.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickGem(gem)}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                        {diamonds.map((gem) => (
                            <GemToken key={gem.id}
                                      id={gem.id}
                                      type={gem.type}
                                      onClick={() => onClickGem(gem)}
                                      position={gem.position}
                                      ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                        ))}
                    </group>
                    <group>
                        {deckNoble.map((noble) => (
                            <NobleCard key={noble.id}
                                       id={noble.id}
                                       position={noble.position}
                                       rotation={noble.rotation}
                                       ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                        ))}
                        {fieldNoble.map((noble) => (
                            <NobleCard key={noble.id}
                                       id={noble.id}
                                       onClick={() => onClickNoble(noble)}
                                       onClickNotThis={() => onClickNotCurrentNoble(noble)}
                                       position={noble.position}
                                       rotation={noble.rotation}
                                       ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                        ))}
                    </group>
                </group>
                <group>
                    {playerIds.map((playerId) => (
                        <PlayerBoard key={playerId}
                                     playerId={playerId}/>)
                    )}
                </group>
            </group>

            <ActionDialog open={dialog.open}
                          position={dialog.position}
                          rotation={dialog.rotation}/>
        </>
    )
}

export default GameArea