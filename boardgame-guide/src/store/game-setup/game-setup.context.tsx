'use client';

import {useStore, StoreApi} from 'zustand';
import { createContext, useContext, useRef } from 'react';
import {createGameSetupStore, GameSetupStore} from "@/store/game-setup/game-setup.store";

const GameStoreContext = createContext<StoreApi<GameSetupStore> | null>(null);

export function GameSetupProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<StoreApi<GameSetupStore>>(createGameSetupStore());
    return (
        <GameStoreContext.Provider value={storeRef.current}>
            {children}
        </GameStoreContext.Provider>
    );
}


export function useGameSetup<T>(selector: (state: GameSetupStore) => T): T {
    const store = useContext(GameStoreContext);
    if (!store) throw new Error('useGameStore must be used inside <GameStoreProvider>');
    return useStore(store, selector);
}