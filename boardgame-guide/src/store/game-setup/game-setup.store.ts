import {createStore} from 'zustand';
import {GameSeat, GameSetupSetting} from "@/types/game";


export interface GameSetupStore {
    id: string;
    type: string;
    imageBoxUrl: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    players: number;
    seats: GameSeat[];
    inviteLink: string;
    rules?: {
        id: string;
        name: string;
        language: string;
        language_icon_url?: string;
        document_url?: string;
    }[];
    setup?: {
        setting?: GameSetupSetting[];
        [key: string]: any;
    };
    setupSettings?: Record<string, string[]>;
    roomId: string;
    isStarting: boolean;
    isSearching: boolean;



    // Methods
    setGameSetup: (data: Partial<GameSetupStore>) => void;
    setPlayers: (players: number) => void;
    setSeats: (seats: GameSeat[]) => void;
    addSeat: (seat: GameSeat) => void;
    setSeat: (id: string, seat: Partial<GameSeat>) => void;
    removeSeat: (id: string) => void;
    resizeSeats: (size: number) => void;
    setInviteLink: (inviteLink: string) => void;
    setSetupSetting: (settingId: string, settingValue: string[]) => void;
    setRoomId: (roomId: string) => void;
    setIsStarting: (isStarting: boolean) => void;
    setIsSearching: (isSearching: boolean) => void;
    clearGameSetup: () => void;
}

export const createGameSetupStore = () =>
    createStore<GameSetupStore>((set) => ({
        id: '',
        type: 'base',
        imageBoxUrl: '',
        description: '',
        minPlayers: 1,
        maxPlayers: 1,
        players: 1,
        seats: [],
        inviteLink: '',
        rules: [],
        roomId: '',
        isStarting: false,
        isSearching: false,

        setGameSetup: (data) => set((state) => ({ ...state, ...data })),
        setPlayers: (players) => set({ players }),
        setSeats: (seats: GameSeat[]) => set({ seats }),
        addSeat: (seat) => set((state) => ({
            seats: [...state.seats, seat],
        })),
        setSeat: (id, seat) => set((state) => ({
            seats: state.seats.map((s) => (s.id === id ? { ...s, ...seat } : s)),
        })),
        removeSeat: (id: string) => set((state) => ({
            seats: state.seats.filter((s) => s.id !== id),
        })),
        resizeSeats: (size: number) => set((state) => {
            if (size >= state.seats.length) {
                return {}
            } else {
                return {
                    seats: state.seats.slice(0, size)
                }
            }
        }),
        setInviteLink: (inviteLink) => set({ inviteLink }),
        setSetupSetting: (settingId, settingValue) => set((state) => ({
            setupSettings: {
                ...state.setupSettings,
                [settingId]: settingValue,
            },
        })),
        setRoomId: (roomId: string) => set({ roomId }),
        setIsStarting: (isStarting) => set({ isStarting }),
        setIsSearching: (isSearching) => set({ isSearching }),
        clearGameSetup: () =>
            set({
                id: '',
                type: 'base',
                imageBoxUrl: '',
                description: '',
                minPlayers: 1,
                maxPlayers: 1,
                players: 1,
                seats: [],
                inviteLink: '',
                rules: [],
                roomId: '',
                isStarting: false,
                isSearching: false,
            }),
}));
