import CardGem from "@/games/splendor/component/3d/CardGem";
import CardNoble from "@/games/splendor/component/3d/CardNoble";
import React, {useEffect} from "react";
import {useThree} from "@react-three/fiber";
import {useGameSplendor} from "@/games/splendor/store/game";
import gsap from "gsap";
import {Euler, Quaternion, Vector3} from "three";
import Plane from "@/games/splendor/component/3d/Plane";
import Board, {BoardSize} from "@/games/splendor/component/3d/Board";
import {OrbitControls} from "@react-three/drei";
import {useSharedRef} from "@/games/splendor/store/ref";
import GameController from "@/games/splendor/component/GameController";
import {Card, Gem, Noble, NoblePosition} from "@/games/splendor/constants/game";
import TokenGold from "@/games/splendor/component/3d/TokenGold";
import TokenOnyx, {TokenOnyxSize} from "@/games/splendor/component/3d/TokenOnyx";
import TokenRuby, {TokenRubySize} from "@/games/splendor/component/3d/TokenRuby";
import TokenEmerald, {TokenEmeraldSize} from "@/games/splendor/component/3d/TokenEmerald";
import TokenSapphire, {TokenSapphireSize} from "@/games/splendor/component/3d/TokenSapphire";
import TokenDiamond, {TokenDiamondSize} from "@/games/splendor/component/3d/TokenDiamond";


function PlayingSpace() {
    const {camera} = useThree();
    const {cardRefs, nobleRefs, goldRefs, onyxRefs, rubyRefs, emeraldRefs, sapphireRefs, diamondRefs} = useSharedRef()
    const {
        deckCard3,
        deckCard2,
        deckCard1,
        fieldCard3,
        fieldCard2,
        fieldCard1,
        golds, onyxes, rubies, emeralds, sapphires, diamonds,
        deckNoble,
        fieldNoble,
        isMyTurn,
        currentAction, setCurrentAction
    } = useGameSplendor();

    let objectActionSelects: any[] = []


    useEffect(() => {
        console.log("AAAAAAA", golds);
    });


    // Return object action select to first position
    useEffect(() => {
        if (!currentAction.type && objectActionSelects.length > 0) {
            const animation = gsap.timeline()
            objectActionSelects.forEach(objectActionSelect => {
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
                    }, 0))
            })

            objectActionSelects = []
        }
    }, [currentAction]);

    const test = (fieldNoble: any[]) => {
        const timelineOpenNoble = gsap.timeline();

        fieldNoble.forEach((field) => {
            const instance = nobleRefs.current[field.noble.id]
            let position;
            switch (field.position) {
                case 0:
                    position = NoblePosition.position1;
                    break
                case 1:
                    position = NoblePosition.position2;
                    break
                case 2:
                    position = NoblePosition.position3;
                    break
                case 3:
                    position = NoblePosition.position4;
                    break
                case 4:
                    position = NoblePosition.position5;
                    break
                default:
                    throw new Error(`Invalid open card position ${field.position}`)
            }

            const endX = position[0];
            const startY = instance.position.y;
            const endY = position[1];
            const startZ = instance.position.z;
            const endZ = position[2];
            const peakHeight = 0.8;
            timelineOpenNoble.to(instance.position, {
                x: endX,
                y: endY,
                duration: 0.3,
                ease: "power1.out",
                onUpdate: () => {
                    const currentY = instance.position.y;
                    instance.position.z = (startZ - peakHeight) / Math.pow((startY + endY) / 2 - startY, 2) * Math.pow(currentY - (startY + endY) / 2, 2) + peakHeight;
                }
            })
                .to(instance.rotation, {
                    y: 0,
                    duration: 0.3,
                }, "<")
                .to(instance.position, {
                    x: endX,
                    y: endY,
                    z: endZ,
                })
        })
    }

    const openNoble = (nobleId: string, position: [number, number, number]) => {
        const nobleInstance = nobleRefs.current[nobleId]
        if (!nobleInstance) {
            return gsap.timeline()
        }

        const endX = position[0];
        const startY = nobleInstance.position.y;
        const endY = position[1];
        const startZ = nobleInstance.position.z;
        const endZ = position[2];
        const peakHeight = 1.2;

        return gsap.timeline()
            .to(nobleInstance.position, {
                x: endX,
                y: endY,
                duration: 0.6,
                ease: "power1.out",
                onUpdate: () => {
                    const currentY = nobleInstance.position.y;
                    nobleInstance.position.z = (startZ - peakHeight) / Math.pow((startY + endY) / 2 - startY, 2) * Math.pow(currentY - (startY + endY) / 2, 2) + peakHeight;
                }
            })
            .to(nobleInstance.rotation, {
                y: 0,
                duration: 0.5,
            }, 0)
            .to(nobleInstance.position, {
                x: endX,
                y: endY,
                z: endZ,
            })
    };

    const openCard = (cardId: string, position: [number, number, number]) => {
        const cardInstance = cardRefs.current[cardId]
        if (!cardInstance) {
            return gsap.timeline()
        }

        const startX = cardInstance.position.x;
        const endX = position[0];
        const endY = position[1];
        const startZ = cardInstance.position.z;
        const endZ = position[2];
        const peakHeight = 1;

        return gsap.timeline()
            .to(cardInstance.position, {
                x: endX,
                y: endY,
                duration: 0.5,
                ease: "power1.out",
                onUpdate: () => {
                    const currentX = cardInstance.position.x;
                    cardInstance.position.z = (startZ - peakHeight) / Math.pow((startX + endX) / 2 - startX, 2) * Math.pow(currentX - (startX + endX) / 2, 2) + peakHeight
                }
            }, 0)
            .to(cardInstance.rotation, {
                y: 0,
                duration: 0.4,
            }, 0)
            .to(cardInstance.position, {
                x: endX,
                y: endY,
                z: endZ
            });
    };

    const onClickOnyx = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(onyxRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = onyxRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenOnyxSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickRuby = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(rubyRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = rubyRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenRubySize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickEmerald = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(emeraldRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = emeraldRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenEmeraldSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickSapphire = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(sapphireRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = sapphireRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenSapphireSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickDiamond = (type: string, id: string) => {
        if (!isMyTurn) {
            return;
        }
        if (currentAction.type && currentAction.type != "gather-gem") {
            return;
        }

        // Verify rule game
        const currentGem = [...(currentAction.data.gem ?? [])]
        if (currentGem.length >= 3) {
            return;
        }
        if (currentGem.length == 2) {
            const typeGem1 = currentGem[0].split("-")[0]
            const typeGem2 = currentGem[1].split("-")[0]
            if (typeGem1 == typeGem2) {
                return;
            }
            const typeGemSelect = id.split("-")[0]
            if (typeGem1 == typeGemSelect || typeGem2 == typeGemSelect) {
                return;
            }
        }

        // Update state
        setCurrentAction({type: "gather-gem", data: {gem: [...currentGem, id]}});

        // Get instance ref
        const fieldIds = Object.keys(diamondRefs.current.field)
        let instance: any
        switch (type) {
            case "field":
                id = fieldIds[fieldIds.length - 1]
                if (currentGem.includes(id)) {
                    id = fieldIds[fieldIds.length - 2]
                }
                instance = diamondRefs.current.field[id]
                break
            default:
                return
        }

        // Save location instance ref
        objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x + (currentGem.length - 1) * TokenDiamondSize.size,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    // Step 1: Make face the camera
                    const targetQuaternion = new Quaternion();
                    instance.lookAt(targetLookAt)

                    // Save the "lookAt" orientation in a quaternion
                    instance.getWorldQuaternion(targetQuaternion);

                    // Step 2: Apply a rotate
                    const flipQuaternion = new Quaternion();
                    flipQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);

                    // Combine the lookAt orientation
                    targetQuaternion.multiply(flipQuaternion);

                    // Step 3: Apply the calculated quaternion
                    instance.quaternion.copy(targetQuaternion);
                },
            }, 0)
    }

    const onClickCard = (id: string) => {
        // if (currentAction.type) {
        //     return;
        // }
        //
        let type
        if (fieldCard1.some((card: Card) => card.id == id) ||
            fieldCard2.some((card: Card) => card.id == id) ||
            fieldCard3.some((card: Card) => card.id == id)) {
            type = "field"
        } else {
            type = "deck"
        }
        //
        // if (!isMyTurn && type == "deck") {
        //     return;
        // }
        // if (isMyTurn) {
        //     // Update state
        //     switch (type) {
        //         case "field":
        //             setCurrentAction({type: "option-action", data: {id: id, option: ["buy-card", "reserve-card"]}});
        //             break;
        //         case "deck":
        //             setCurrentAction({type: "reserve-card", data: {id: id}});
        //             break;
        //         default:
        //             return;
        //     }
        //
        // }

        const instance: any = cardRefs.current[id]
        // if (!objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
        //     // Save location instance ref
        //     objectActionSelects.push({
        //         id: id,
        //         ref: instance,
        //         position: instance.position.clone(),
        //         rotation: instance.rotation.clone()
        //     })
        // }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        const animation = gsap.timeline()
        animation.add(gsap.timeline()
            .to(instance.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 0.3
            }, 0)
            .to(instance.rotation, {
                duration: 0.3,
                onUpdate: () => {
                    switch (type) {
                        case "deck":
                            // Step 1: Make the card face the camera
                            const targetQuaternion = new Quaternion();
                            instance.lookAt(targetLookAt);

                            // Save the "lookAt" orientation in a quaternion
                            instance.getWorldQuaternion(targetQuaternion);

                            // Step 2: Apply a flip to the card (180° along local Y-axis for face-down)
                            const flipQuaternion = new Quaternion();
                            flipQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI); // 180° around Y-axis

                            // Combine the lookAt orientation with the flip
                            targetQuaternion.multiply(flipQuaternion);

                            // Step 3: Apply the calculated quaternion to the card
                            instance.quaternion.copy(targetQuaternion);
                            break
                        default:
                            instance.lookAt(targetLookAt);
                            break;
                    }
                },
            }, 0))
    }

    const onClickNoble = (id: string) => {
        if (currentAction.type) {
            return;
        }

        if (!fieldNoble.some((noble: Noble) => noble.id == id)) {
            return;
        }

        if (isMyTurn) {
            // Update state
            setCurrentAction({type: "take-noble", data: {id: id}});
        }

        const instance = nobleRefs.current[id]
        if (!objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
            objectActionSelects.push({id: id, ref: instance, position: {...instance.position}, rotation: new Euler().copy(instance.rotation)})
        }

        // Move to front camera
        const direction = new Vector3()
        camera.getWorldDirection(direction) // Get the camera's forward direction
        direction.multiplyScalar(2) // Distance from the camera (e.g., 5 units)
        const targetPosition = camera.position.clone().add(direction) // Calculate position in front of the camera
        const targetLookAt = camera.position.clone()  // The object will look at the camera's position
        instance.stopPhysics()
        gsap.timeline()
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
    const onNotClickNoble = (id: string) => {

    }


    const onClickNotCurrent = (id: string) => {
        console.log("not", id)
        if (currentAction.type) {
            return;
        }

        if (objectActionSelects.some(objectActionSelect => objectActionSelect.id == id)) {
            const animation = gsap.timeline()
            objectActionSelects.forEach(objectActionSelect => {
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
                    }, 0))
            })

            objectActionSelects = []
        }
    }

    return (
        <>
            <GameController/>
            <OrbitControls enabled={true}/>
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
                                     onClick={() => onClickCard(card.id)}
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
                                     onClick={() => onClickCard(card.id)}
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
                                     onClick={() => onClickCard(card.id)}
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
                                       position={onyx.position}
                                       ref={(element: any) => (onyxRefs.current[onyx.id] = element)}/>
                        ))
                    }
                    {
                        rubies.map((ruby: Gem) => (
                            <TokenRuby key={ruby.id}
                                       id={ruby.id}
                                       position={ruby.position}
                                       ref={(element: any) => (rubyRefs.current[ruby.id] = element)}/>
                        ))
                    }
                    {
                        emeralds.map((emerald: Gem) => (
                            <TokenEmerald key={emerald.id}
                                          id={emerald.id}
                                          position={emerald.position}
                                          ref={(element: any) => (emeraldRefs.current[emerald.id] = element)}/>
                        ))
                    }
                    {
                        sapphires.map((sapphire: Gem) => (
                            <TokenSapphire key={sapphire.id}
                                           id={sapphire.id}
                                           position={sapphire.position}
                                           ref={(element: any) => (sapphireRefs.current[sapphire.id] = element)}/>
                        ))
                    }
                    {
                        diamonds.map((diamond: Gem) => (
                            <TokenDiamond key={diamond.id}
                                          id={diamond.id}
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
                                       onClick={() => onClickNoble(noble.id)}
                                       onClickNotThis={() => onClickNotCurrent(noble.id)}
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
                                       onClickNotThis={() => onClickNotCurrent(noble.id)}
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