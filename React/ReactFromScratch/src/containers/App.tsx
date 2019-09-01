import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';
import MainMenu from './MainMenu';
import MainScreen from './MainScreen';
import MainBottom from './MainBottom';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 11,
  },
  spacing: 2,
  palette: {
    primary: blue,
    secondary: green
  }
});

interface IProps { }

class App extends React.Component<IProps, any> {

  constructor(props: IProps) {
    super(props);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <MainMenu />
          <MainScreen />
          <MainBottom />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
