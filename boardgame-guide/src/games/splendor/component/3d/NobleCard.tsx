import {useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {Group, Mesh, Quaternion, Vector3} from "three";


export const NobleCardSize = {
    width: 0.6,
    height: 0.6,
    depth: 0.03
}

interface NobleCardProps {
    id: string
    url: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

const NobleCard = forwardRef(({id, url, onClick, onClickNotThis, ...props}: NobleCardProps, ref: Ref<any>) => {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, "/game/splendor/noble/noble-back.jpg"]);
    const [onPhysics, setOnPhysics] = useState(true);
    const groupRef = useRef<Group>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<Mesh>(null);


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
            rigidBodyRef.current.setNextKinematicTranslation(position)

            const rotation = new Quaternion()
            groupRef.current.getWorldQuaternion(rotation)
            rigidBodyRef.current.setNextKinematicRotation(rotation)
        }

        /**
         * ? this code syncs the invisible mesh to the visible one
         * ? when it's moving without user input (after user stops
         * ? dragging or RigidBody is moving)
         */
        if (onPhysics && rigidBodyRef.current.bodyType() !== 2 && !rigidBodyRef.current.isSleeping()) {
            const physicsPosition = rigidBodyRef.current.translation()
            const physicsRotation = rigidBodyRef.current.rotation()
            const physicsQuaternion = new Quaternion(physicsRotation.x, physicsRotation.y, physicsRotation.z, physicsRotation.w)

            // Position
            groupRef.current.position.copy(physicsPosition)
            // Rotation
            groupRef.current.setRotationFromQuaternion(physicsQuaternion)
        }
    })

    return (
        <group key={id}
               ref={groupRef}
               {...props}>
            <mesh ref={meshRef}
                  onClick={(event) => {
                      event.stopPropagation();
                      onClick?.()
                  }}
                  onPointerMissed={(event) => {
                      event.stopPropagation();
                      onClickNotThis?.();
                  }}
            >
                <boxGeometry args={[NobleCardSize.width, NobleCardSize.height, NobleCardSize.depth]}/>
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

            <RigidBody ref={rigidBodyRef}
                       ccd={true}>
                <mesh>
                    <boxGeometry args={[NobleCardSize.width, NobleCardSize.height, NobleCardSize.depth]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>
            </RigidBody>
        </group>
    )
})

NobleCard.displayName = "CardNoble";

export default NobleCard