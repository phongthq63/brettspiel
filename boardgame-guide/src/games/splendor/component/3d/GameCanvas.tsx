import {Canvas} from "@react-three/fiber";
import React, {memo, Suspense} from "react";
import PlaySpace from "@/games/splendor/component/3d/PlaySpace";
import {Physics} from "@react-three/rapier";
import {SharedRefProvider} from "@/games/splendor/store/ref";


function GameCanvas() {
    return (
        <Canvas className="rounded"
                camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 6], rotation: [0, 0, 0]}}
                shadows
        >
            <Suspense fallback={null}>
                <Physics gravity={[0, 0, -1]} debug={true}>
                    <SharedRefProvider>
                        <PlaySpace/>
                    </SharedRefProvider>
                </Physics>
            </Suspense>
        </Canvas>
    )
}

export default memo(GameCanvas);