"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import {LanguageProvider} from "@/store/language.context";
import {SocketProvider} from "@/store/socket.context";
import {UserProvider} from "@/store/user.context";
import {ToastProvider} from "@heroui/react";


export function Providers({ children }: any) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <LanguageProvider>
                <SocketProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </SocketProvider>
            </LanguageProvider>
        </HeroUIProvider>
    );
}
