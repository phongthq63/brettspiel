"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import {generateUUID} from "@/utils";
import {UserService} from "@/service/game.service";

const UserContext = createContext<{
    user: User | null
    reload: () => void
} | undefined>(undefined);

export interface User {
    id: string;
    tagName: string;
    name: string;
    avatarUrl?: string;
}

export const UserProvider = ({children}: any) => {
    const [id, setId] = useState('')
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        UserService
            .getMe()
            .then(response => {
                if (response.code == 0 && response.data) {
                    setUser({
                        id: response.data.id ?? 'id',
                        tagName: `@${response.data.id}`,
                        name: response.data.name ?? '',
                        avatarUrl: response.data.avatar_url
                    })
                } else {
                    setUser(null)
                }
            })
            .catch(() => {
                setUser(null)
            });
    }, [id])

    const reload = () => {
        setId(generateUUID())
    }

    return (
        <UserContext.Provider value={{ user, reload }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context == undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};