import * as React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {IStoreState, incrementSuccess, decrementSuccess} from '../store/store';
import {bindActionCreators} from "redux";

import {purple, green, blue} from '@material-ui/core/colors';
import {
  createMuiTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import {PositionProperty} from 'csstype';
import Example from './Hook1';
import MainMenu from './MainMenu';
import { useStyles } from '../styles/style';
import MainScreen from './MainScreen';
import MainBottom from './MainBottom';

const theme = createMuiTheme({
  spacing: 2,
  palette: {
    primary: blue,
    secondary: green
  }
});


interface IAppAction {
  incrementSuccess : any;
  decrementSuccess : any;
}

interface IProps {
  count?: number;
  actions?: IAppAction;
  classes?: any;
}

interface personError {
  name?: string;
}

interface IState {
  test?: number;
  anchorEl?: any;
  persons?: any;
  name?: string;
  personId?: number;
  isEditing?: boolean;
  error?: personError;
}

class App extends React.Component < IProps,
IState > {

  constructor(props : IProps) {
    super(props);

    this.state = {
      test: null,
      anchorEl: null,
      persons: null,
      name: null,
      isEditing: false,
      error: null
    }
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

const mapStateToProps = (state : IStoreState) => ({count: state.count});

const mapDispatchToProps = (dispatch : any) => ({
  actions: bindActionCreators({
    incrementSuccess,
    decrementSuccess
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
