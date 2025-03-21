import React from "react";
import {RigidBody} from "@react-three/rapier";

interface GamePlaneProps {
    position?: [number, number, number]
}

function GamePlane({...props}: GamePlaneProps) {
    return (
        <RigidBody type={"fixed"}>
            <mesh {...props}>
                <planeGeometry args={[500, 500]}/>
                <meshStandardMaterial color="lightblue"/>
            </mesh>
        </RigidBody>
    )
}

export default GamePlane;