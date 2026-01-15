import { createTheme, Theme } from "@mui/material/styles";
import "@fontsource/ubuntu/400.css";
import "@fontsource/roboto/300.css";
import "@fontsource/open-sans/500.css";

export type ColorMode = "light" | "dark";

const commonSettings = {
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

const darkPalette = {
  mode: "dark" as const,
  primary: {
    dark: "#0D0D0D",
    dark2: "#252525",
    main: "#292929",
    light: "#303030",
    light2: "#404040",
    light3: "#505050",
    lighter: "#8C8C8C",
    lighter2: "#BDBDBD",
    lighter3: "#E0E0E0",
  },
  secondary: {
    main: "#910000",
    light: "#E30000",
    dark: "#590000",
    other: "#DA2C2C",
  },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#F5F5F5",
    secondary: "#b6b6b6",
    disabled: "#8C8C8C",
    main: "#F5F5F5",
    dark: "#b6b6b6",
    light: "#FFFFFF",
  },
  common: {
    white: "#FFFFFF",
    lite: "#e7e7e7",
  },
  transparentLevels: {
    1: "rgba(0,0,0,0.1)",
    2: "rgba(0,0,0,0.2)",
    3: "rgba(0,0,0,0.3)",
    4: "rgba(0,0,0,0.4)",
    5: "rgba(0,0,0,0.5)",
    6: "rgba(0,0,0,0.6)",
    7: "rgba(0,0,0,0.7)",
    8: "rgba(0,0,0,0.8)",
    9: "rgba(0,0,0,0.9)",
  },
  transparentLevelsWhite: {
    1: "rgba(255,255,255,0.1)",
    2: "rgba(255,255,255,0.2)",
    3: "rgba(255,255,255,0.3)",
    4: "rgba(255,255,255,0.4)",
    5: "rgba(255,255,255,0.5)",
    6: "rgba(255,255,255,0.6)",
    7: "rgba(255,255,255,0.7)",
    8: "rgba(255,255,255,0.8)",
    9: "rgba(255,255,255,0.9)",
  },
  transparentLevelsRed: {
    1: "rgba(255,0,0,0.1)",
    2: "rgba(255,0,0,0.2)",
    3: "rgba(255,0,0,0.3)",
    4: "rgba(255,0,0,0.4)",
    5: "rgba(255,0,0,0.5)",
    6: "rgba(255,0,0,0.6)",
    7: "rgba(255,0,0,0.7)",
    8: "rgba(255,0,0,0.8)",
    9: "rgba(255,0,0,0.9)",
  },
};

const lightPalette = {
  mode: "light" as const,
  primary: {
    main: "#171717", // Strong dark for primary actions
    light: "#404040",
    dark: "#000000",
    contrastText: "#FFFFFF",
    // Preserving legacy keys just in case, mapped to new logic
    dark2: "#262626",
    light2: "#525252",
    light3: "#737373",
    lighter: "#A3A3A3",
    lighter2: "#D4D4D4",
    lighter3: "#E5E5E5",
  },
  secondary: {
    main: "#D32F2F", // Refined red
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#FFFFFF",
    other: "#E57373", // Keeping legacy key
  },
  background: {
    default: "#F3F4F6", // Light Gray for background to contrast with white cards
    paper: "#FFFFFF", // Pure White for cards
  },
  text: {
    primary: "#111827", // Cool gray 900
    secondary: "#4B5563", // Cool gray 600
    disabled: "#9CA3AF", // Cool gray 400
    // Legacy keys
    main: "#111827",
    dark: "#374151",
    light: "#000000", // Dark text for "light" key in light mode (counter-intuitive but usage based)
  },
  common: {
    white: "#FFFFFF",
    lite: "#F3F4F6",
  },
  // In Light Mode, 'transparentLevels' (used for backgrounds) should be White to create glass effect on gray BG
  transparentLevels: {
    1: "rgba(255,255,255,0.4)",
    2: "rgba(255,255,255,0.5)",
    3: "rgba(255,255,255,0.6)",
    4: "rgba(255,255,255,0.7)",
    5: "rgba(255,255,255,0.8)",
    6: "rgba(255,255,255,0.9)",
    7: "rgba(255,255,255,0.95)",
    8: "rgba(255,255,255,0.98)",
    9: "rgba(255,255,255,1.0)",
  },
  // In Light Mode, 'transparentLevelsWhite' (used for borders often) should be Dark to be visible
  transparentLevelsWhite: {
    1: "rgba(0,0,0,0.05)",
    2: "rgba(0,0,0,0.1)",
    3: "rgba(0,0,0,0.15)",
    4: "rgba(0,0,0,0.2)",
    5: "rgba(0,0,0,0.3)",
    6: "rgba(0,0,0,0.4)",
    7: "rgba(0,0,0,0.5)",
    8: "rgba(0,0,0,0.6)",
    9: "rgba(0,0,0,0.7)",
  },
  transparentLevelsRed: { ...darkPalette.transparentLevelsRed },
};

export function getTheme(mode: ColorMode): Theme {
  return createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    typography: {
      fontFamily: "var(--font-plus-jakarta), sans-serif",
      h1: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.3,
        "@media (max-width: 600px)": { fontSize: "1.5rem" },
      },
      h4: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "1.25rem",
        fontWeight: 500,
      },
      h6: {
        fontFamily: "var(--font-outfit), sans-serif",
        fontSize: "1rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: mode === "dark" ? "#D1D5DB" : "#374151",
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: mode === "dark" ? "#9CA3AF" : "#6B7280",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        color: mode === "dark" ? "#F3F4F6" : "#111827",
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: mode === "dark" ? "#D1D5DB" : "#374151",
      },
      button: {
        fontFamily: "var(--font-plus-jakarta), sans-serif",
        fontWeight: 600,
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
        color: mode === "dark" ? "#9CA3AF" : "#6B7280",
      },
    },
    ...commonSettings,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? "#0A0A0A" : "#FFFFFF",
            backgroundImage:
              mode === "dark"
                ? `radial-gradient(at 99% 97%, hsla(360, 100%, 50%, 0.15) 0px, transparent 50%),
                   radial-gradient(at -15% 40%, hsla(359, 100%, 50%, 0.1) 0px, transparent 50%)`
                : "none", // Cleaner look for light mode
            scrollbarColor: mode === "dark" ? "#333 #0A0A0A" : "#DDD #FFF",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "transparent",
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              backgroundColor: mode === "dark" ? "#333" : "#DDD",
              minHeight: "24px",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: mode === "dark" ? "#555" : "#AAA",
              },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none", // Remove default MUI dark mode overlay
          },
        },
      },
    },
  });
}
