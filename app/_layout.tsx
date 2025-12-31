import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Colors } from '../constants/colors';
import { ThemeContext } from '../context/theme-context';

export default function Layout() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const themeColor = Colors[theme];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeColor }}>
            <Stack />
        </ThemeContext.Provider>
    );
}