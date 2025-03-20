import React, {forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {
    GemGold,
    GemDiamond,
    GemEmerald,
    GemOnyx,
    GemRuby,
    GemSapphire
} from "@/games/splendor/constants/gem";
import {Group, Mesh, Quaternion, Vector3} from "three";
import {RigidBodyType} from "@dimforge/rapier3d-compat";
import {CylinderCollider, RapierRigidBody, RigidBody} from "@react-three/rapier";
import {TokenGemType} from "@/games/splendor/types/gem";


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
    const [textureGold,
        textureDiamond,
        textureEmerald,
        textureOnyx,
        textureRuby,
        textureSapphire
    ] = useLoader(THREE.TextureLoader, [GemGold.url, GemDiamond.url, GemEmerald.url, GemOnyx.url, GemRuby.url, GemSapphire.url]);
    const [onPhysics, setOnPhysics] = useState(true);
    const groupRef = useRef<Group>(null);
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<Mesh>(null);

    const textureFront = useMemo(() => {
        switch (type) {
            case TokenGemType.GOLD:
                return textureGold
            case TokenGemType.DIAMOND:
                return textureDiamond
            case TokenGemType.EMERALD:
                return textureEmerald
            case TokenGemType.ONYX:
                return textureOnyx
            case TokenGemType.RUBY:
                return textureRuby
            case TokenGemType.SAPPHIRE:
                return textureSapphire
            default:
                throw Error(`Type ${type} not supported`)
        }
    }, [type])
    const color = useMemo(() => {
        switch (type) {
            case TokenGemType.GOLD:
                return GemGold.color
            case TokenGemType.DIAMOND:
                return GemDiamond.color
            case TokenGemType.EMERALD:
                return GemEmerald.color
            case TokenGemType.ONYX:
                return GemOnyx.color
            case TokenGemType.RUBY:
                return GemRuby.color
            case TokenGemType.SAPPHIRE:
                return GemSapphire.color
            default:
                throw Error(`Type ${type} not supported`)
        }
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
                  rotation={[Math.PI / 2, 0, 0]}
            >
                <cylinderGeometry args={[GemTokenSize.size, GemTokenSize.size, GemTokenSize.depth, 32]}/>
                <meshBasicMaterial attach="material-0" color={color}/>
                <meshBasicMaterial attach="material-1" map={textureFront}/>
                <meshBasicMaterial attach="material-2" color={color}/>
            </mesh>

            <RigidBody ref={rigidBodyRef}
                       colliders={false}
                       ccd={true}
                       mass={40}
            >
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

export default GemToken;