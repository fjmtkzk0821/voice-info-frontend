import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./views/AppRouter";
import { store } from "./redux/store";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      // contrastText: 'rgba(0, 0, 0, 0.87)',
      // dark: 'rgb(100, 141, 174)',
      // light: 'rgb(166, 212, 250)',
      main: "#333",
    },
    secondary: {
      // contrastText: 'rgba(0, 0, 0, 0.87)',
      // dark: 'rgb(170, 100, 123)',
      // light: 'rgb(246, 165, 192)',
      main: "#ff9a00",
    },
    // background: {
    //   default: '#121212',
    //   level1: '#212121',
    //   level2: '#333',
    //   paper: '#424242'
    // }
  },
  shape: {
    borderRadius: 0,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
