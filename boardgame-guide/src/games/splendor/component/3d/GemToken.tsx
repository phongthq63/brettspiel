import React, {forwardRef, Ref, useImperativeHandle, useMemo, useRef} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {Group, Mesh, Quaternion, TextureLoader, Vector3} from "three";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {CylinderCollider, RapierRigidBody, RigidBody} from "@react-three/rapier";
import {TokenGemType} from "@/games/splendor/types/gem";
import {GemDictionary} from "@/games/splendor/constants/gem";


export const GemTokenSize = {
    size: 0.25,
    depth: 0.07
}

interface GemTokenProps {
    id: string
    type: TokenGemType
    onClick?: () => void
    position?: any
    rotation?: any
}

const GemToken = forwardRef(({id, type, onClick, ...props}: GemTokenProps, ref: Ref<any>) => {
    const gemConfig = GemDictionary[type]
    const [textureFront] = useLoader(TextureLoader, [gemConfig.url])
    const groupRef = useRef<Group>(null)
    const rigidBodyRef = useRef<RapierRigidBody>(null)
    const meshRef = useRef<Mesh>(null)
    const physics = useRef<boolean>(true)

    const color = useMemo(() => {
        return GemDictionary[type].color
    }, [type])


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
        <group ref={groupRef} {...props}>
            <mesh key={id}
                  ref={meshRef}
                  onClick={(event) => {
                      event.stopPropagation();
                      onClick?.();
                  }}
                  rotation={[Math.PI / 2, 0, 0]}
            >
                <cylinderGeometry args={[GemTokenSize.size, GemTokenSize.size, GemTokenSize.depth, 32]}/>
                <meshBasicMaterial attach="material-0" color={color}/>
                <meshBasicMaterial attach="material-1" map={textureFront}/>
                <meshBasicMaterial attach="material-2" color={color}/>
            </mesh>

            <RigidBody ref={rigidBodyRef}
                       colliders={false}>
                <CylinderCollider args={[GemTokenSize.depth / 2, GemTokenSize.size]}
                                  rotation={[Math.PI / 2, 0, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[GemTokenSize.size, GemTokenSize.size, GemTokenSize.depth, 32]}/>
                        <meshBasicMaterial visible={false}/>
                    </mesh>
                </CylinderCollider>
            </RigidBody>
        </group>
    )
})
GemToken.displayName = "TokenGem";

export default GemToken