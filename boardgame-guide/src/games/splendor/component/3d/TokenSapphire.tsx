import React, {forwardRef, Ref} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GemSapphire} from "@/games/splendor/constants/gem";


export const TokenSapphireSize = {
    size: 0.25,
    depth: 0.07
};

interface TokenSapphireProps {
    id: string
    onClick?: () => void
    position?: any
}

const TokenSapphire = forwardRef(({id, onClick, ...props}: TokenSapphireProps, ref: Ref<any>) => {
    const textureFront = useLoader(THREE.TextureLoader, GemSapphire.url);

    return (
        <mesh key={id}
              ref={ref}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenSapphireSize.size, TokenSapphireSize.size, TokenSapphireSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GemSapphire.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GemSapphire.color}/>
        </mesh>
    )
})
TokenSapphire.displayName = "TokenSapphire";

export default TokenSapphire;