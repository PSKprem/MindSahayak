import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

type Theme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
  isDark: boolean;
  toggleTheme: () => void;
};

const lightTheme: Theme = {
  primaryColor: '#4a90e2',
  secondaryColor: '#5b9bed',
  backgroundColor: '#f8f9fa',
  textColor: '#333',
  cardColor: 'white',
  isDark: false,
  toggleTheme: () => {},
};

const darkTheme: Theme = {
  primaryColor: '#5b9bed',
  secondaryColor: '#4a90e2',
  backgroundColor: '#121212',
  textColor: '#f8f9fa',
  cardColor: '#1e1e1e',
  isDark: true,
  toggleTheme: () => {},
};

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  const toggleTheme = () => setIsDark(!isDark);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);