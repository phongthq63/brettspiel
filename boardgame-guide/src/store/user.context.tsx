"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import {getItem} from "@/hooks/cookie/useCookie";
import {decodeJWT} from "@/utils";

const UserContext = createContext<{
    user: User | undefined
} | undefined>(undefined);

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
}

export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<User>({id: "test", name: "Quách Thanh Phong", avatarUrl: "/test.jpg"});


    useEffect(() => {
        const token = getItem('access-token')
        // const userId = getItem('user-id')
        if (!token) {
            return;
        }

        // Test
        const jwtData = decodeJWT(token);
        if (!jwtData) {
            return;
        }

        setUser({id: jwtData.sub, name: "Quách Thanh Phong"});
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
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