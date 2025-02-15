import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemEmerald} from "@/games/splendor/constants/gem";


export const TokenEmeraldSize = {
    size: 0.25,
    depth: 0.07
};

interface TokenEmeraldProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenEmerald = forwardRef(({id, onClick, ...props}: TokenEmeraldProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemEmerald.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenEmeraldSize.size, TokenEmeraldSize.size, TokenEmeraldSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemEmerald.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemEmerald.color}/>
        </mesh>
    )
})
TokenEmerald.displayName = "TokenEmerald";

export default TokenEmerald;