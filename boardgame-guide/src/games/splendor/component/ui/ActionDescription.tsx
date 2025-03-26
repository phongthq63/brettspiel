import {Button} from "@mui/material";
import React, {useMemo} from "react";
import {useGameSplendor} from "@/games/splendor/store/game.context";
import {useSocket} from "@/store/socket";
import {useGameActions} from "@/games/splendor/hooks/useGameActions";


export default function ActionDescription() {
    const { connected } = useSocket()
    const {
        status,
        currentPlayer,
        currentAction,
        isMyTurn
    } = useGameSplendor()
    const {startGame, endTurn} = useGameActions()

    const playerName = useMemo(() => {
        return isMyTurn ? "Your" : currentPlayer
    }, [isMyTurn, currentPlayer]);

    const textAction = useMemo(() => {
        switch (currentAction?.type) {
            case "gather-gem":
                const gems = [...(currentAction?.gem?.reduce(
                    (map, item) => map.set(item.type, (map.get(item.type) || 0) + item.count),
                    new Map<string, number>()
                ) || []).entries()]
                    .filter(([, count]) => count !== 0)
                const gemsTake = gems.filter(([, count]) => count > 0)
                    .map(([type]) => type)
                    .toString()
                const gemsReturn = gems.filter(([, count]) => count < 0)
                const text = `Gather gem: ${gemsTake}`
                if (gemsReturn && gemsReturn.length > 0) {
                    return `${text} \nReturn: ${gemsReturn.map(([type]) => type).toString()}`
                } else {
                    return text
                }
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

    return (
        <>
            {status != undefined && connected && (
                <div className="flex absolute w-full bottom-0 bg-cyan-100 rounded-xl space-y-2 p-2">
                    {status == 0 && (
                        <div className="w-full flex justify-center items-center">
                            <Button variant="contained"
                                    color="error"
                                    onClick={startGame}>Start game</Button>
                        </div>
                    )}
                    {status == 1 && (
                        <div className="w-full flex flex-col">
                            <div>
                                {isMyTurn && (
                                    <Button className="right-1 top-1"
                                            variant="contained"
                                            color="error"
                                            onClick={endTurn}
                                            style={{position: "absolute", textTransform: "none"}}>End turn</Button>
                                )}
                                <p className="text-center text-xl">
                                    <span className="font-bold text-red-600">{playerName}</span> <span className="italic">turn</span>
                                </p>
                            </div>
                            <p className="text-center">
                                {textAction.split("\n").flatMap((line, index) => [line, <br key={index}/>])}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}