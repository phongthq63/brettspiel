import GemCard from "@/games/splendor/component/3d/GemCard";
import NobleCard from "@/games/splendor/component/3d/NobleCard";
import React, {useEffect} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import GamePlane from "@/games/splendor/component/3d/GamePlane";
import GameTable, {GameTableSize} from "@/games/splendor/component/3d/GameTable";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref";
import GemToken from "@/games/splendor/component/3d/GemToken";
import PlayerBoard from "@/games/splendor/component/3d/PlayerBoard";
import ActionDialog from "@/games/splendor/component/3d/ActionDialog";
import {Gem} from "@/games/splendor/types/game";
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
        onClickDeckCard,
        onClickCard, onClickGem,
    } = useGameController()
    useGameSocket(gameId)

    useEffect(() => {
        console.log(deckCard, fieldCard)
    })

    // Return object action select to first position + disable action board
    // useEffect(() => {
    //     if (!currentAction) {
    //         if (selectedCards.length > 0) {
    //             // Reverse animation
    //             let currentAnimation: gsap.core.Timeline
    //             selectedCards.reverse().forEach(selectedCard => {
    //                 if (currentAnimation) {
    //                     currentAnimation.eventCallback("onReverseComplete", () => {
    //                         selectedCard.animation
    //                             .call(() => {
    //                                 // Stop physics
    //                                 selectedCard.ref.stopPhysics()
    //                             })
    //                             .reverse()
    //                             .then(() => {
    //                                 // Start physics
    //                                 selectedCard.ref.startPhysics()
    //                             })
    //                     })
    //                 } else {
    //                     selectedCard.animation
    //                         .call(() => {
    //                             // Stop physics
    //                             selectedCard.ref.stopPhysics()
    //                         })
    //                         .reverse()
    //                         .then(() => {
    //                             // Start physics
    //                             selectedCard.ref.startPhysics()
    //                         })
    //                 }
    //
    //                 currentAnimation = selectedCard.animation
    //             })
    //
    //             setSelectedCards([])
    //         }
    //         if (selectedNobles.length > 0) {
    //             // Reverse animation
    //             let currentAnimation: gsap.core.Timeline
    //             selectedNobles.reverse().forEach(selectedNoble => {
    //                 if (currentAnimation) {
    //                     currentAnimation.eventCallback("onReverseComplete", () => {
    //                         selectedNoble.animation
    //                             .call(() => {
    //                                 // Stop physics
    //                                 selectedNoble.ref.stopPhysics()
    //                             })
    //                             .reverse()
    //                             .then(() => {
    //                                 // Start physics
    //                                 selectedNoble.ref.startPhysics()
    //                             })
    //                     })
    //                 } else {
    //                     selectedNoble.animation
    //                         .call(() => {
    //                             // Stop physics
    //                             selectedNoble.ref.stopPhysics()
    //                         })
    //                         .reverse()
    //                         .then(() => {
    //                             // Start physics
    //                             selectedNoble.ref.startPhysics()
    //                         })
    //                 }
    //
    //                 currentAnimation = selectedNoble.animation
    //             })
    //
    //             setSelectedNobles([])
    //         }
    //         if (selectedGems.length > 0) {
    //             const animation = gsap.timeline()
    //             selectedGems.reverse().forEach(selectedGem => {
    //                 const instance = gemRefs.current[selectedGem.id]
    //
    //                 // Stop physics
    //                 instance.stopPhysics()
    //
    //                 // Animation
    //                 const startPosition = gemRefs.current[selectedGem.id].position.clone()
    //                 const targetPosition = selectedGem.oldPosition
    //                 const targetRotation = selectedGem.oldRotation
    //                 const arcHeight = 1.5
    //                 animation.add(gsap.timeline()
    //                     .to(instance.position, {
    //                         x: targetPosition.x,
    //                         y: targetPosition.y,
    //                         duration: 0.3,
    //                         onUpdate: function () {
    //                             const progress = this.progress() // Progress from 0 → 1
    //                             instance.position.z = MathUtils.lerp(startPosition.z, targetPosition.z, progress) + arcHeight * Math.sin(progress * Math.PI)
    //                         }
    //                     })
    //                     .to(instance.rotation, {
    //                         x: targetRotation.x,
    //                         y: targetRotation.y,
    //                         z: targetRotation.z,
    //                         duration: 0.3
    //                     }, "<")
    //                     .call(() => {
    //                         // Start physics
    //                         gemRefs.current[selectedGem.id].startPhysics()
    //
    //                         // Update state
    //                         if (selectedGem.owner) {
    //                             setGems((prevState) => ({
    //                                 ...prevState,
    //                                 [selectedGem.type]: prevState[selectedGem.type].filter(gem => gem.id != selectedGem.id)
    //                             }))
    //                             setPlayerGems((prevState) => ({
    //                                 ...prevState,
    //                                 [currentPlayer]: ({
    //                                     ...prevState[currentPlayer],
    //                                     [selectedGem.type]: [
    //                                         ...prevState[currentPlayer][selectedGem.type],
    //                                         {
    //                                             id: selectedGem.id,
    //                                             position: targetPosition.toArray(),
    //                                             rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
    //                                         }
    //                                     ]
    //                                 })
    //                             }))
    //                         } else {
    //                             setGems((prevState) => ({
    //                                 ...prevState,
    //                                 [selectedGem.type]: [
    //                                     ...(prevState[selectedGem.type]),
    //                                     {
    //                                         id: selectedGem.id,
    //                                         position: targetPosition.toArray(),
    //                                         rotation: [targetRotation.x, targetRotation.y, targetRotation.z]
    //                                     }
    //                                 ],
    //                             }))
    //                             setPlayerGems((prevState) => ({
    //                                 ...prevState,
    //                                 [currentPlayer]: ({
    //                                     ...prevState[currentPlayer],
    //                                     [selectedGem.type]: prevState[currentPlayer][selectedGem.type].filter(gem => gem.id != selectedGem.id)
    //                                 })
    //                             }))
    //                         }
    //                     }))
    //             })
    //
    //             setSelectedGems([])
    //         }
    //     }
    //
    // }, [currentAction])

    // const onClickNotCurrentCard = useCallback((id: string) => {
    //     if (currentAction) return
    //
    //     selectedCards.filter(selectedCard => selectedCard.id == id)
    //         .forEach(selectedCard => {
    //             // Reverse animation
    //             selectedCard.animation
    //                 .call(() => {
    //                     // Stop physics
    //                     selectedCard.ref.stopPhysics()
    //                 })
    //                 .reverse()
    //                 .then(() => {
    //                     // Start physics
    //                     selectedCard.ref.startPhysics()
    //                 })
    //         })
    //
    //     setSelectedCards((prevState) => prevState.filter(selectedCard => selectedCard.id != id))
    // }, [currentAction, selectedCards])

    // const onClickNotCurrentNoble = useCallback((id: string) => {
    //     if (currentAction) return
    //
    //     selectedNobles.filter(selectedNoble => selectedNoble.id == id)
    //         .forEach(selectedNoble => {
    //             // Reverse animation
    //             selectedNoble.animation
    //                 .call(() => {
    //                     // Stop physics
    //                     selectedNoble.ref.stopPhysics()
    //                 })
    //                 .reverse()
    //                 .then(() => {
    //                     // Start physics
    //                     selectedNoble.ref.startPhysics()
    //                 })
    //         })
    //
    //     setSelectedNobles((prevState) => prevState.filter(selectedNoble => selectedNoble.id != id))
    // }, [currentAction, selectedNobles])

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
                                     // onClickNotThis={() => onClickNotCurrentCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {gems.gold.map((gem: Gem) => (
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
                    {gems.ruby.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.emerald.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.sapphire.map((gem: Gem) => (
                        <GemToken key={gem.id}
                                  id={gem.id}
                                  type={gem.type}
                                  onClick={() => onClickGem(gem)}
                                  position={gem.position}
                                  ref={(element: any) => (gemRefs.current[gem.id] = element)}/>
                    ))}
                    {gems.diamond.map((gem: Gem) => (
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
                                   // onClickNotThis={() => onClickNotCurrentNoble(noble.id)}
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

export default GameArea;