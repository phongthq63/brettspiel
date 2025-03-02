import {Button} from "@mui/material";
import React, {useMemo} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {GameService} from "@/games/splendor/service/splendor.service";


export default function GameActionDescriptionBox() {
    const { connected } = useSocket()
    const { gameId, status,
        currentPlayer,
        currentAction, setCurrentAction,
        isMyTurn
    } = useGameSplendor()


    const playerName = useMemo(() => {
        return isMyTurn ? "Your" : currentPlayer
    }, [isMyTurn, currentPlayer]);

    const textAction = useMemo(() => {
        switch (currentAction?.type) {
            case "gather-gem":
                return "Gather gem: " + currentAction?.gem?.map((gem) => gem.type).toString()
            case "buy-card":
                return "Buy card: "
            case "reserve-card":
                return "Reserve card: "
            case "take-noble":
                return "Take noble: "
            default:
                if (isMyTurn) {
                    return "Take your action"
                } else {
                    return ""
                }
        }
    }, [isMyTurn, currentAction])

    const handlerStartGame = () => {
        if (gameId) {
            GameService.startGame({gameId: gameId})
                .then(response => {
                    console.log("Start game", response)
                })
                .catch(error => {
                    console.log("Start game error", error);
                })
        } else {
            console.log("Data error");
        }
    }

    const handlerSkipAction = () => {
        setCurrentAction(undefined);
        if (gameId) {
            GameService.endTurn({gameId: gameId})
                .then(response => {
                    console.log("Skip action", response)
                })
                .catch(error => {
                    console.log("Skip action error", error);
                })
        } else {
            console.log("Data error");
        }
    }

    return (
        <div className="flex sticky top-0 z-50 min-h-20 bg-cyan-100 rounded-xl space-y-2 p-2">
            {status == 0 && connected && (
                <div className="w-full flex justify-center items-center">
                    <Button variant="contained"
                            color="error"
                            onClick={handlerStartGame}>Start game</Button>
                </div>
            )}
            {status == 1 && (
                <div className="w-full flex flex-col">
                    <div>
                        <h2 className="text-center text-xl">
                            <span className="font-bold text-red-600">{playerName}</span> <span
                            className="italic">turn</span>
                        </h2>
                        {isMyTurn && (
                            <Button className="top-1 right-1"
                                    variant="contained"
                                    color="error"
                                    onClick={handlerSkipAction}
                                    style={{position: "absolute"}}>End turn</Button>
                        )}
                    </div>
                    <h3 className="text-center">{textAction}</h3>
                </div>
            )}
        </div>
    )
}