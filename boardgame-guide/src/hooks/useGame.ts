import {generateUUID} from "@/utils";
import {useCallback} from "react";
import {PlayService, RoomService} from "@/service/game.service";
import {useGameDetail} from "@/store/game-detail.context";
import {useGameSetup} from "@/store/game-setup/game-setup.context";
import {useShallow} from "zustand/react/shallow";
import {useUser} from "@/store/user.context";
import {toast} from "@/utils/toast";
import {useRouter} from "next/navigation";

export function useGame() {
    const router = useRouter();
    const { user } = useUser();
    const { data } = useGameDetail();
    const {
        minPlayers,
        players,
        seats,
        setupSettings,
        roomId,
        setPlayers,
        addSeat,
        setSeat,
        resizeSeats,
        removeSeat,
        setInviteLink,
        setSetupSetting,
        setRoomId,
        setIsStarting,
        setIsSearching,
        setGameSetup,
    } = useGameSetup(useShallow((state) => ({
        minPlayers: state.minPlayers,
        players: state.players,
        seats: state.seats,
        setupSettings: state.setupSettings,
        roomId: state.roomId,
        setPlayers: state.setPlayers,
        addSeat: state.addSeat,
        setSeat: state.setSeat,
        resizeSeats: state.resizeSeats,
        removeSeat: state.removeSeat,
        setInviteLink: state.setInviteLink,
        setSetupSetting: state.setSetupSetting,
        setRoomId: state.setRoomId,
        setIsStarting: state.setIsStarting,
        setIsSearching: state.setIsSearching,
        setGameSetup: state.setGameSetup,
    })));


    // Init play
    const init = useCallback(async () => {
        if (roomId) return;
        if (!data) return;

        // Get session id
        let sessionId = sessionStorage.getItem("session-id")
        if (!sessionId) {
            sessionId = generateUUID()
            sessionStorage.setItem("session-id", sessionId)
        }

        // Request create room
        const createRoomResponse = await RoomService
            .createRoom({
                body: {
                    game_id: data.id,
                    session_id: sessionId,
                }
            })
        if (createRoomResponse.code != 0 || !createRoomResponse.data) return
        sessionStorage.setItem("room-id", createRoomResponse.data.id ?? "")
        setRoomId(createRoomResponse.data.id ?? "")
        
    }, [data, roomId, setRoomId])
    
    // Setup
    const setup = useCallback(() => {
        if (!data) return;

        setGameSetup({
            id: data.id,
            type: data.type,
            imageBoxUrl: data.image_box_url,
            description: data.description,
            minPlayers: data.min_players,
            maxPlayers: data.max_players,
            players: data.min_players,
            seats: user ? [{
                id: user.id,
                tagName: `@${user.id}`,
                name: user.name,
                avatarUrl: user.avatarUrl,
                isOnline: true,
                isMe: true,
                isPlayer: true
            }] : [],
            rules: data.rules?.map((rule) => ({
                ...rule,
                id: rule.id ?? "id",
                name: rule.name ?? "Rules",
                language: rule.language ?? "English",
                players: data.min_players ?? 1,
            })),
            setup: data.setup,
        });
    }, [data, setGameSetup, user])

    // Start game
    const startGame = useCallback(async () => {
        setIsStarting(true);
        PlayService
            .startPlay({
                body: {
                    room_id: roomId,
                    players: seats.map((player) => ({
                        id: player.id,
                        name: player.name,
                        is_bot: player.isBot ?? false,
                        is_player: player.local != null,
                        local: player.local,
                    })),
                    setup: {
                        ...setupSettings,
                        id: data.id,
                        type: data.type,
                    },
                },
            })
            .then((response) => {
                if (response.code == 0) {
                    toast({
                        title: "Game Started Successfully",
                        description: "The game has been started. Enjoy playing!",
                        autoClose: 2000,
                    });
                } else {
                    toast({
                        title: "Game Start Failed",
                        description: "An issue occurred while starting the game. Please try again.",
                        autoClose: 2000,
                    });
                    setIsStarting(false);
                }
            })
            .catch((error) => {
                console.error("Failed to start game:", error);
                toast({
                    title: "Error Starting Game",
                    description: "Unable to start the game due to a server error. Please try again later.",
                    autoClose: 2000,
                });
                setIsStarting(false);
            });
    }, [data, roomId, seats, setIsStarting, setupSettings])
    
    // Create invite link
    const createInviteLink = () => {
        if (data?.id) {
            setInviteLink(`https://boardgames.example.com/${data.id}/invite/${Math.random().toString(36).substring(2, 10)}`);
        }
    }

    const onStartGame = async () => {
        if (!data.id) return;
        if (players <= seats.length) {
            await startGame()
        } else {
            setIsSearching(true);
        }
    }

    const onCancelGame = () => {
        setIsSearching(false);
        setIsStarting(false);
    };

    const onSelectPlayers = (values: Set<number>) => {
        const currentPlayers = values.size === 0 ? minPlayers : [...values][0];
        setPlayers(currentPlayers);
        resizeSeats(currentPlayers);
    };

    const onSelectGameTypeChange = (gameType: string) => {
        if (data.type === gameType) {
            setGameSetup({
                id: data.id,
                type: gameType,
                imageBoxUrl: data.image_box_url || "",
                description: data.description || "",
                minPlayers: (data.min_players ?? 1),
                maxPlayers: (data.max_players ?? 999),
                setup: data.setup,
                setupSettings: {},
            });
        } else {
            const expansion = data?.expansions?.find((exp) => exp.id === gameType);
            if (expansion) {
                setGameSetup({
                    id: expansion.id,
                    type: "expansion",
                    imageBoxUrl: expansion.image_box_url || "",
                    description: expansion.description || "",
                    minPlayers: expansion.min_players ? expansion.min_players : (data.min_players ?? 1),
                    maxPlayers: expansion.max_players ? expansion.max_players : (data.max_players ?? 999),
                    setup: expansion.setup,
                    setupSettings: {},
                });
            }
        }
    };

    const onSetupSettingChange = (settingId: string, values: string[]) => {
        setSetupSetting(settingId, values);
    };

    const onSetSeatName = (id: string, name: string) => {
        setSeat(id, {name: name})
    };

    const onKickSeat = (seatId: string) => {
        removeSeat(seatId)
    }

    const onAddLocalPlayer = () => {
        if (!user) return;

        const localCount = seats.filter(seat => seat.local).length;
        addSeat({
            id: `${user.id}-local${localCount + 1}`,
            tagName: `@local${localCount + 1}`,
            name: `Local player ${localCount + 1}`,
            isOnline: true,
            isPlayer: true,
            local: user.id
        });
    }

    const onAddBotPlayer = () => {
        if (!user) return;

        const botCount = seats.filter(seat => seat.isBot).length;
        addSeat({
            id: `${user.id}-bot${botCount + 1}`,
            tagName: `@bot${botCount + 1}`,
            name: `Bot ${botCount + 1}`,
            isOnline: true,
            isBot: true,
            local: user.id
        });
    }

    const onStartPlay = (data: any) => {
        const id = data.id;
        const gameId = data.game_id;

        router.push(`${gameId}/${id}`)
    }

    return {
        init,
        setup,
        createInviteLink,
        onStartGame,
        onCancelGame,
        onSelectPlayers,
        onSelectGameTypeChange,
        onSetupSettingChange,
        onSetSeatName,
        onKickSeat,
        onAddLocalPlayer,
        onAddBotPlayer,
        onStartPlay,
    }
}