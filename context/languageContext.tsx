import React, { useContext, useState } from 'react'

const LanguageContext = React.createContext(null);
const LanguageUpdateContext = React.createContext(null);

export function useLanguage() {
    return useContext(LanguageContext);
}

export function useLanguageUpdate() {
    return useContext(LanguageUpdateContext);
}

export function LanguageProvider({ children }) {
    const [englishLanguage, setEnglishLanguage] = useState(true)

    function toggleLanguage() {
        setEnglishLanguage(prevLanguage => !prevLanguage)
    }

    return (
        <LanguageContext.Provider value={englishLanguage}>
            <LanguageUpdateContext.Provider value={toggleLanguage}>
                {children}
            </LanguageUpdateContext.Provider>
        </LanguageContext.Provider>
    )
}

export const LanguageConsumer = LanguageContext.Consumer;