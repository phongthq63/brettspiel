import {Html} from "@react-three/drei";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button} from "@mui/material";
import {Action, useGameSplendor} from "@/games/splendor/store/game";
import {TokenGemType} from "@/games/splendor/constants/gem";
import {GameService} from "@/games/splendor/service/splendor.service";
import {toast} from "react-toastify";
import {Euler, Vector3} from "three";
import {useThree} from "@react-three/fiber";


interface ActionBoardProps {
    position: Vector3
    rotation: Euler
    onClickNotThis?: () => void
}

const ActionBoard = ({position, rotation, onClickNotThis, ...props}: ActionBoardProps) => {
    const { gl } = useThree();
    const {gameId,
        currentAction, setCurrentAction} = useGameSplendor()
    const ref = useRef<any>(undefined);
    const [text, setText] = useState("");


    // Click Outside Detection
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickNotThis?.(); // Close the UI when clicking outside
            }
        }

        gl.domElement.addEventListener("click", handleClickOutside);
        return () => gl.domElement.removeEventListener("click", handleClickOutside);
    }, [gl, onClickNotThis]);

    useEffect(() => {
        switch (currentAction?.type) {
            case "take-noble":
                setText("Take noble")
                break
            case "option-action":
                setText("Choose a action")
                break
            case "buy-card":
                setText("Buy card")
                break
            case "reserve-card":
                setText("Reserve card")
                break
            case "gather-gem":
                setText("Gather gem")
                break
        }
    }, [currentAction]);

    const getTextButtonOption = useMemo(() => (type: string) => {
        switch (type) {
            case "buy-card":
                return "Buy card"
            case "reserve-card":
                return "Reserve card"
            default:
                return ""
        }
    }, [])

    const startActionGatherGem = (data: Action) => {
        let gold = 0;
        let onyx = 0;
        let ruby = 0;
        let emerald = 0;
        let sapphire = 0;
        let diamond = 0;
        data.gem?.forEach((gem) => {
            switch (gem.type) {
                case TokenGemType.GOLD:
                    gold += gem.count;
                    break;
                case TokenGemType.ONYX:
                    onyx += gem.count;
                    break;
                case TokenGemType.RUBY:
                    ruby += gem.count;
                    break;
                case TokenGemType.EMERALD:
                    emerald += gem.count;
                    break;
                case TokenGemType.SAPPHIRE:
                    sapphire += gem.count;
                    break;
                case TokenGemType.DIAMOND:
                    diamond += gem.count;
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
            if (response.code == 0) {
                console.log(response)
            } else {
                toast(response.msg, {
                    autoClose: 2000,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const startActionBuyCard = (data: Action) => {
        let gold = 0;
        let onyx = 0;
        let ruby = 0;
        let emerald = 0;
        let sapphire = 0;
        let diamond = 0;
        data.gem?.forEach((gem) => {
            switch (gem.type) {
                case TokenGemType.GOLD:
                    gold += gem.count;
                    break;
                case TokenGemType.ONYX:
                    onyx += gem.count;
                    break;
                case TokenGemType.RUBY:
                    ruby += gem.count;
                    break;
                case TokenGemType.EMERALD:
                    emerald += gem.count;
                    break;
                case TokenGemType.SAPPHIRE:
                    sapphire += gem.count;
                    break;
                case TokenGemType.DIAMOND:
                    diamond += gem.count;
                    break;
            }
        })
        GameService.turnActionBuyCard({
            gameId: gameId,
            body: {
                card_id: data.card?.id,
                gold: gold,
                onyx: onyx,
                ruby: ruby,
                emerald: emerald,
                sapphire: sapphire,
                diamond: diamond
            }
        }).then(response => {
            if (response.code == 0) {
                console.log(response)
            } else {
                toast(response.msg, {
                    autoClose: 2000,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const startActionReserveCard = (data: Action) => {
        let gold = 0;
        data.gem?.forEach((gem) => {
            switch (gem.type) {
                case TokenGemType.GOLD:
                    gold += gem.count;
                    break;
            }
        })
        GameService.turnActionReserveCard({
            gameId: gameId,
            body: {
                desk1: data.card?.deck && data.card.level == 1 ? 1 : 0,
                desk2: data.card?.deck && data.card.level == 2 ? 1 : 0,
                desk3: data.card?.deck && data.card.level == 3 ? 1 : 0,
                card_id: data.card?.deck ? undefined : data.card?.id,
                gold: gold,
            }
        }).then(response => {
            if (response.code == 0) {
                console.log(response)
            } else {
                toast(response.msg, {
                    autoClose: 2000,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const startActionTakeNoble = (data: Action) => {
        GameService.turnBonusActionTakeNoble({
            gameId: gameId,
            body: {
                noble_id: data.noble?.id,
            }
        }).then(response => {
            if (response.code == 0) {
                console.log(response)
            } else {
                toast(response.msg, {
                    autoClose: 2000,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handlerStartAction = (data: Action) => {
        switch (data.type) {
            case "gather-gem":
                startActionGatherGem(data)
                break
            case "buy-card":
                startActionBuyCard(data)
                break
            case "reserve-card":
                startActionReserveCard(data)
                break
            case "take-noble":
                startActionTakeNoble(data)
                break
        }
    }

    return (
        <Html center
              transform
              occlude
              position={position}
              rotation={rotation}
              distanceFactor={1}
              zIndexRange={[0]}
              className="bg-cyan-100 p-4 rounded-md"
              ref={ref}
              {...props}
        >
            <h2 className="text-xl text-center mb-4">{text}</h2>
            {currentAction && (
                <div className="flex justify-center space-x-2">
                    <Button variant="contained"
                            color="error"
                            onClick={() => setCurrentAction(undefined)}>Cancel</Button>
                    {currentAction.type != "option-action" ? (
                        <Button variant="contained"
                                color="success"
                                onClick={() => handlerStartAction(currentAction)}>Confirm</Button>
                    ) : (
                        currentAction.option?.map(option => (
                            <Button key={option}
                                    variant="contained"
                                    color="success"
                                    onClick={() => setCurrentAction({...currentAction, type: option})}>{getTextButtonOption(option)}</Button>
                        ))
                    )}
                </div>
            )}
        </Html>
    )
}

export default ActionBoard;