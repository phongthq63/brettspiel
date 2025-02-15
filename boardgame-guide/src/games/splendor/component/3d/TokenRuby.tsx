import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemRuby} from "@/games/splendor/constants/gem";


export const TokenRubySize = {
    size: 0.25,
    depth: 0.07
};

interface TokenRubyProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenRuby = forwardRef(({id, onClick, ...props}: TokenRubyProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemRuby.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenRubySize.size, TokenRubySize.size, TokenRubySize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemRuby.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemRuby.color}/>
        </mesh>
    )
})
TokenRuby.displayName = "TokenRuby";

export default TokenRuby;