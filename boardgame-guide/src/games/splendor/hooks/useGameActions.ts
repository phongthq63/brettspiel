import {GameService} from "@/games/splendor/service/splendor.service";
import {useGameStore} from "@/games/splendor/store/game.store";
import {Action} from "@/games/splendor/types/game";
import {TokenGemType} from "@/games/splendor/types/gem";
import {useShallow} from "zustand/react/shallow";
import {toast} from "@/utils/toast";

export function useGameActions() {
    const {
        gameId,
        currentPlayer,
        setCurrentAction,
    } = useGameStore(useShallow((state) => ({
        gameId: state.gameId,
        currentPlayer: state.currentPlayer,
        setCurrentAction: state.setCurrentAction,
    })))

    const startGame = () => {
        if (gameId) {
            GameService.startGame({gameId: gameId})
                .then((response) => {
                    if (response.code != 0) {
                        toast({
                            description: response.msg,
                            autoClose: 2000,
                        })
                    }
                })
                .catch(error => {
                    console.log("Start gamedetail error", error);
                })
        }
    }

    const endTurn = () => {
        if (!gameId) return

        setCurrentAction(undefined)
        GameService
            .endTurn({
                gameId: gameId,
                body: {
                    player_id: currentPlayer,
                }
            })
            .then((response) => {
                if (response.code == 0) {

                } else {
                    toast({
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch(error => {
                console.log("Skip action error", error);
            })
    }

    const gatherGem = (data: Action) => {
        const {
            gold = 0,
            onyx = 0,
            ruby = 0,
            emerald = 0,
            sapphire = 0,
            diamond = 0
        } = data.gem?.reduce((dict: any, { type, count }) => {
            dict[type] = (dict[type] || 0) + count;
            return dict
        }, {})
        GameService.turnActionGatherGem({
            gameId: gameId,
            body: {
                player_id: currentPlayer,
                gold: gold,
                onyx: onyx,
                ruby: ruby,
                emerald: emerald,
                sapphire: sapphire,
                diamond: diamond
            }
        }).then(response => {
            if (response.code != 0) {
                toast({
                    description: response.msg,
                    autoClose: 2000,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const buyCard = (data: Action) => {
        GameService
            .turnActionBuyCard({
                gameId: gameId,
                body: {
                    player_id: currentPlayer,
                    card_id: data.card?.id,
                    ...(data.card?.cost ? Object.fromEntries(Object.entries(data.card.cost).map(([key, value]) => [key, value * -1])) : {})
                }
            })
            .then(response => {
                if (response.code != 0) {
                    toast({
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const reserveCard = (data: Action) => {
        let gold = 0;
        data.gem?.forEach((gem) => {
            switch (gem.type) {
                case TokenGemType.GOLD:
                    gold += gem.count;
                    break;
            }
        })
        GameService
            .turnActionReserveCard({
                gameId: gameId,
                body: {
                    player_id: currentPlayer,
                    desk1: data.card?.deck && data.card.level == 1 ? 1 : 0,
                    desk2: data.card?.deck && data.card.level == 2 ? 1 : 0,
                    desk3: data.card?.deck && data.card.level == 3 ? 1 : 0,
                    card_id: data.card?.deck ? undefined : data.card?.id,
                    gold: gold,
                }
            })
            .then(response => {
                if (response.code == 0) {
                    console.log(response)
                } else {
                    toast({
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const takeNoble = (data: Action) => {
        GameService
            .turnBonusActionTakeNoble({
                gameId: gameId,
                body: {
                    player_id: currentPlayer,
                    noble_id: data.noble?.id,
                }
            })
            .then(response => {
                if (response.code == 0) {
                    console.log(response)
                } else {
                    toast({
                        description: response.msg,
                        autoClose: 2000,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    return {
        startGame,
        endTurn,
        gatherGem,
        buyCard,
        reserveCard,
        takeNoble,
    }
}