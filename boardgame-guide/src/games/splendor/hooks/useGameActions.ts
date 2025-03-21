import {toast} from "react-toastify";
import {GameService} from "@/games/splendor/service/splendor.service";
import {useGameSplendor} from "@/games/splendor/store/game";

export function useGameActions() {
    const {
        gameId,
        setCurrentAction,
    } = useGameSplendor()


    const startGame = () => {
        if (gameId) {
            GameService.startGame({gameId: gameId})
                .then((response) => {
                    if (response.code != 0) {
                        toast(response.msg, {
                            autoClose: 2000,
                        })
                    }
                })
                .catch(error => {
                    console.log("Start game error", error);
                })
        }
    }

    const endTurn = () => {
        setCurrentAction(undefined);
        if (gameId) {
            GameService.endTurn({gameId: gameId})
                .then((response) => {
                    if (response.code != 0) {
                        toast(response.msg, {
                            autoClose: 2000,
                        })
                    }
                })
                .catch(error => {
                    console.log("Skip action error", error);
                })
        }
    }


    return {
        startGame,
        endTurn
    }
}