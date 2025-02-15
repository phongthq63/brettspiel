import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemDiamond} from "@/games/splendor/constants/gem";


export const TokenDiamondSize = {
    size: 0.25,
    depth: 0.07
};

interface TokenDiamondProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenDiamond = forwardRef(({id, onClick, ...props}: TokenDiamondProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemDiamond.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenDiamondSize.size, TokenDiamondSize.size, TokenDiamondSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemDiamond.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemDiamond.color}/>
        </mesh>
    )
})
TokenDiamond.displayName = "TokenDiamond";

export default TokenDiamond;