import React from "react";
import Board, {BoardSize} from "./Board";
import Floor from "./Floor";
import PlayingSpace from "@/games/splendor/component/3d/PlayingSpace";


export function IngameSpace() {
    return (
        <>
            <Floor position={[0, 0, -10]}/>
            <Board position={[0, 0, -BoardSize.depth / 2]}/>
            <PlayingSpace/>
        </>
    )
}