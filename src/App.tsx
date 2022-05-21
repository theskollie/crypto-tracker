import React, { useState } from 'react';
import './App.css';
import AppShellContainer from './components/AppShell';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';


function App() {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  return (
  <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ 
      colorScheme,
      }} withGlobalStyles withNormalizeCSS>
      <AppShellContainer />
    </MantineProvider>
  </ColorSchemeProvider>
  );
}

export default App;
