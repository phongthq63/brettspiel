"use client";

import {Canvas} from "@react-three/fiber";
import React, {useState} from "react";
import {IngameScene} from "./IngameScene";
import {IngameSplendorProvider} from "../store/ingame";
import {SocketManager} from "../../../components/SocketManager";

let b = 0;

export function IngameView() {

    const [a, setA] = useState(0);

    const test = () => {
        setA(a + 1);
        b = b + 1;
        console.log(`a: ${a} ${b}`)
    };

    return (
        <div style={{ width: "80vw", height: "80vh" }}>
            <SocketManager />
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5], rotation:[0,0,0]}}>
                <IngameSplendorProvider>
                    <IngameScene/>
                </IngameSplendorProvider>
            </Canvas>
            <buttion onClick={test}>Test</buttion>
        </div>
    )
}