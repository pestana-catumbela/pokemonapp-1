import { Colors } from '../constants/colors';
import { useContext, createContext, Dispatch, SetStateAction } from "react";

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    themeColor: typeof Colors.light | typeof Colors.dark;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}