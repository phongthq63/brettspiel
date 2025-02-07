import React, {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {RapierRigidBody, RigidBody} from "@react-three/rapier";
import {Mesh, Vector3} from "three";
import {useFrame} from "@react-three/fiber";
import {RigidBodyType} from "@dimforge/rapier3d-compat";


let startAnimatedPosition: Vector3;

const AnimationRigidBody = forwardRef(({ children }: { children: React.ReactElement }, ref: Ref<any>) => {
    const [isAnimated, setIsAnimated] = useState(false)
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<Mesh>();
    const interactiveMeshRef = useRef<Mesh>();


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
        };
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
            {React.cloneElement(children, { ref: interactiveMeshRef, visible: false })}

            {/* handle physics */}
            <RigidBody ref={rigidBodyRef}>
                {React.cloneElement(children, { ref: meshRef })}
            </RigidBody>
        </group>
    )
})

AnimationRigidBody.displayName = "AnimationRigidBody";

export default AnimationRigidBody;