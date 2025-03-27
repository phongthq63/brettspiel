import GemCard from "@/games/splendor/component/3d/GemCard";
import NobleCard from "@/games/splendor/component/3d/NobleCard";
import React from "react";
import {useGameSplendor} from "@/games/splendor/store/game.context";
import GamePlane from "@/games/splendor/component/3d/GamePlane";
import GameTable, {GameTableSize} from "@/games/splendor/component/3d/GameTable";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref.context";
import GemToken from "@/games/splendor/component/3d/GemToken";
import PlayerBoard from "@/games/splendor/component/3d/PlayerBoard";
import ActionDialog from "@/games/splendor/component/3d/ActionDialog";
import {useGameSocket} from "@/games/splendor/hooks/useGameSocket";
import {useGameController} from "@/games/splendor/hooks/useGameController";


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
        dialog,
    } = useGameSplendor()
    const {
        onClickNoble,
        onClickNotCurrentNoble,
        onClickDeckCard,
        onClickCard,
        onClickNotCurrentCard,
        onClickGem,
    } = useGameController()
    useGameSocket(gameId)

    // const [DeckCard, setDeckCard] = useState<{[key: number]: Card[]}>({
    //     [1]: [],
    //     [2]: [],
    //     [3]: []
    // })
    // const [FieldCard, setFieldCard] = useState<{[key: number]: Card[]}>({
    //     [1]: [],
    //     [2]: [],
    //     [3]: []
    // })
    // const [Gem, setGem] = useState<{[key in TokenGemType]: Gem[]}>({
    //     [TokenGemType.GOLD]: [],
    //     [TokenGemType.ONYX]: [],
    //     [TokenGemType.RUBY]: [],
    //     [TokenGemType.EMERALD]: [],
    //     [TokenGemType.SAPPHIRE]: [],
    //     [TokenGemType.DIAMOND]: [],
    // })
    // const [DeckNoble, setDeckNoble] = useState<Noble[]>([])
    // const [FieldNoble, setFieldNoble] = useState<Noble[]>([])
    //
    //
    // useEffect(() => {
    //     if (deckCard[1] && deckCard[2] && deckCard[3]) {
    //         setDeckCard(deckCard)
    //     }
    //     if (fieldCard[1] && fieldCard[2] && fieldCard[3]) {
    //         setFieldCard(fieldCard)
    //     }
    //     if (gems.gold != undefined &&
    //         gems.onyx != undefined &&
    //         gems.ruby != undefined &&
    //         gems.emerald != undefined &&
    //         gems.sapphire != undefined &&
    //         gems.diamond != undefined) {
    //         setGem(gems)
    //     }
    //     if (deckNoble) {
    //         setDeckNoble(deckNoble)
    //     }
    //     if (fieldNoble) {
    //         setFieldNoble(fieldNoble)
    //     }
    // }, [deckCard, deckNoble, fieldCard, fieldNoble, gems])


    return (
        <>
            <OrbitControls/>
            <ambientLight intensity={2}/>
            <GamePlane position={[0, 0, -5]}/>
            <GameTable position={[0, 0, -GameTableSize.depth / 2]}/>
            <group>
                <group>
                    {
                        deckCard[3]?.map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
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
                                     level={card.level}
                                     url={card.url}
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
                                     level={card.level}
                                     url={card.url}
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
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard[2].map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard[1].map((card) => (
                            <GemCard key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card)}
                                     onClickNotThis={() => onClickNotCurrentCard(card)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {gems.gold.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.onyx.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.ruby.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.emerald.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.sapphire.map((gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.diamond.map((gem) => (
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
                                   url={noble.url}
                                   position={noble.position}
                                   rotation={noble.rotation}
                                   ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                    ))}
                    {fieldNoble.map((noble) => (
                        <NobleCard key={noble.id}
                                   id={noble.id}
                                   url={noble.url}
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


            <ActionDialog open={dialog.open}
                          position={dialog.position}
                          rotation={dialog.rotation}/>
        </>
    )
}

export default GameArea