import React, {useCallback, useMemo} from "react";
import GameBoard from "@/games/splendor/hoc/GameBoard";
import {useGameController} from "@/games/splendor/hooks/useGameController";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useShallow} from "zustand/react/shallow";
import {Button} from "@heroui/react";


interface ActionDialogProps {
    open: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    onClose?: () => void
}

const ActionDialog = ({open, position, rotation, onClose}: ActionDialogProps) => {
    const {selectAction, confirmAction, cancelAction} = useGameController()
    const currentAction = useGameStore(useShallow((state) => state.currentAction))


    const handlerCancelAction = useCallback(() => {
        cancelAction()
        onClose?.()
    }, [cancelAction, onClose])

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
                <div className="flex justify-center space-x-2">
                    {currentAction && (
                        currentAction.type == "option-action" ? (currentAction.option?.map(option => (
                            <Button key={option}
                                    color="success"
                                    onClick={() => selectAction({...currentAction, type: option})}
                                    style={{textTransform: "none"}}>
                                {textButtonOption(option)}
                            </Button>
                        ))) : (
                            <Button
                                color="success"
                                onPress={() => confirmAction(currentAction)}
                                style={{textTransform: "none"}}
                            >
                                Confirm
                            </Button>
                        )
                    )}
                    <Button
                        color="danger"
                        onPress={handlerCancelAction}
                        style={{textTransform: "none"}}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </GameBoard>
    ))
}

export default ActionDialog