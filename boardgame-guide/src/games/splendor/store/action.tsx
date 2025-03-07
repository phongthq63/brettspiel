import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {TokenGemType} from "@/games/splendor/constants/gem";
import {Euler, Vector3} from "three";


export interface Action {
    type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble" | string
    card?: {
        id: string,
        level: number,
        deck: boolean
    }
    noble?: {id: string}
    gem?: {
        id: string
        type: TokenGemType
        count: number
    }[]
    option?: string[]
}

interface ObjectSelected {
    id: string
    ref: { [key: string]: any }
    animation: gsap.core.Timeline
}

interface GemSelected {
    id: string
    type: TokenGemType
    owner?: string
    oldPosition: Vector3
    oldRotation: Euler
}

const ActionContext = createContext<{
    currentAction: Action | undefined
    setCurrentAction: Dispatch<SetStateAction<Action | undefined>>
    selectedGems: GemSelected[]
    setSelectedGems: Dispatch<SetStateAction<GemSelected[]>>
    selectedObjects: ObjectSelected[]
    setSelectedObjects: Dispatch<SetStateAction<ObjectSelected[]>>
} | undefined>(undefined)

export const GameActionSplendorProvider = ({children}: any) => {
    const [currentAction, setCurrentAction] = useState<Action>()
    const [selectedGems, setSelectedGems] = useState<GemSelected[]>([])
    const [selectedObjects, setSelectedObjects] = useState<ObjectSelected[]>([])

    return (
        <ActionContext.Provider value={{
            currentAction, setCurrentAction,
            selectedGems, setSelectedGems,
            selectedObjects, setSelectedObjects
        }}>
            {children}
        </ActionContext.Provider>
    )
}

export const useGameAction = () => {
    const context = useContext(ActionContext);
    if (context == undefined) {
        throw new Error("useGameAction must be used within a GameActionSplendorProvider");
    }
    return context;
}