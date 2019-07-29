import * as React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {IStoreState, incrementSuccess, decrementSuccess} from '../store/store';
import {bindActionCreators} from "redux";
import { withStyles } from '@material-ui/styles';
import { purple, green } from '@material-ui/core/colors';

const useStyles = (theme : any) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "2px",
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: "1px",
  },
  input: {
    display: 'none'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

interface IAppAction {
  incrementSuccess: any;
  decrementSuccess: any;
}

interface IProps {
  count?: number;
  actions?: IAppAction;
  classes?: any;
}

interface IState {
  test?: number;
}

class App extends React.Component <IProps, IState> {

  constructor(props : IProps) {
    super(props);
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div>
          <Button variant="contained" className={classes.button} onClick={this.addClick} >
            +
          </Button>
          <Button variant="contained" className={classes.button} onClick={this.minusClick} >
            -
          </Button>
          <label>
            count: {this.props.count}
          </label>

        </div>
      </div>
      </MuiThemeProvider>
    );
  }

  addClick = () => {
    this.props.actions.incrementSuccess();
  }
  minusClick = () => {
    this.props.actions.decrementSuccess();
  }
}

const mapStateToProps = (state : IStoreState) => ({count: state.count});

const mapDispatchToProps = (dispatch : any) => ({
  actions: bindActionCreators({
    incrementSuccess,
    decrementSuccess
  }, dispatch)
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(App));

