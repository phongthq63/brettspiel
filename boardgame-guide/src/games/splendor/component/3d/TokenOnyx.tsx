import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemOnyx} from "@/games/splendor/constants/gem";


export const TokenOnyxSize = {
    size: 0.25,
    depth: 0.07
};

interface TokenOnyxProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenOnyx = forwardRef(({id, onClick, ...props}: TokenOnyxProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemOnyx.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenOnyxSize.size, TokenOnyxSize.size, TokenOnyxSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemOnyx.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemOnyx.color}/>
        </mesh>
    )
})
TokenOnyx.displayName = "TokenOnyx";

export default TokenOnyx;