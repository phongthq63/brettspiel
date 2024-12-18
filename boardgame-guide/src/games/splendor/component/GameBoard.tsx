import React from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";

export const BoardSize = {
    width: 14,
    height: 10,
    depth: 0.25
};

interface IGameBoard {
    position?: [number, number, number]
}

export function GameBoard({...props}: IGameBoard) {
    const texture = useLoader(THREE.TextureLoader, "/game/splendor/board.jpg");
    return (
        <group>
            <mesh {...props}>
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
        </group>
    )
}