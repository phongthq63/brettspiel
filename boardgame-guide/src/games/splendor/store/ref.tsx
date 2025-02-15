import React, {createContext, useContext, useRef} from "react";

const RefContext = createContext<any>(undefined);

export const SharedRefProvider = ({children}: any) => {
    const cardRefs = useRef<{ [key: string]: any }>({});
    const nobleRefs = useRef<{ [key: string]: any }>({});
    const goldRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const onyxRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const rubyRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const emeraldRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const sapphireRefs = useRef<any>({field: {}, player: new Map<string, object>()});
    const diamondRefs = useRef<any>({field: {}, player: new Map<string, object>()});


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