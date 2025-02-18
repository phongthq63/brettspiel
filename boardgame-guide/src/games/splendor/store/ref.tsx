import React, {createContext, MutableRefObject, useContext, useRef} from "react";

const RefContext = createContext<{
    cardRefs: MutableRefObject<{ [key: string]: any }>
    nobleRefs: MutableRefObject<{ [key: string]: any }>
    goldRefs: MutableRefObject<{ [key: string]: any }>
    onyxRefs: MutableRefObject<{ [key: string]: any }>
    rubyRefs: MutableRefObject<{ [key: string]: any }>
    emeraldRefs: MutableRefObject<{ [key: string]: any }>
    sapphireRefs: MutableRefObject<{ [key: string]: any }>
    diamondRefs: MutableRefObject<{ [key: string]: any }>
} | undefined>(undefined);

export const SharedRefProvider = ({children}: any) => {
    const cardRefs = useRef<{ [key: string]: any }>({});
    const nobleRefs = useRef<{ [key: string]: any }>({});
    const goldRefs = useRef<{ [key: string]: any }>({});
    const onyxRefs = useRef<{ [key: string]: any }>({});
    const rubyRefs = useRef<{ [key: string]: any }>({});
    const emeraldRefs = useRef<{ [key: string]: any }>({});
    const sapphireRefs = useRef<{ [key: string]: any }>({});
    const diamondRefs = useRef<{ [key: string]: any }>({});


    return (
        <RefContext.Provider value={{
            cardRefs, nobleRefs,
            goldRefs, onyxRefs, rubyRefs, emeraldRefs, sapphireRefs, diamondRefs
        }}>
            {children}
        </RefContext.Provider>
    )
};

export const useSharedRef = () => {
    const context = useContext(RefContext);
    if (context == undefined) {
        throw new Error("useSharedRef must be used within a SharedRefProvider");
    }
    return context;
};