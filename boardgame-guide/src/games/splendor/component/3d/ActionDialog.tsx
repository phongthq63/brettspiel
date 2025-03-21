import React, {memo, useCallback, useMemo} from "react";
import {Button} from "@mui/material";
import GameBoard from "@/games/splendor/hoc/GameBoard";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useGameController} from "@/games/splendor/hooks/useGameController";


interface ActionDialogProps {
    open: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    onClose?: () => void
}

const ActionDialog = ({open, position, rotation, onClose}: ActionDialogProps) => {
    const {currentAction} = useGameSplendor();
    const {selectAction, confirmAction, cancelAction} = useGameController()


    const handlerClose = useCallback(() => {
        cancelAction()
        onClose?.()
    }, [])

    const textAction = useMemo(() => {
        switch (currentAction?.type) {
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
    }, [currentAction])

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
                    {currentAction && (
                        currentAction.type == "option-action" ? (currentAction.option?.map(option => (
                            <Button key={option}
                                    variant="contained"
                                    color="success"
                                    onClick={() => selectAction({...currentAction, type: option})}
                                    style={{textTransform: "none"}}>
                                {textButtonOption(option)}
                            </Button>
                        ))) : (
                            <Button variant="contained"
                                    color="success"
                                    onClick={() => confirmAction(currentAction)}
                                    style={{textTransform: "none"}}>
                                Confirm
                            </Button>
                        )
                    )}
                    <Button variant="contained"
                            color="error"
                            onClick={handlerClose}
                            style={{textTransform: "none"}}>
                        Cancel
                    </Button>
                </div>
            </div>
        </GameBoard>
    ))
}

export default memo(ActionDialog)