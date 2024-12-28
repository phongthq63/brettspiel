import React from "react";

interface IFloor {
    position?: [number, number, number]
}

function Floor({...props}: IFloor) {
    return (
        <mesh {...props}>
            <planeGeometry args={[100, 100]}/>
            <meshBasicMaterial color="lightblue"/>
        </mesh>
    )
}

export default Floor;