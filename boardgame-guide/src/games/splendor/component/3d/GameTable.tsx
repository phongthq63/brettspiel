import React, {memo} from "react";
import {useLoader} from "@react-three/fiber";
import {RigidBody} from "@react-three/rapier";
import {TextureLoader} from "three";

export const GameTableSize = {
    width: 18,
    height: 10,
    depth: 0.25
};

interface GameTableProps {
    position?: [number, number, number],
    onClick?: () => void
}

function GameTable({onClick, ...props}: GameTableProps) {
    const texture = useLoader(TextureLoader, "/game/splendor/board.jpg");

    return (
        <RigidBody type={"fixed"}>
            <mesh onClick={(event) => {
                event.stopPropagation();
                onClick?.();
            }}
                  {...props}>
                <boxGeometry args={[GameTableSize.width, GameTableSize.height, GameTableSize.depth]}/>
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

export default memo(GameTable)