"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface BackgroundContextType {
    background: string;
    setBackground: (bg: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export const BackgroundProvider = ({ children } : { children : ReactNode }) => {
    const [background, setBackground] = useState("/Images/ID1.png");

    return (
        <BackgroundContext.Provider value={{background, setBackground}}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) throw new Error("useBackground must be used within a BackgroundProvider.");
    return context;
};