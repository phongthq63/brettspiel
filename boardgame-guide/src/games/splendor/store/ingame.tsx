import React, {createContext, useContext, useState} from "react";

const IngameContext = createContext(undefined);

export const IngameSplendorProvider = ({children}) => {
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