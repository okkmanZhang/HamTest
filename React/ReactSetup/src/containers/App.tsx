import React, { Fragment } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TestBlock1 from './../components/blocks/TestBlock1';
import TestBlock2 from './../components/blocks/TestBlock2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


export const TestContext = React.createContext("test test");

const App = () => {



  const classes = useStyles();

  return (<Fragment><AppBar position="static">
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
    <div style={{width: 500}}>
      <TestContext.Provider value="test dark">
        <Paper elevation={3} className="container">
          <TestBlock1>
          </TestBlock1>
        </Paper>
        <Paper elevation={3} className="container">
          <TestBlock2 />
        </Paper>
      </TestContext.Provider>
    </div>
  </Fragment>
  );
};

export default App;