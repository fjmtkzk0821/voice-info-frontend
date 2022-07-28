import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
      white: true;
    }
}

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#ff9a00",
    },
    white: {
      main: "#fff",
    },
  },
};