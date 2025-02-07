import {useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {Mesh, Vector3} from "three";


export const CardNobleSize = {
    width: 0.6,
    height: 0.6,
    depth: 0.03
};

interface CardNobleProps {
    id: string
    url: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

let startAnimatedPosition: Vector3 = new Vector3();

const CardNoble = forwardRef(({id, url, onClick, onClickNotThis, ...props}: CardNobleProps, ref: Ref<any>) => {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, "/game/splendor/noble/noble-back.jpg"]);
    const [isAnimated, setIsAnimated] = useState(false);
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<Mesh>(null);
    const interactiveMeshRef = useRef<Mesh>(null);


    useImperativeHandle(ref, () => {
        return {
            ...interactiveMeshRef.current,
            handlerStartAnimation() {
                setIsAnimated(true)
                if (meshRef.current && rigidBodyRef.current) {
                    startAnimatedPosition = meshRef.current.position
                    rigidBodyRef.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
                    rigidBodyRef.current.wakeUp()
                }
            },
            handlerEndAnimation() {
                setIsAnimated(false)
                if (rigidBodyRef.current) {
                    rigidBodyRef.current.setBodyType(RigidBodyType.Dynamic, true);
                }
            }
        }
    });

    useFrame(() => {
        if (!interactiveMeshRef.current || !meshRef.current || !rigidBodyRef.current) return;

        // Update rigid body theo position mesh interactive
        if (isAnimated) {
            const position = new Vector3()
            interactiveMeshRef.current.getWorldPosition(position)
            rigidBodyRef.current.setNextKinematicTranslation(position.sub(startAnimatedPosition))
        }

        /**
         * ? this code syncs the invisible mesh to the visible one
         * ? when it's moving without user input (after user stops
         * ? dragging or RigidBody is moving)
         */
        if (!isAnimated && rigidBodyRef.current.bodyType() !== 2 && !rigidBodyRef.current.isSleeping() && meshRef.current.parent) {
            // updates position and rotation without influence from parent objects
            const position = meshRef.current.position;
            const physicsPosition = meshRef.current.parent.position;
            interactiveMeshRef.current.position.set(position.x + physicsPosition.x, position.y + physicsPosition.y, position.z + physicsPosition.z);
            interactiveMeshRef.current.setRotationFromEuler(meshRef.current.rotation);
        }
    })

    return (
        <group>
            <RigidBody ref={rigidBodyRef}>
                <mesh key={id}
                      ref={meshRef}
                      onClick={(event) => {
                          event.stopPropagation();
                          onClick && onClick();
                      }}
                      onPointerMissed={(event) => {
                          event.stopPropagation();
                          onClickNotThis && onClickNotThis();
                      }}
                      {...props}>
                    <boxGeometry args={[CardNobleSize.width, CardNobleSize.height, CardNobleSize.depth]}/>
                    <meshBasicMaterial attach="material-0" color={"gray"}/>
                    {/*right*/}
                    <meshBasicMaterial attach="material-1" color={"gray"}/>
                    {/*left*/}
                    <meshBasicMaterial attach="material-2" color={"gray"}/>
                    {/*top*/}
                    <meshBasicMaterial attach="material-3" color={"gray"}/>
                    {/*bottom*/}
                    <meshBasicMaterial attach="material-4" map={textureFront}/>
                    {/*front*/}
                    <meshBasicMaterial attach="material-5" map={textureBack}/>
                    {/*back*/}
                </mesh>
            </RigidBody>

            <group>
                <mesh ref={interactiveMeshRef}
                      visible={false}
                      {...props} >
                    <boxGeometry args={[CardNobleSize.width, CardNobleSize.height, CardNobleSize.depth]}/>
                    <meshBasicMaterial color={"red"}/>
                </mesh>
            </group>
        </group>
    )
})

CardNoble.displayName = "CardNoble";

export default CardNoble