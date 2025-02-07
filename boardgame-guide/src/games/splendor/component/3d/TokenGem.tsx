import React from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {GEM_DIAMOND, GEM_EMERALD, GEM_GOLD, GEM_ONYX, GEM_RUBY, GEM_SAPPHIRE} from "../../constants/gem";

export const TokenGemSize = {
    size: 0.25,
    depth: 0.07
};

interface ITokenGem {
    tokenRef?: React.Ref<any>,
    onClick?: () => void
    position?: any
}

export function TokenGold({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_GOLD.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_GOLD.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_GOLD.color}/>
        </mesh>
    )
}

export function TokenOnyx({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_ONYX.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_ONYX.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_ONYX.color}/>
        </mesh>
    )
}

export function TokenRuby({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_RUBY.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_RUBY.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_RUBY.color}/>
        </mesh>
    )
}

export function TokenEmerald({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_EMERALD.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_EMERALD.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_EMERALD.color}/>
        </mesh>
    )
}

export function TokenSapphire({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_SAPPHIRE.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_SAPPHIRE.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_SAPPHIRE.color}/>
        </mesh>
    )
}

export function TokenDiamond({tokenRef, onClick, ...props}: ITokenGem) {
    const textureFront = useLoader(THREE.TextureLoader, GEM_DIAMOND.url);

    return (
        <mesh ref={tokenRef}
              onClick={(event) => {
                  event.stopPropagation();
                  onClick && onClick();
              }}
              rotation={[Math.PI / 2, 0, 0]}
              {...props}>
            <cylinderGeometry args={[TokenGemSize.size, TokenGemSize.size, TokenGemSize.depth, 32]}/>
            <meshBasicMaterial attach="material-0" color={GEM_DIAMOND.color}/>
            <meshBasicMaterial attach="material-1" map={textureFront}/>
            <meshBasicMaterial attach="material-2" color={GEM_DIAMOND.color}/>
        </mesh>
    )
}
