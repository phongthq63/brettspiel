import {useGameStore} from "@/games/splendor/store/game.store";
import {useEffect} from "react";
import {
    CardVO,
    FieldCardVO,
    FieldNobleVO,
    GameService, IngamePlayerDataVO,
    NobleVO, PlayerDTO,
    SplendorGameDTO
} from "@/games/splendor/service/splendor.service";
import {CardPosition, GemPosition, NoblePosition, PlayerPosition} from "@/games/splendor/constants/game";
import {CardData, GemData, NobleData, Player} from "@/games/splendor/types/game";
import {CardDictionary} from "@/games/splendor/data/card";
import {GemCardSize} from "@/games/splendor/component/3d/GemCard";
import {generateUUID} from "@/utils";
import {GemTokenSize} from "@/games/splendor/component/3d/GemToken";
import {NobleDictionary} from "@/games/splendor/data/noble";
import {NobleCardSize} from "@/games/splendor/component/3d/NobleCard";
import {Euler, Vector3} from "three";
import {CardGemType} from "@/games/splendor/types/card";
import {GemDictionary} from "@/games/splendor/data/gem";
import {useUser} from "@/store/user.context";
import {useShallow} from "zustand/react/shallow";

export function useFetchGameData(gameId: string) {
    const { user } = useUser();
    const {
        setGameState,
        setIsLocal,
    } = useGameStore(useShallow((state) => ({
        setGameState: state.setGameState,
        setIsLocal: state.setIsLocal,
    })));

    useEffect(() => {
        GameService.getGameInfo({ gameId: gameId })
            .then(response => {
                if (response.code !== 0 || !response.data) {
                    console.error("Failed to fetch game detail data", response)
                    return
                }

                const gameData: SplendorGameDTO = response.data

                // Save to store
                const gameStatus = gameData.status ?? 0;
                let playerIds: string[];
                let currentPlayer: string = "";
                let nextPlayer: string = "";
                let deckCard1: CardVO[];
                let deckCard2: CardVO[];
                let deckCard3: CardVO[];
                let fieldCard1: FieldCardVO[] = [];
                let fieldCard2: FieldCardVO[] = [];
                let fieldCard3: FieldCardVO[] = [];
                let deckNoble: NobleVO[];
                let fieldNoble: FieldNobleVO[] = [];
                let ingamePlayerData: IngamePlayerDataVO[] = [];
                if (gameStatus == 0) {
                    playerIds = gameData.players?.map(player => player.id ?? '') ?? []
                    deckCard1 = gameData.config?.cards?.filter(card => card.level == 1) ?? []
                    deckCard2 = gameData.config?.cards?.filter(card => card.level == 2) ?? []
                    deckCard3 = gameData.config?.cards?.filter(card => card.level == 3) ?? []
                    deckNoble = gameData.config?.nobles ?? []
                } else {
                    playerIds = gameData.ingame_data?.player_ids ?? []
                    currentPlayer = gameData.ingame_data?.current_player ?? ""
                    nextPlayer = gameData.ingame_data?.next_player ?? ""
                    deckCard1 = gameData.ingame_data?.deck_card1 ?? []
                    deckCard2 = gameData.ingame_data?.deck_card2 ?? []
                    deckCard3 = gameData.ingame_data?.deck_card3 ?? []
                    fieldCard1 = gameData.ingame_data?.field_card1 ?? []
                    fieldCard2 = gameData.ingame_data?.field_card2 ?? []
                    fieldCard3 = gameData.ingame_data?.field_card3 ?? []
                    deckNoble = gameData.ingame_data?.deck_noble ?? []
                    fieldNoble = gameData.ingame_data?.field_noble ?? []
                    ingamePlayerData = gameData.ingame_data?.players ?? []
                }

                setGameState({
                    gameId: gameData.game_id,
                    status: gameData.status,
                    playerIds: playerIds,
                    currentPlayer: currentPlayer,
                    nextPlayer: nextPlayer,
                    deckCard: {
                        [1]: formatDeckCards(deckCard1, gameStatus, 1),
                        [2]: formatDeckCards(deckCard2, gameStatus, 2),
                        [3]: formatDeckCards(deckCard3, gameStatus, 3)
                    },
                    fieldCard: {
                        [1]: formatFieldCards(fieldCard1, 1),
                        [2]: formatFieldCards(fieldCard2, 2),
                        [3]: formatFieldCards(fieldCard3, 3)
                    },
                    gems: formatGems(
                        gameData.ingame_data?.gold ?? 0,
                        gameData.ingame_data?.onyx ?? 0,
                        gameData.ingame_data?.ruby ?? 0,
                        gameData.ingame_data?.emerald ?? 0,
                        gameData.ingame_data?.sapphire ?? 0,
                        gameData.ingame_data?.diamond ?? 0
                    ),
                    deckNoble: formatNobleDeck(deckNoble, gameStatus),
                    fieldNoble: formatNobleField(fieldNoble),
                    players: formatPlayerData(ingamePlayerData, gameData.players ?? []),
                })
                setIsLocal(user?.id ?? '')
            })
            .catch(error => console.error("Error fetching game detail data", error))
    }, [gameId, setGameState, setIsLocal, user]);
}

// Helper Functions
function formatDeckCards(cards: CardVO[], status: number, level: number): CardData[] {
    return cards
        .map((card, index) => {
            if (status == 0) {
                return {
                    ...card,
                    ...CardDictionary[card.id],
                    position: [CardPosition.level[level].desk[0], CardPosition.level[level].desk[1], index * GemCardSize.depth + CardPosition.level[level].desk[2] + 0.2],
                    rotation: [0, 0, 0]
                };
            } else {
                return {
                    ...card,
                    ...CardDictionary[card.id],
                    position: [CardPosition.level[level].desk[0], CardPosition.level[level].desk[1], (cards.length - 1 - index) * GemCardSize.depth + CardPosition.level[level].desk[2] + 0.2],
                    rotation: [0, Math.PI, 0]
                };
            }
        })
}

function formatFieldCards(fieldCards: FieldCardVO[], level: number): CardData[] {
    return fieldCards
        .filter((fieldCard: FieldCardVO) => fieldCard.card)
        .map((fieldCard) => {
            const position = CardPosition.level[level].field[fieldCard.position ?? 0]
            return {
                ...fieldCard.card,
                ...CardDictionary[fieldCard.card?.id ?? ''],
                position: [position[0], position[1], position[2] + 0.2],
                rotation: [0, 0, 0]
            }
        })
}

function formatGems(gold: number, onyx: number, ruby: number, emerald: number, sapphire: number, diamond: number): {
    gold: GemData[]
    onyx: GemData[]
    ruby: GemData[]
    emerald: GemData[]
    sapphire: GemData[]
    diamond: GemData[]
} {
    return {
        "gold": Array.from({length: gold}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.gold,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.gold[0], GemPosition.gold[1], index * GemTokenSize.depth + GemPosition.gold[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            }),
        "onyx": Array.from({length: onyx}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.onyx,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.onyx[0], GemPosition.onyx[1], index * GemTokenSize.depth + GemPosition.onyx[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            }),
        "ruby": Array.from({length: ruby}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.ruby,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.ruby[0], GemPosition.ruby[1], index * GemTokenSize.depth + GemPosition.ruby[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            }),
        "emerald": Array.from({length: emerald}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.emerald,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.emerald[0], GemPosition.emerald[1], index * GemTokenSize.depth + GemPosition.emerald[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            }),
        "sapphire": Array.from({length: sapphire}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.sapphire,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.sapphire[0], GemPosition.sapphire[1], index * GemTokenSize.depth + GemPosition.sapphire[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            }),
        "diamond": Array.from({length: diamond}, (_, i) => i)
            .map((index) => {
                return {
                    ...GemDictionary.diamond,
                    id: generateUUID(),
                    owner: "",
                    position: [GemPosition.diamond[0], GemPosition.diamond[1], index * GemTokenSize.depth + GemPosition.diamond[2] + 0.2],
                    rotation: [0, 0, 0]
                }
            })
    }
}

function formatNobleDeck(nobles: NobleVO[], status: number): NobleData[] {
    return nobles.map((noble, index) => {
        if (status == 0) {
            return {
                ...noble,
                ...NobleDictionary[noble.id ?? ''],
                position: [NoblePosition.desk[0], NoblePosition.desk[1], index * NobleCardSize.depth + NoblePosition.desk[2] + 0.2],
                rotation: [0, 0, 0]
            };
        } else {
            return {
                ...noble,
                ...NobleDictionary[noble.id ?? ''],
                position: [NoblePosition.desk[0], NoblePosition.desk[1], (nobles.length - 1 - index) * NobleCardSize.depth + NoblePosition.desk[2] + 0.2],
                rotation: [0, Math.PI, 0]
            };
        }
    });
}

function formatNobleField(fieldNobles: FieldNobleVO[]): NobleData[] {
    return fieldNobles.filter((fieldNoble: FieldNobleVO) => fieldNoble.noble)
        .map((fieldNoble) => {
            const position = NoblePosition.field[fieldNoble.position ?? 0]
            return {
                ...fieldNoble.noble,
                ...NobleDictionary[fieldNoble.noble?.id || ''],
                position: [position[0], position[1], position[2] + 0.2],
                rotation: [0, 0, 0]
            }
        })
}

function formatPlayerData(ingamePlayerData: IngamePlayerDataVO[], players: PlayerDTO[]) : {[key: string]: Player} {
    const playerMap = players.reduce((dict: {[key: string]: PlayerDTO}, item) => {
        dict[item.id ?? ''] = item
        return dict;
    }, {})

    // Function
    function formatPlayerNobles(locate: {position: [number, number, number], rotation: [number, number, number]}, nobles: NobleVO[]): NobleData[] {
        const { position, rotation } = locate

        const vector = new Vector3().fromArray(position)
        const euler = new Euler(rotation[0], rotation[1], rotation[2])

        const noblePosition = new Vector3().fromArray(PlayerPosition.noble)
            .add(vector)
            .applyEuler(euler)

        return nobles
            .map((noble: NobleVO, index: number)=> ({
                ...noble,
                ...NobleDictionary[noble.id ?? ''],
                position: [index * PlayerPosition.distance + noblePosition.x, noblePosition.y, index * NobleCardSize.depth + noblePosition.z + 0.2],
                rotation: [euler.x, euler.y, euler.z]
            }))
    }
    function formatPlayerCards(locate: {position: [number, number, number], rotation: [number, number, number]}, cards: CardVO[]): {
        onyx: CardData[]
        ruby: CardData[]
        emerald: CardData[]
        sapphire: CardData[]
        diamond: CardData[]
    } {
        const { position, rotation } = locate

        const vector = new Vector3().fromArray(position)
        const euler = new Euler(rotation[0], rotation[1], rotation[2])

        const diamondCardPosition = new Vector3().fromArray(PlayerPosition.diamond)
            .add(vector)
            .applyEuler(euler)
        const sapphireCardPosition = new Vector3().fromArray(PlayerPosition.sapphire)
            .add(vector)
            .applyEuler(euler)
        const emeraldCardPosition = new Vector3().fromArray(PlayerPosition.emerald)
            .add(vector)
            .applyEuler(euler)
        const rubyCardPosition = new Vector3().fromArray(PlayerPosition.ruby)
            .add(vector)
            .applyEuler(euler)
        const onyxCardPosition = new Vector3().fromArray(PlayerPosition.onyx)
            .add(vector)
            .applyEuler(euler)

        return {
            "diamond": cards
                .filter((card: CardVO) => card.type == CardGemType.DIAMOND)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [diamondCardPosition.x, index * PlayerPosition.distance + diamondCardPosition.y, 0.1 - index * GemCardSize.depth + diamondCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
                })),
            "sapphire": cards
                .filter((card: CardVO) => card.type == CardGemType.SAPPHIRE)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [sapphireCardPosition.x, index * PlayerPosition.distance + sapphireCardPosition.y, 0.1 - index * GemCardSize.depth + sapphireCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
                })),
            "emerald": cards
                .filter((card: CardVO) => card.type == CardGemType.EMERALD)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [emeraldCardPosition.x, index * PlayerPosition.distance + emeraldCardPosition.y, 0.1 - index * GemCardSize.depth + emeraldCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
                })),
            "ruby": cards
                .filter((card: CardVO) => card.type == CardGemType.RUBY)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [rubyCardPosition.x, index * PlayerPosition.distance + rubyCardPosition.y, 0.1 - index * GemCardSize.depth + rubyCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
                })),
            "onyx": cards
                .filter((card: CardVO) => card.type == CardGemType.ONYX)
                .map((card: CardVO, index: number) => ({
                    ...card,
                    ...CardDictionary[card?.id || ''],
                    position: [onyxCardPosition.x, index * PlayerPosition.distance + onyxCardPosition.y, 0.1 - index * GemCardSize.depth + onyxCardPosition.z],
                    rotation: [euler.x, euler.y, euler.z]
                }))
        }
    }
    function formatPlayerReserveCards(locate: {position: [number, number, number], rotation: [number, number, number]}, cards: CardVO[]): CardData[] {
        const { position, rotation } = locate

        const vector = new Vector3().fromArray(position)
        const euler = new Euler(rotation[0], rotation[1], rotation[2])

        const reserveCardPosition = new Vector3().fromArray(PlayerPosition.reserveCard)
            .add(vector)
            .applyEuler(euler)

        return cards
            .map((card: CardVO, index: number) => ({
                ...card,
                ...CardDictionary[card?.id || ''],
                position: [index * (GemCardSize.width + 0.1) + reserveCardPosition.x, reserveCardPosition.y, index * GemCardSize.depth + reserveCardPosition.z],
                rotation: [euler.x, Math.PI + euler.y, euler.z]
            }))
    }
    function formatPlayerGems(locate: {position: [number, number, number], rotation: [number, number, number]},
                              gold: number,
                              onyx: number,
                              ruby: number,
                              emerald: number,
                              sapphire: number,
                              diamond: number): {
        gold: GemData[]
        onyx: GemData[]
        ruby: GemData[]
        emerald: GemData[]
        sapphire: GemData[]
        diamond: GemData[]
    } {
        const { position, rotation } = locate

        const vector = new Vector3().fromArray(position)
        const euler = new Euler(rotation[0], rotation[1], rotation[2])

        const goldPosition = new Vector3().fromArray(PlayerPosition.gold)
            .add(vector)
            .applyEuler(euler)
        const diamondPosition = new Vector3().fromArray(PlayerPosition.diamond)
            .add(vector)
            .applyEuler(euler)
        const sapphirePosition = new Vector3().fromArray(PlayerPosition.sapphire)
            .add(vector)
            .applyEuler(euler)
        const rubyPosition = new Vector3().fromArray(PlayerPosition.ruby)
            .add(vector)
            .applyEuler(euler)
        const emeraldPosition = new Vector3().fromArray(PlayerPosition.emerald)
            .add(vector)
            .applyEuler(euler)
        const onyxPosition = new Vector3().fromArray(PlayerPosition.onyx)
            .add(vector)
            .applyEuler(euler)

        return {
            "gold": Array.from({length: gold}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.gold,
                        id: generateUUID(),
                        position: [goldPosition.x, goldPosition.y, index * GemTokenSize.depth + goldPosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                }),
            "diamond": Array.from({length: diamond}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.diamond,
                        id: generateUUID(),
                        position: [diamondPosition.x, diamondPosition.y, index * GemTokenSize.depth + diamondPosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                }),
            "sapphire": Array.from({length: sapphire}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.sapphire,
                        id: generateUUID(),
                        position: [sapphirePosition.x, sapphirePosition.y, index * GemTokenSize.depth + sapphirePosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                }),
            "emerald": Array.from({length: emerald}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.emerald,
                        id: generateUUID(),
                        position: [emeraldPosition.x, emeraldPosition.y, index * GemTokenSize.depth + emeraldPosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                }),
            "ruby": Array.from({length: ruby}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.ruby,
                        id: generateUUID(),
                        position: [rubyPosition.x, rubyPosition.y, index * GemTokenSize.depth + rubyPosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                }),
            "onyx": Array.from({length: onyx}, (_, i) => i)
                .map((index) => {
                    return {
                        ...GemDictionary.onyx,
                        id: generateUUID(),
                        position: [onyxPosition.x, onyxPosition.y, index * GemTokenSize.depth + onyxPosition.z + 0.2],
                        rotation: [euler.x, euler.y, euler.z]
                    }
                })
        }
    }

    return ingamePlayerData.reduce((acc: {[key: string]: Player}, ingamePlayer, index) => {
        const locate = PlayerPosition.total[ingamePlayerData.length].player[index + 1]
        const player = playerMap[ingamePlayer.player_id ?? '']

        acc[player.id ?? ''] = {
            id: player.id ?? '',
            name: player.name ?? 'Player',
            avatar: player.avatar_url ?? '',
            isPlayer: player.is_player ?? false,
            isBot: player.is_bot ?? false,
            local: player.local,
            score: ingamePlayer?.score ?? 0,
            nobles: formatPlayerNobles(locate, ingamePlayer?.nobles ?? []),
            cards: formatPlayerCards(locate, ingamePlayer?.cards ?? []),
            reserveCards: formatPlayerReserveCards(locate, ingamePlayer?.reserve_cards ?? []),
            gems: formatPlayerGems(locate,
                ingamePlayer?.gold ?? 0,
                ingamePlayer?.onyx ?? 0,
                ingamePlayer?.ruby ?? 0,
                ingamePlayer?.emerald ?? 0,
                ingamePlayer?.sapphire ?? 0,
                ingamePlayer?.diamond ?? 0)
        }
        return acc;
    }, {})
}