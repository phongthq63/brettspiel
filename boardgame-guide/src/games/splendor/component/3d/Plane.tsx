import React from "react";

interface PlaneProps {
    position?: [number, number, number]
}

function Plane({...props}: PlaneProps) {
    return (
        <mesh {...props}>
            <planeGeometry args={[500, 500]}/>
            <meshStandardMaterial color="lightblue"/>
        </mesh>
    )
}

export default Plane;