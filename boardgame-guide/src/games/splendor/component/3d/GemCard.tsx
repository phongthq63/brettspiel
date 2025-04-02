import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {Group, Mesh, Quaternion, TextureLoader, Vector3} from "three";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {CardDictionary} from "@/games/splendor/constants/card";


export const GemCardSize = {
    width: 0.72,
    height: 1,
    depth: 0.01
};

interface GemCardProps {
    id: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

const GemCard = forwardRef(({id, onClick, onClickNotThis, ...props}: GemCardProps, ref: Ref<any>) => {
    const cardConfig = CardDictionary[id]
    const [textureFront, textureBack] = useLoader(TextureLoader, [cardConfig.url, cardConfig.urlBack]);
    const [onPhysics, setOnPhysics] = useState(true)
    const groupRef = useRef<Group>(null)
    const rigidBodyRef = useRef<RapierRigidBody>(null)
    const meshRef = useRef<Mesh>(null)


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
        <group ref={groupRef} {...props}>
            <mesh key={id}
                  ref={meshRef}
                  onClick={(event) => {
                      event.stopPropagation();
                      onClick?.();
                  }}
                  onPointerMissed={(event) => {
                      event.stopPropagation();
                      onClickNotThis?.();
                  }}
            >
                <boxGeometry args={[GemCardSize.width, GemCardSize.height, GemCardSize.depth]}/>
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
                {/*<CuboidCollider args={[GemCardSize.width / 2, GemCardSize.height / 2, GemCardSize.depth / 2]} />*/}
                <mesh>
                    <boxGeometry args={[GemCardSize.width, GemCardSize.height, GemCardSize.depth]}/>
                    <meshBasicMaterial visible={false}/>
                </mesh>
            </RigidBody>
        </group>
    )
})

GemCard.displayName = "GemCard";

export default GemCard