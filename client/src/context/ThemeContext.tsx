import {createContext, useEffect, useState} from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState<String>(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        setTheme((prevState: String) => {
            if (prevState == 'light') {
                return 'dark';
            } else {
                return 'light';
            }
        })
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    )
}