"use client";

import {Canvas} from "@react-three/fiber";
import React from "react";
import {IngameScene} from "./IngameScene";
import {IngameSplendorProvider} from "../store/ingame";


export function IngameView() {
    return (
        <div style={{ width: "80vw", height: "80vh" }}>
            {/*<SocketManager />*/}
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5], rotation:[0,0,0]}}>
                <IngameSplendorProvider>
                    <IngameScene/>
                </IngameSplendorProvider>
            </Canvas>
        </div>
    )
}