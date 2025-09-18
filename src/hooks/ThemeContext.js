import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { getTheme, saveTheme } from "../utils/LocalStorage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();

  console.log(systemTheme, "systemTheme====")
  const [isDarkMode, setIsDarkMode] = useState(getTheme() === "light");

  useEffect(() => {
    setIsDarkMode(getTheme() === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
