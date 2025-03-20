import React from "react";

interface GamePlaneProps {
    position?: [number, number, number]
}

function GamePlane({...props}: GamePlaneProps) {
    return (
        <mesh {...props}>
            <planeGeometry args={[500, 500]}/>
            <meshStandardMaterial color="lightblue"/>
        </mesh>
    )
}

export default GamePlane;