import {Html} from "@react-three/drei";
import React, {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";


interface GameBoardProps {
    position: [number, number, number]
    rotation: [number, number, number]
    onClickNotThis?: () => void
    children: any
}

const GameBoard = ({position, rotation, onClickNotThis, children, ...props}: GameBoardProps) => {
    const {gl} = useThree();
    const ref = useRef<any>(undefined);


    // Click Outside Detection
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickNotThis?.()
            }
        }

        gl.domElement.addEventListener("click", handleClickOutside)
        return () => gl.domElement.removeEventListener("click", handleClickOutside)
    }, [gl, onClickNotThis])


    return (
        <Html center
              transform
              occlude
              position={position}
              rotation={rotation}
              distanceFactor={1}
              zIndexRange={[0]}
              ref={ref}
              {...props}>
            {children}
        </Html>
    )
}

export default GameBoard;