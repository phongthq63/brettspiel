import * as THREE from 'three'
import React from "react";
import {useLoader} from "@react-three/fiber";


const CardRealSize = {
    width: 63.5,
    height: 88
};

export const CardGemSize = {
    width: 0.72,
    height: 1,
    depth: 0.01
};

interface CardGemProps {
    cardRef?: React.Ref<any>
    level: number
    url: string
    onClick?: () => void
    onClickNotThis?: () => void
    position?: any
    rotation?: any
}

export function CardGem({cardRef, level, url, onClick, onClickNotThis, ...props}: CardGemProps) {
    let urlBack;
    switch (level) {
        case 1:
            urlBack = '/game/splendor/card/1/card1-back.jpg'
            break
        case 2:
            urlBack = '/game/splendor/card/2/card2-back.jpg'
            break
        case 3:
            urlBack = '/game/splendor/card/3/card3-back.jpg'
            break
        default:
            throw Error("Invalid level number")
    }
    const [textureFront, textureBack] = useLoader(THREE.TextureLoader, [url, urlBack]);

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
            <boxGeometry args={[CardGemSize.width, CardGemSize.height, CardGemSize.depth]}/>
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
