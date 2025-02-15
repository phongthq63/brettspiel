import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemGold} from "@/games/splendor/constants/gem";


export const TokenGoldSize = {
    size: 0.25,
    depth: 0.07
};

interface TokenGoldProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenGold = forwardRef(({id, onClick, ...props}: TokenGoldProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemGold.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGoldSize.size, TokenGoldSize.size, TokenGoldSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemGold.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemGold.color}/>
        </mesh>
    )
})
TokenGold.displayName = "TokenGem";

export default TokenGold;