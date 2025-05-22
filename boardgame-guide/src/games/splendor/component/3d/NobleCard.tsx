import {useFrame, useLoader} from "@react-three/fiber";
import React, {forwardRef, Ref, useImperativeHandle, useRef} from "react";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {Group, Mesh, Quaternion, TextureLoader, Vector3} from "three";
import {NobleDictionary} from "@/games/splendor/data/noble";


export const NobleCardSize = {
    width: 0.6,
    height: 0.6,
    depth: 0.03
}

interface NobleCardProps {
    id: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

const NobleCard = forwardRef(({id, onClick, onClickNotThis, ...props}: NobleCardProps, ref: Ref<any>) => {
    const nobleConfig = NobleDictionary[id]
    const [textureFront, textureBack] = useLoader(TextureLoader, [nobleConfig.url, nobleConfig.urlBack])
    const groupRef = useRef<Group>(null)
    const rigidBodyRef = useRef<RapierRigidBody>(null)
    const meshRef = useRef<Mesh>(null)
    const physics = useRef<boolean>(true)


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
                physics.current = false
                if (rigidBodyRef.current) {
                    rigidBodyRef.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
                }
            },
            startPhysics() {
                physics.current = true
                if (rigidBodyRef.current) {
                    rigidBodyRef.current.setBodyType(RigidBodyType.Dynamic, true);
                }
            }
        })
    });

    const position = new Vector3()
    const rotation = new Quaternion()
    useFrame(() => {
        if (!groupRef.current || !meshRef.current || !rigidBodyRef.current) return;

        // Update rigid body theo position mesh interactive
        if (!physics.current) {
            groupRef.current.getWorldPosition(position)
            rigidBodyRef.current.setNextKinematicTranslation(position)
            groupRef.current.getWorldQuaternion(rotation)
            rigidBodyRef.current.setNextKinematicRotation(rotation)
        }

        /**
         * ? this code syncs the invisible mesh to the visible one
         * ? when it's moving without user input (after user stops
         * ? dragging or RigidBody is moving)
         */
        if (physics.current && rigidBodyRef.current.bodyType() !== RigidBodyType.KinematicPositionBased && !rigidBodyRef.current.isSleeping()) {
            const physicsPosition = rigidBodyRef.current.translation()
            const physicsRotation = rigidBodyRef.current.rotation()

            // Position
            groupRef.current.position.copy(physicsPosition)
            // Rotation
            groupRef.current.setRotationFromQuaternion(new Quaternion(physicsRotation.x, physicsRotation.y, physicsRotation.z, physicsRotation.w))
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

            <RigidBody ref={rigidBodyRef}>
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