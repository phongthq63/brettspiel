import React from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";

export const BoardSize = {
    width: 14,
    height: 10,
    depth: 0.25
};

interface BoardProps {
    position?: [number, number, number],
    onClick?: () => void
}

function Board({onClick, ...props}: BoardProps) {
    const texture = useLoader(THREE.TextureLoader, "/game/splendor/board.jpg");

    return (
        <RigidBody type={"fixed"}>
            <mesh onClick={(event) => {
                event.stopPropagation();
                onClick && onClick();
            }}
                  {...props}>
                <boxGeometry args={[BoardSize.width, BoardSize.height, BoardSize.depth]}/>
                <meshBasicMaterial attach="material-0" map={texture}/>
                {/*right*/}
                <meshBasicMaterial attach="material-1" map={texture}/>
                {/*left*/}
                <meshBasicMaterial attach="material-2" map={texture}/>
                {/*top*/}
                <meshBasicMaterial attach="material-3" map={texture}/>
                {/*bottom*/}
                <meshBasicMaterial attach="material-4" map={texture}/>
                {/*front*/}
                <meshBasicMaterial attach="material-5" map={texture}/>
                {/*back*/}
            </mesh>
        </RigidBody>
    )
}

export default Board;