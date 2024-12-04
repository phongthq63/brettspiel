import React from "react";

interface IFloor {
}

export function Floor({...props}: IFloor) {
    return (
        <mesh {...props}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="lightblue" />
        </mesh>
    )
}