"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import i18n from '@/lib/i18n';

export type Lang = 'en' | 'vi'

interface LanguageContextType {
    language: Lang
    setLanguage: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Lang>('en')

    const setLanguage = (lang: Lang) => {
        i18n.changeLanguage(lang)
        setLanguageState(lang)
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
