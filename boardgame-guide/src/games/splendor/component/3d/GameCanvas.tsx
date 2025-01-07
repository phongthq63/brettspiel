import {IngameSpace} from "@/games/splendor/component/3d/IngameSpace";
import {Canvas} from "@react-three/fiber";
import React, {memo} from "react";
import {OrbitControls} from "@react-three/drei";

function GameCanvas() {
    return (
        <Canvas className="rounded"
                camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 6], rotation: [0, 0, 0]}}>
            <OrbitControls enabled={true} />
            <ambientLight intensity={0.3}/>
            <IngameSpace/>
        </Canvas>
    )
}

export default memo(GameCanvas);