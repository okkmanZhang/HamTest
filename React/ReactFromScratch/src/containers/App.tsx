import * as React from 'react';
import axios from 'axios';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {IStoreState, incrementSuccess, decrementSuccess} from '../store/store';
import {bindActionCreators} from "redux";
import {withStyles} from '@material-ui/core/styles';
import {purple, green, blue} from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {createMuiTheme, Paper, List, ListItem, ListItemText} from '@material-ui/core';

const theme = createMuiTheme({
  spacing: 2,
  palette: {
    primary: blue,
    secondary: green
  }
});

const useStyles = (theme : any) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  input: {
    display: 'none'
  },
  menu: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
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

interface IState {
  test?: number;
  anchorEl?: any;
  persons?: any;
}

class App extends React.Component < IProps,
IState > {

  constructor(props : IProps) {
    super(props);

    this.state = {
      test: null,
      anchorEl: null,
      persons: null
    }
  };

  componentDidMount() {
    this.getPersons();
  }

  render() {
    const {classes} = this.props;

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

              <Button color="inherit" onClick={this.handleClick} className={classes.menu}>
                Patient
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state && this.state.anchorEl}
                keepMounted
                open={Boolean(this.state && this.state.anchorEl)}
                onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              </Menu>
              <Button color="inherit" onClick={this.handleClick} className={classes.menu}>
                Service
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state && this.state.anchorEl}
                keepMounted
                open={Boolean(this.state && this.state.anchorEl)}
                onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              </Menu>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <div
            style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "20px",
            marginBottom: "10px"
          }}>
            <Button className={classes.button} onClick={this.addClick}>
              +
            </Button>
            <Button className={classes.button} onClick={this.minusClick}>
              -
            </Button>
            <label>
              count of bread: {this.props.count}
            </label>
            <Paper>
              <h3>Persons</h3>
              <List component="nav" aria-label="secondary mailbox folders">
                {this.state.persons && (this.state.persons || [])
                  .map((p : any, index : number) => <ListItem key={`person${index}`} button>
                  <ListItemText primary={`${p.personId}:${p.name}`} />
                </ListItem>)
}
              </List>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  getPersons = () => {
    axios.get(`https://localhost:5001/api/values`, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // }
    },).then(res => {

      console.warn(res);

      const persons = res.data;

      this.setState({persons});
    })
  }

  handleClick = (event : any) => {
    this.setState({anchorEl: event.currentTarget});
  }

  handleClose = () => {
    this.setState({anchorEl: null});
  }

  addClick = () => {
    this
      .props
      .actions
      .incrementSuccess();
  }
  minusClick = () => {
    this
      .props
      .actions
      .decrementSuccess();
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
