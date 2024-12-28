import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

export const CARD_NOBLE_SIZE = {
    width: 0.6,
    height: 0.6,
    depth: 0.03
};

interface ICardNoble {
    cardRef?: React.Ref<any>
    url: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

export function CardNoble({cardRef, url, onClick, onClickNotThis, ...props}: ICardNoble) {
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, "/game/splendor/noble/noble-back.jpg"]);

    return (
        <mesh ref={cardRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              onPointerMissed={(event) => {
                  event.stopPropagation();
                  onClickNotThis && onClickNotThis();
              }}
              {...props}>
            <boxGeometry args={[CARD_NOBLE_SIZE.width, CARD_NOBLE_SIZE.height, CARD_NOBLE_SIZE.depth]}/>
            <meshBasicMaterial attach="material-0" color={"gray"}/>
            {/*right*/}
            <meshBasicMaterial attach="material-1" color={"gray"}/>
            {/*left*/}
            <meshBasicMaterial attach="material-2" color={"gray"}/>
            {/*top*/}
            <meshBasicMaterial attach="material-3" color={"gray"}/>
            {/*bottom*/}
            <meshBasicMaterial attach="material-4" map={textureFront}/>
            {/*front*/}
            <meshBasicMaterial attach="material-5" map={textureBack}/>
            {/*back*/}
        </mesh>
    )
}