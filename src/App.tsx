import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from './utils/Theme';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoadingBackdrop from './components/LoadingBackdrop';
import AudioPlayer from './components/AudioPlayer';
import AppContainer from './AppContainer';
import Maintenance from './pages/Maintenance';



const theme = createTheme(themeOptions)

function App() {
  React.useEffect(() => {
    // document.getElementById("twttr-embed")
    var loadScript = (src: string) => {
      const s = document.createElement('script');
      s.async = true;
      s.src = src;
      document.head.appendChild(s);
    }

    loadScript(`${process.env.PUBLIC_URL}/twttr-embed.js`)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          {/* <Maintenance /> */}
          <LoadingBackdrop />
          <AudioPlayer />
          <AppContainer />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
