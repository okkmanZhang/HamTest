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
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {PositionProperty} from 'csstype';
import Example from './Hook1';

const theme = createMuiTheme({
  spacing: 2,
  palette: {
    primary: blue,
    secondary: green
  }
});

const useStyles = {
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
  },
  paper: {
    padding: theme.spacing(10)
  },
  footer: {
    position: "fixed" as PositionProperty,
    background: "lightgrey",
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px'
  }
};

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

            <Grid container className={classes.root} justify="center" spacing={6}>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paper}>

                    <div>Persons</div>
                    <List component="nav">
                      {this.state.persons && (this.state.persons || []).map((p : any, index : number) => <ListItem key={`person${index}`} button>
                        <ListItemText primary={`${p.personId}:${p.name}`}/>
                        <Button disabled={!!this.state.isEditing} onClick={() => this.itemRemove(p)}>
                          Remove
                        </Button>
                        <Button disabled={!!this.state.isEditing} onClick={() => this.itemEdit(p)}>
                          Edit
                        </Button>
                      </ListItem>)
}
                    </List>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paper}>
                    <div>
                      <div>
                        Create Person
                      </div>
                      <FormControl
                        margin="normal"
                        className={classes.formControl}
                        error={!!this.state.error && !!this.state.error.name}>
                        <Input
                          placeholder="name"
                          id="component-error"
                          value={this.state.name}
                          onChange={(d) => {
                          this.setState({name: d.currentTarget.value})
                        }}
                          aria-describedby="component-error-text"/> {this.state.error && this.state.error.name && <FormHelperText id="component-error-text">{this.state.error && this.state.error.name}</FormHelperText>}
                      </FormControl>

                    </div>
                    <div>
                      <Button variant="contained" color="primary" onClick={this.addPerson}>
                        {!this.state.isEditing
                          ? "ADD"
                          : "EDIT"}
                      </Button>
                      <Button onClick={this.Cancel}>
                        CANCEL
                      </Button>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paper}>
                    <div>
                      <div>
                        Person Addresses
                      </div>
                    </div>
                    <div></div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paper}>
                    <div>
                      <div>
                        Aliases
                          <Example />

                      </div>
                    </div>
                    <div></div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.footer}>
            <p style={{fontSize: 10}}>
              .List component
              .person, service
              .break app into components
              .router
              .jtest
              .build
              .deploy with server
              .create new material ui theme
              .auth2
              .sticky
              .databank blocks
              .Generic components
              .block design
              .create blocks
              .connect Generic blocks with server
              .connect Generic blocks, server and DB
              .framework for creating SPA by domain experts
              .Non-functional requirements framework
              .Scalability, Testablility, Maintainability, Performance, Security, Availablility
              .domain model/framework              
            </p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  Cancel = () => {
    this.setState({isEditing: false, personId: null, name: "", error: null});
  }

  itemRemove = (e : any) => {
    axios
      .post(`https://localhost:5001/api/Values/RemovePerson`, {personId: e.personId})
      .then(res => {
        this.getPersons();
      })
  }

  itemEdit = (e : any) => {
    this.setState({isEditing: true, personId: e.personId, name: e.name})
  }

  itemDoEdit = () => {
    axios
      .post(`https://localhost:5001/api/Values/EditPerson`, {
      personId: this.state.personId,
      name: this.state.name
    })
      .then(res => {
        this.getPersons();
      })
  }

  validate = () => {

    if (!!this.state.name) {
      this.setState({error: null})
    } else {

      this.setState({
        error: {
          name: "Name is required."
        }
      })
    }

    return !!this.state.name
      ? true
      : false;

  }

  addPerson = () => {

    if (!this.validate()) {
      return;
    }

    if (!this.state.isEditing) {

      axios
        .post(`https://localhost:5001/api/Values/SavePerson`, {name: this.state.name})
        .then(res => {
          this.getPersons();
        })
    } else {
      this.itemDoEdit();
    }

    this.Cancel();
  }

  getPersons = () => {
    axios.get(`https://localhost:5001/api/values`, {
      // headers: {   'Access-Control-Allow-Origin': '*' }
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
