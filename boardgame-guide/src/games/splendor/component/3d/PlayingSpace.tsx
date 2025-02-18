import CardGem from "@/games/splendor/component/3d/CardGem";
import CardNoble from "@/games/splendor/component/3d/CardNoble";
import React, {useEffect, useState} from "react";
import {useThree} from "@react-three/fiber";
import {Card, Gem, Noble, useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Euler, Quaternion, Vector3} from "three";
import Plane from "@/games/splendor/component/3d/Plane";
import Board, {BoardSize} from "@/games/splendor/component/3d/Board";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref";
import GameController from "@/games/splendor/component/GameController";
import TokenGold from "@/games/splendor/component/3d/TokenGold";
import TokenOnyx from "@/games/splendor/component/3d/TokenOnyx";
import TokenRuby from "@/games/splendor/component/3d/TokenRuby";
import TokenEmerald from "@/games/splendor/component/3d/TokenEmerald";
import TokenSapphire from "@/games/splendor/component/3d/TokenSapphire";
import TokenDiamond from "@/games/splendor/component/3d/TokenDiamond";
import {TokenGemType} from "@/games/splendor/constants/gem";


function PlayingSpace() {
    const {camera} = useThree();
    const {cardRefs, nobleRefs, goldRefs, onyxRefs, rubyRefs, emeraldRefs, sapphireRefs, diamondRefs} = useSharedRef()
    const {
        status,
        deckCard3, deckCard2, deckCard1,
        fieldCard3, fieldCard2, fieldCard1,
        golds, onyxes, rubies, emeralds, sapphires, diamonds,
        deckNoble, fieldNoble,
        isMyTurn,
        currentAction, setCurrentAction
    } = useGameSplendor();

    const [selectedObjects, setSelectedObjects] = useState<{
        id: string
        ref: { [key: string]: any }
        position: Vector3
        rotation: Euler
    }[]>([]);


    // Return object action select to first position
    useEffect(() => {
        if (!currentAction && selectedObjects.length > 0) {
            const animation = gsap.timeline()
            selectedObjects.forEach(objectActionSelect => {
                animation.add(gsap.timeline()
                    .to(objectActionSelect.ref.position, {
                        x: objectActionSelect.position.x,
                        y: objectActionSelect.position.y,
                        z: objectActionSelect.position.z,
                        duration: 0.3,
                    })
                    .to(objectActionSelect.ref.rotation, {
                        x: objectActionSelect.rotation.x,
                        y: objectActionSelect.rotation.y,
                        z: objectActionSelect.rotation.z,
                        duration: 0.3,
                    }, "<")
                    .call(() => {
                        // Start physics
                        objectActionSelect.ref.startPhysics()
                    }))
            })

            setSelectedObjects([])
        }
    }, [currentAction, selectedObjects]);

    const onClickCardDeck = (id: string) => {
        if (status != 1 || !isMyTurn || currentAction) return

        //
        const instance = cardRefs.current[id]
        setCurrentAction({
            type: "reserve-card",
            card: {id: id}
        })
        setSelectedObjects([{
            id: id,
            ref: instance,
            position: instance.position.clone(),
            rotation: instance.rotation.clone()
        }])

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        const animation = gsap.timeline()
        animation.add(gsap.timeline()
            .call(() => {
                // Stop physics
                instance.stopPhysics()
            })
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            })
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make the card face the camera
                    instance.lookAt(targetLookAt);

                    // Save the "lookAt" orientation in a quaternion
                    const targetQuaternion = new Quaternion();
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a flip to the card (180° along local Y-axis for face-down)
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI); // 180° around Y-axis

                    // Combine the lookAt orientation with the flip
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion to the card
                    instance.quaternion.copy(targetQuaternion);
                },
            }, "<"))
    }

    const onClickCard = (id: string) => {
        if (currentAction) return

        // Update action if in turn
        if (isMyTurn) {
            setCurrentAction({
                type: "option-action",
                card: {id: id},
                option: ["buy-card", "reserve-card"]})
        }

        //
        const instance = cardRefs.current[id]
        if (!selectedObjects.some(selectedObject => selectedObject.id == id)) {
            setSelectedObjects((pre) => pre.concat([
                {
                    id: id,
                    ref: instance,
                    position: instance.position.clone(),
                    rotation: instance.rotation.clone()
                }
            ]))
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        const animation = gsap.timeline()
        animation.add(gsap.timeline()
            .call(() => {
                // Stop physics
                instance.stopPhysics()
            })
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            })
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => instance.lookAt(targetLookAt),
            }, "<"))
    }

    const onClickNoble = (id: string) => {
        if (currentAction) return

        // Update action if in turn
        if (isMyTurn) {
            setCurrentAction({
                type: "take-noble",
                noble: {id: id}
            })
        }

        //
        const instance = nobleRefs.current[id]
        if (!selectedObjects.some(selectedObject => selectedObject.id == id)) {
            setSelectedObjects((pre) => pre.concat([
                {
                    id: id,
                    ref: instance,
                    position: instance.position.clone(),
                    rotation: instance.rotation.clone()
                }
            ]))
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        instance.stopPhysics()
        gsap.timeline()
            .call(() => {
                // Stop physics
                instance.stopPhysics()
            })
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            })
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => instance.lookAt(targetLookAt)
            }, "<")
    }

    const onClickGem = (id: string, type: TokenGemType) => {
        if (!isMyTurn) return
        if (currentAction && currentAction.type != "gather-gem") return

        // Verify rule game
        const gemsTake = currentAction?.gem?.filter(gem => gem.count > 0) || []
        if (gemsTake.length >= 3) return
        if (gemsTake.length == 2 && gemsTake[0].type == gemsTake[1].type) return

        //
        setCurrentAction((preAction) => ({
            type: "gather-gem",
            gem: [...(preAction?.gem || []), {
                id: id,
                type: type,
                count: 1
            }]
        }))

        //
        let idTake
        let instance
        switch (type) {
            case TokenGemType.GOLD:
                return
            case TokenGemType.DIAMOND:
                idTake = diamonds[diamonds.length - 1].id
                instance = diamondRefs.current[idTake]
                break
            case TokenGemType.EMERALD:
                idTake = emeralds[emeralds.length - 1].id
                instance = emeraldRefs.current[idTake]
                break
            case TokenGemType.ONYX:
                idTake = onyxes[onyxes.length - 1].id
                instance = onyxRefs.current[idTake]
                break
            case TokenGemType.RUBY:
                idTake = rubies[rubies.length - 1].id
                instance = rubyRefs.current[idTake]
                break
            case TokenGemType.SAPPHIRE:
                idTake = sapphires[sapphires.length - 1].id
                instance = sapphireRefs.current[idTake]
                break
        }
        if (!selectedObjects.some(selectedObject => selectedObject.id == idTake)) {
            setSelectedObjects((pre) => pre.concat([
                {
                    id: id,
                    ref: instance,
                    position: instance.position.clone(),
                    rotation: instance.rotation.clone()
                }
            ]))
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .call(() => {
                // Stop physics
                instance.stopPhysics()
            })
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            })
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    const targetQuaternion = new Quaternion();
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, "<")
    }

    // const openCard = (cardId: string, position: [number, number, number]) => {
    //     const cardInstance = cardRefs.current[cardId]
    //     if (!cardInstance) {
    //         return gsap.timeline()
    //     }
    //
    //     const startX = cardInstance.position.x;
    //     const endX = position[0];
    //     const endY = position[1];
    //     const startZ = cardInstance.position.z;
    //     const endZ = position[2];
    //     const peakHeight = 1;
    //
    //     return gsap.timeline()
    //         .to(cardInstance.position, {
    //             x: endX,
    //             y: endY,
    //             duration: 0.5,
    //             ease: "power1.out",
    //             onUpdate: () => {
    //                 const currentX = cardInstance.position.x;
    //                 cardInstance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
    //             }
    //         }, 0)
    //         .to(cardInstance.rotation, {
    //             y: 0,
    //             duration: 0.4,
    //         }, 0)
    //         .to(cardInstance.position, {
    //             x: endX,
    //             y: endY,
    //             z: endZ
    //         });
    // };

    // const onClickNotCurrent = (id: string) => {
    //     if (currentAction) {
    //         return;
    //     }
    //
    //     if (objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
    //         const animation = gsap.timeline()
    //         objectActionSelects.forEach(objectActionSelect => {
    //             animation.add(gsap.timeline()
    //                 .to(objectActionSelect.ref.position, {
    //                     x: objectActionSelect.position.x,
    //                     y: objectActionSelect.position.y,
    //                     z: objectActionSelect.position.z,
    //                     duration: 0.3,
    //                 })
    //                 .to(objectActionSelect.ref.rotation, {
    //                     x: objectActionSelect.rotation.x,
    //                     y: objectActionSelect.rotation.y,
    //                     z: objectActionSelect.rotation.z,
    //                     duration: 0.3,
    //                 }, 0))
    //         })
    //
    //         objectActionSelects = []
    //     }
    // }

    return (
        <>
            <GameController/>
            <OrbitControls enabled={!currentAction}/>
            <Plane position={[0, 0, -5]}/>
            <Board position={[0, 0, -BoardSize.depth / 2]}/>
            <group>
                <group>
                    {
                        deckCard3.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCardDeck(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard2.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCardDeck(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        deckCard1.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCardDeck(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {
                        fieldCard3.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard2.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                    {
                        fieldCard1.map((card: Card) => (
                            <CardGem key={card.id}
                                     id={card.id}
                                     level={card.level}
                                     url={card.url}
                                     onClick={() => onClickCard(card.id)}
                                     position={card.position}
                                     rotation={card.rotation}
                                     ref={(element: any) => (cardRefs.current[card.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {
                        golds.map((gold: Gem) => (
                            <TokenGold key={gold.id}
                                       id={gold.id}
                                       position={gold.position}
                                       ref={(element: any) => (goldRefs.current[gold.id] = element)}/>
                        ))
                    }
                    {
                        onyxes.map((onyx: Gem) => (
                            <TokenOnyx key={onyx.id}
                                       id={onyx.id}
                                       onClick={() => onClickGem(onyx.id, TokenGemType.ONYX)}
                                       position={onyx.position}
                                       ref={(element: any) => (onyxRefs.current[onyx.id] = element)}/>
                        ))
                    }
                    {
                        rubies.map((ruby: Gem) => (
                            <TokenRuby key={ruby.id}
                                       id={ruby.id}
                                       onClick={() => onClickGem(ruby.id, TokenGemType.RUBY)}
                                       position={ruby.position}
                                       ref={(element: any) => (rubyRefs.current[ruby.id] = element)}/>
                        ))
                    }
                    {
                        emeralds.map((emerald: Gem) => (
                            <TokenEmerald key={emerald.id}
                                          id={emerald.id}
                                          onClick={() => onClickGem(emerald.id, TokenGemType.EMERALD)}
                                          position={emerald.position}
                                          ref={(element: any) => (emeraldRefs.current[emerald.id] = element)}/>
                        ))
                    }
                    {
                        sapphires.map((sapphire: Gem) => (
                            <TokenSapphire key={sapphire.id}
                                           id={sapphire.id}
                                           onClick={() => onClickGem(sapphire.id, TokenGemType.SAPPHIRE)}
                                           position={sapphire.position}
                                           ref={(element: any) => (sapphireRefs.current[sapphire.id] = element)}/>
                        ))
                    }
                    {
                        diamonds.map((diamond: Gem) => (
                            <TokenDiamond key={diamond.id}
                                          id={diamond.id}
                                          onClick={() => onClickGem(diamond.id, TokenGemType.DIAMOND)}
                                          position={diamond.position}
                                          ref={(element: any) => (diamondRefs.current[diamond.id] = element)}/>
                        ))
                    }
                </group>
                <group>
                    {
                        deckNoble.map((noble: Noble) => (
                            <CardNoble key={noble.id}
                                       id={noble.id}
                                       url={noble.url}
                                       position={noble.position}
                                       rotation={noble.rotation}
                                       ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                        ))
                    }
                    {
                        fieldNoble.map((noble: Noble) => (
                            <CardNoble key={noble.id}
                                       id={noble.id}
                                       url={noble.url}
                                       onClick={() => onClickNoble(noble.id)}
                                       position={noble.position}
                                       rotation={noble.rotation}
                                       ref={(element: any) => nobleRefs.current[noble.id] = element}/>
                        ))
                    }
                </group>
            </group>
        </>
    )
}

export default PlayingSpace;