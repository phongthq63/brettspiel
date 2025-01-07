import React, {useEffect} from "react";
import {useGameSplendor} from "@/games/splendor/store/game";
import {GameService, IngamePlayerDataVO} from "@/games/splendor/service/splendor.service";
import {PlayerGameInfoBox} from "@/games/splendor/component/PlayerGameInfoBox";
import GameManager from "@/games/splendor/component/GameManager";
import GameCanvas from "@/games/splendor/component/3d/GameCanvas";
import {Button} from "@mui/material";


function GameContainer({gameId}: {gameId: string}) {
    const { gameData, setGameData, isMyTurn, currentAction, setCurrentAction } = useGameSplendor()


    // Get data + update data to state
    useEffect(() => {
        GameService.getGameInfo({ gameId: gameId })
            .then(response => {
                if (response.code == 0 && response.data) {
                    setGameData(() => response.data);
                } else {
                    console.log("Get game info false", response);
                }
            })
            .catch(error => {
                console.log("Get game info error", error);
            });
    }, [gameId]);


    const handlerSkipAction = () => {
        setCurrentAction({type: "", data: {}});
        GameService.endTurn({gameId: gameId})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

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
                    gameId: gameId,
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
        <>
            <GameManager/>
            {
                gameData && (
                    <div className="flex flex-col sticky top-0 z-50 min-h-32 bg-cyan-100 rounded-xl space-y-2 p-2">
                        <div className="relative">
                            <h2 className="text-center text-xl">
                            <span className="font-bold text-red-600">{isMyTurn ? "Your" : `${gameData.ingame_data.current_player}`}</span>
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
            <div className="w-full">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-1">
                    <div className="md:basis-4/5 h-[40vh] md:h-[80vh]">
                        <GameCanvas/>
                    </div>
                    <div className="relative md:basis-1/5 flex flex-row md:flex-col flex-wrap md:space-y-1">
                        {
                            gameData?.ingame_data.players.map((player: IngamePlayerDataVO) => {
                                return <PlayerGameInfoBox key={player.player_id}
                                                          playerId={player.player_id as string}
                                                          playerGameData={{...player}}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-full h-[1000px] bg-blue-500">AAAAAAAAAAAAAAAAA</div>
        </>
    )
}

export default GameContainer;