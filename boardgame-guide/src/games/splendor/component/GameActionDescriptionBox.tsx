import {Button} from "@mui/material";
import React from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {useSocket} from "@/store/socket";
import {GameService} from "@/games/splendor/service/splendor.service";


export default function GameActionDescriptionBox() {
    const { connected } = useSocket()
    const { gameData, status, currentPlayer, isMyTurn, currentAction, setCurrentAction } = useGameSplendor()


    const getTextAction = () => {
        if (!isMyTurn) return "";

        let text = "";
        switch (currentAction.type) {
            case "gather-gem":
                text = "Gather gem: "
                text += currentAction.data.gem.map((gemId: string) => gemId.split("-")[0])
                    .toString();
                break
            case "reserve-card":
                text = "Reserve card"
                break
            case "option-action":
                text = "Choose an option"
                break
            case "take-noble":
                text = "Take noble"
                break
            default:
                text = "Take your action"
                break;
        }

        return text
    }

    const getTextButton = () => {
        switch (currentAction.type) {
            case "gather-gem":
                return "Gather gem"
            case "reserve-card":
                return "Reserve card"
            case "take-noble":
                return "Take noble"
            default:
                return ""
        }
    }


    const handlerStartGame = () => {
        GameService.startGame({gameId: gameData.game_id})
            .then(response => {
                console.log("Start game", response)
            })
            .catch(error => {
                console.log("Start game error", error);
            })
    }

    const handlerSkipAction = () => {
        setCurrentAction({type: "", data: {}});
        GameService.endTurn({gameId: gameData.game_id})
            .then(response => {
                console.log("Skip action", response)
            })
            .catch(error => {
                console.log("Skip action error", error);
            });
    }

    const handlerCancelAction = () => {
        setCurrentAction({type: "", data: {}});
    }

    const handlerStartAction = (actionId: string) => {
        console.log("Start action", actionId)

        switch (currentAction.type) {
            case "gather-gem":
                let gold = 0;
                let onyx = 0;
                let ruby = 0;
                let emerald = 0;
                let sapphire = 0;
                let diamond = 0;
                currentAction.data.gem.map((gemId: string) => gemId.split("-")[0])
                    .forEach((gemId: string) => {
                        switch (gemId) {
                            case "gold":
                                gold++;
                                break;
                            case "onyx":
                                onyx++;
                                break;
                            case "ruby":
                                ruby++;
                                break;
                            case "emerald":
                                emerald++;
                                break;
                            case "sapphire":
                                sapphire++;
                                break;
                            case "diamond":
                                diamond++;
                                break;
                        }
                    })
                GameService.turnActionGatherGem({
                    gameId: gameData.game_id,
                    body: {
                        gold: gold,
                        onyx: onyx,
                        ruby: ruby,
                        emerald: emerald,
                        sapphire: sapphire,
                        diamond: diamond
                    }
                }).then(response => {
                    console.log(response)
                })
                    .catch(error => {
                        console.log(error);
                    })
                break;
        }
    }

    return (
        gameData &&
        <div className="flex sticky top-0 z-50 min-h-32 bg-cyan-100 rounded-xl space-y-2 p-2">
            {
                status == 0 ? (
                    <div className="w-full flex justify-center items-center">
                        {
                            connected && (
                                <Button variant="contained"
                                        color="error"
                                        onClick={handlerStartGame}>Start game</Button>
                            )
                        }
                    </div>
                ) : (
                    <div className="w-full flex flex-col">
                        <div className="relative">
                            <h2 className="text-center text-xl">
                                <span
                                    className="font-bold text-red-600">{isMyTurn ? "Your" : `${currentPlayer}`}</span>
                                <span className="italic"> turn</span>
                            </h2>
                            {
                                isMyTurn && (
                                    <Button className="absolute top-0 right-0"
                                            variant="contained"
                                            color="error"
                                            onClick={handlerSkipAction}>End turn</Button>
                                )
                            }
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-center">{getTextAction()}</h3>
                            {
                                currentAction.type && (
                                    <div className="flex justify-center space-x-2">
                                        <Button variant="contained"
                                                color="error"
                                                onClick={handlerCancelAction}>Cancel</Button>
                                        {
                                            currentAction.type == "option-action" ?
                                                (
                                                    currentAction.data.option.map((option: string) => {
                                                        let text;
                                                        switch (option) {
                                                            case "buy-card":
                                                                text = "Buy card";
                                                                break;
                                                            case "reserve-card":
                                                                text = "Reserve card";
                                                                break;
                                                        }
                                                        return (
                                                            <Button key={option}
                                                                    variant="contained"
                                                                    color="success"
                                                                    onClick={() => handlerStartAction(option)}>{text}</Button>
                                                        );
                                                    })
                                                ) :
                                                (
                                                    <Button variant="contained"
                                                            color="success"
                                                            onClick={() => handlerStartAction(currentAction.type)}>{getTextButton()}</Button>
                                                )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}