import React, {memo, useMemo} from "react";
import {Button} from "@mui/material";
import GameBoard from "@/games/splendor/hoc/GameBoard";
import {TokenGemType} from "@/games/splendor/types/gem";


export interface ActionData {
    type: "gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble"
    option?: ("gather-gem" | "reserve-card" | "buy-card" | "option-action" | "take-noble")[]
    card?: {
        id: string,
        level: number,
        deck?: boolean,
        ownerId?: string,
        cost: {
            gold?: number
            onyx?: number
            ruby?: number
            emerald?: number
            sapphire?: number
            diamond?: number
        }
    }
    noble?: {id: string}
    gem?: {
        id: string
        type: TokenGemType
        count: number
    }[]
}

interface ActionDialogProps {
    open: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    data: ActionData | undefined
    onCancelAction?: () => void
    onConfirmAction?: (data: ActionData) => void
    onSelectAction?: (data: ActionData) => void
}

const ActionDialog = ({open, position, rotation, data, onCancelAction, onConfirmAction, onSelectAction}: ActionDialogProps) => {

    const textAction = useMemo(() => {
        switch (data?.type) {
            case "take-noble":
                return "Take noble"
            case "option-action":
                return "Choose a action"
            case "buy-card":
                return "Buy card"
            case "reserve-card":
                return "Reserve card"
            case "gather-gem":
                return "Gather gem"
        }
    }, [data])

    const textButtonOption = useMemo(() => (type: string) => {
        switch (type) {
            case "buy-card":
                return "Buy card"
            case "reserve-card":
                return "Reserve card"
            default:
                return ""
        }
    }, [])

    return (open && (
        <GameBoard position={position} rotation={rotation}>
            <div className="bg-cyan-100 p-4 rounded-md">
                <h2 className="text-xl text-center mb-4">{textAction}</h2>
                {/*{data.type == "buy-card" && (*/}
                {/*    <BuyCardQuantity cost={data.card?.cost || {}}*/}
                {/*                     base={playerCard(playerCards[currentPlayer])}*/}
                {/*                     gold={playerGems[currentPlayer].gold.length}*/}
                {/*    />*/}
                {/*)}*/}

                <div className="flex justify-center space-x-2">
                    {data && (
                        data.type == "option-action" ? (data.option?.map(option => (
                            <Button key={option}
                                    variant="contained"
                                    color="success"
                                    onClick={() => onSelectAction?.({...data, type: option})}
                                    style={{textTransform: "none"}}>
                                {textButtonOption(option)}
                            </Button>
                        ))) : (
                            <Button variant="contained"
                                    color="success"
                                    onClick={() => onConfirmAction?.(data)}
                                    style={{textTransform: "none"}}>
                                Confirm
                            </Button>
                        )
                    )}
                    <Button variant="contained"
                            color="error"
                            onClick={onCancelAction}
                            style={{textTransform: "none"}}>
                        Cancel
                    </Button>
                </div>
            </div>
        </GameBoard>
    ))
}

export default memo(ActionDialog)