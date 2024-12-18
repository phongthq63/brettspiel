import React, {createContext, useContext} from "react";

const IngameContext = createContext<any>(undefined);

export const IngameSplendorProvider = ({children}: any) => {
    return (
        <IngameContext.Provider value={{}}>
            {children}
        </IngameContext.Provider>
    )
};

export const useGameSplendor = () => {
    const context = useContext(IngameContext);
    if (context == undefined) {
        throw new Error("useGameSplendor must be used within a GameSplendorProvider");
    }
    return context;
};