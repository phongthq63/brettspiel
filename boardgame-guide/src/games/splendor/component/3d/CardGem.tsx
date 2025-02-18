import * as THREE from 'three'
import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {Group, Mesh, Quaternion, Vector3} from "three";
import {RigidBodyType} from "@dimforge/rapier3d-compat";


const CardRealSize = {
    width: 63.5,
    height: 88
};

export const CardGemSize = {
    width: 0.72,
    height: 1,
    depth: 0.01
};

interface CardGemProps {
    id: string
    level: number
    url: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

const CardGem = forwardRef(({id, level, url, onClick, onClickNotThis, ...props}: CardGemProps, ref: Ref<any>) => {
    const [textureFront, textureBackLevel1, textureBackLevel2, textureBackLevel3] = useLoader(THREE.TextureLoader, [url, '/game/splendor/card/1/card1-back.jpg', '/game/splendor/card/2/card2-back.jpg', '/game/splendor/card/3/card3-back.jpg']);
    const [onPhysics, setOnPhysics] = useState(true);
    const groupRef = useRef<Group>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<Mesh>(null);

    const textureBack = () => {
        switch (level) {
            case 1:
                return textureBackLevel1
            case 2:
                return textureBackLevel2
            case 3:
                return textureBackLevel3
            default:
                throw Error(`Level ${level} not supported`)
        }
    }


    useImperativeHandle(ref, () => {
        if (!groupRef.current) return null;

        return Object.assign(groupRef.current, {
            setPosition(position: [number, number, number]) {
                if (groupRef.current && rigidBodyRef.current) {
                    const worldPosition = new Vector3()
                    groupRef.current.position.fromArray(position);
                    groupRef.current.getWorldPosition(worldPosition);
                    rigidBodyRef.current.setTranslation(worldPosition, true)
                }
            },
            setRotation(rotation: [number, number, number]) {
                if (groupRef.current && rigidBodyRef.current) {
                    const worldRotation = new Quaternion()
                    groupRef.current.rotation.fromArray(rotation);
                    groupRef.current.getWorldQuaternion(worldRotation);
                    rigidBodyRef.current.setRotation(worldRotation, true)
                }
            },
            stopPhysics() {
                setOnPhysics(false)
                if (rigidBodyRef.current) {
                    rigidBodyRef.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
                }
            },
            startPhysics() {
                setOnPhysics(true)
                if (rigidBodyRef.current) {
                    rigidBodyRef.current.setBodyType(RigidBodyType.Dynamic, true);
                }
            }
        })
    });

    useFrame(() => {
        if (!groupRef.current || !meshRef.current || !rigidBodyRef.current) return;

        // Update rigid body theo position mesh interactive
        if (!onPhysics) {
            const position = new Vector3()
            groupRef.current.getWorldPosition(position)
            rigidBodyRef.current.setTranslation(position, false)

            const rotation = new Quaternion()
            groupRef.current.getWorldQuaternion(rotation)
            rigidBodyRef.current.setRotation(rotation, false)
        }

        /**
         * ? this code syncs the invisible mesh to the visible one
         * ? when it's moving without user input (after user stops
         * ? dragging or RigidBody is moving)
         */
        if (onPhysics && rigidBodyRef.current.bodyType() !== 2 && !rigidBodyRef.current.isSleeping()) {
            const physicsPosition = rigidBodyRef.current.translation()
            groupRef.current.position.set(physicsPosition.x, physicsPosition.y, physicsPosition.z);

            const physicsRotation = rigidBodyRef.current.rotation()
            groupRef.current.setRotationFromQuaternion(new Quaternion(physicsRotation.x, physicsRotation.y, physicsRotation.z, physicsRotation.z));
        }
    })

    return (
        <group ref={groupRef} {...props}>
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
            >
                <boxGeometry args={[CardGemSize.width, CardGemSize.height, CardGemSize.depth]}/>
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
                <meshBasicMaterial attach="material-5" map={textureBack()}/>
                {/*back*/}
            </mesh>

            <RigidBody ref={rigidBodyRef}>
                <mesh>
                    <boxGeometry args={[CardGemSize.width, CardGemSize.height, CardGemSize.depth]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>
            </RigidBody>
        </group>
    )
})

CardGem.displayName = "CardGem";

export default CardGem;