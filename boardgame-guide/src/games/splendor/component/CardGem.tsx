import * as THREE from 'three'
import React, {useRef} from "react";
import {useLoader} from "@react-three/fiber";
import {CARD_BACKSIDE_LEVEL_1, CARD_BACKSIDE_LEVEL_2, CARD_BACKSIDE_LEVEL_3} from "../constants/card";

const CardRealSize = {
    width: 63.5,
    height: 88
};

export const CARD_GEM_SIZE = {
    width: 0.72,
    height: 1,
    depth: 0.01
};

interface ICardGem {
    url: string
    cardRef?: useRef<any>
}

export function CardGemLevel1({url, cardRef, ...props}: ICardGem) {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, CARD_BACKSIDE_LEVEL_1]);

    return (
        <mesh ref={cardRef} {...props}>
            <boxGeometry args={[CARD_GEM_SIZE.width, CARD_GEM_SIZE.height, CARD_GEM_SIZE.depth]} />
            <meshBasicMaterial attach="material-0" color={"gray"}/> {/*right*/}
            <meshBasicMaterial attach="material-1" color={"gray"}/> {/*left*/}
            <meshBasicMaterial attach="material-2" color={"gray"}/> {/*top*/}
            <meshBasicMaterial attach="material-3" color={"gray"}/> {/*bottom*/}
            <meshBasicMaterial attach="material-4" map={textureFront} /> {/*front*/}
            <meshBasicMaterial attach="material-5" map={textureBack} /> {/*back*/}
        </mesh>
    )
}

export function CardGemLevel2({url, cardRef, ...props}: ICardGem) {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, CARD_BACKSIDE_LEVEL_2]);

    return (
        <mesh ref={cardRef} {...props}>
            <boxGeometry args={[CARD_GEM_SIZE.width, CARD_GEM_SIZE.height, CARD_GEM_SIZE.depth]} />
            <meshBasicMaterial attach="material-0" color={"gray"}/> {/*right*/}
            <meshBasicMaterial attach="material-1" color={"gray"}/> {/*left*/}
            <meshBasicMaterial attach="material-2" color={"gray"}/> {/*top*/}
            <meshBasicMaterial attach="material-3" color={"gray"}/> {/*bottom*/}
            <meshBasicMaterial attach="material-4" map={textureFront} /> {/*front*/}
            <meshBasicMaterial attach="material-5" map={textureBack} /> {/*back*/}
        </mesh>
    )
}

export function CardGemLevel3({url, cardRef, ...props}: ICardGem) {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, CARD_BACKSIDE_LEVEL_3]);

    return (
        <mesh ref={cardRef} {...props}>
            <boxGeometry args={[CARD_GEM_SIZE.width, CARD_GEM_SIZE.height, CARD_GEM_SIZE.depth]} />
            <meshBasicMaterial attach="material-0" color={"gray"}/> {/*right*/}
            <meshBasicMaterial attach="material-1" color={"gray"}/> {/*left*/}
            <meshBasicMaterial attach="material-2" color={"gray"}/> {/*top*/}
            <meshBasicMaterial attach="material-3" color={"gray"}/> {/*bottom*/}
            <meshBasicMaterial attach="material-4" map={textureFront} /> {/*front*/}
            <meshBasicMaterial attach="material-5" map={textureBack} /> {/*back*/}
        </mesh>
    )
}
