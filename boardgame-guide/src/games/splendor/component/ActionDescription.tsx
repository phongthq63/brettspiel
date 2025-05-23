import React, {useMemo} from "react";
import {useGameStore} from "@/games/splendor/store/game.store";
import {useGameActions} from "@/games/splendor/hooks/useGameActions";
import {useShallow} from "zustand/react/shallow";
import {Button, Card} from "@heroui/react";
import {CardBody, CardHeader} from "@heroui/card";


export default function ActionDescription() {
    const {
        status,
        players,
        currentAction,
        currentPlayer,
        isLocal,
    } = useGameStore(useShallow((state) => ({
        status: state.status,
        players: state.players,
        currentAction: state.currentAction,
        currentPlayer: state.currentPlayer,
        isLocal: state.isLocal,
    })))
    const {startGame, endTurn} = useGameActions()


    const playerName = useMemo(() => {
        return players[currentPlayer]?.name ?? ""
    }, [currentPlayer, players]);

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
                if (isLocal) {
                    return "Take your action"
                } else {
                    return ""
                }
        }
    }, [isLocal, currentAction])

    return (
        <Card className="sticky flex w-full bottom-0 bg-[#caf0f8] shadow-none">
            {isLocal && (
                <Button
                    className="absolute right-1 top-1 z-20"
                    color="danger"
                    size="sm"
                    onPress={endTurn}
                >
                    End turn
                </Button>
            )}
            <CardHeader className="p-2">
                {status == 0 && (
                    <div className="w-full flex justify-center items-center">
                        <Button
                            color="danger"
                            onPress={startGame}>Start game</Button>
                    </div>
                )}
                {status == 1 && (
                    <p className="w-full text-center text-xl">
                        <span className="font-bold text-red-600">{playerName}</span> <span
                        className="italic">turn</span>
                    </p>
                )}
            </CardHeader>
            <CardBody className="p-2">
                <p className="text-center">
                    {textAction.split("\n").flatMap((line, index) => [line, <br key={index}/>])}
                </p>
            </CardBody>
        </Card>
    )
}