"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./index";

type ColorMode = "light" | "dark";

interface ThemeContextProps {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleColorMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ColorMode | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("colorMode");
    if (stored === "light" || stored === "dark") setMode(stored);
    else setMode("light"); // fallback
  }, []);

  const theme = useMemo(() => getTheme(mode || "light"), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      window.localStorage.setItem("colorMode", next);
      return next;
    });
  };

  if (mode === null) return null; // or a loading spinner

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
