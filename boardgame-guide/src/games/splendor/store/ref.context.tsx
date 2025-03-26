import React, {createContext, RefObject, useContext, useRef} from "react";

const RefContext = createContext<{
    cardRefs: RefObject<{ [key: string]: any }>
    nobleRefs: RefObject<{ [key: string]: any }>
    gemRefs: RefObject<{ [key: string]: any }>
} | undefined>(undefined)

export const SharedRefProvider = ({children}: any) => {
    const cardRefs = useRef<{ [key: string]: any }>({});
    const nobleRefs = useRef<{ [key: string]: any }>({});
    const gemRefs = useRef<{ [key: string]: any }>({});


    return (
        <RefContext.Provider value={{
            cardRefs,
            nobleRefs,
            gemRefs
        }}>
            {children}
        </RefContext.Provider>
    )
}

export const useSharedRef = () => {
    const context = useContext(RefContext);
    if (context == undefined) {
        throw new Error("useSharedRef must be used within a SharedRefProvider");
    }
    return context;
}