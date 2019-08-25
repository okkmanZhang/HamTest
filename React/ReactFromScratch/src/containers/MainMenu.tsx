import * as React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from "../styles/style";


export default function MainMenu(t : any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles({});

  const handleClick = (event : any) => {
    this.setState({anchorEl: event.currentTarget});
  }

  const handleClose = () => {
    this.setState({anchorEl: null});
  }

  return (

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

        <Button color="inherit" onClick={handleClick} className={classes.menu}>
          Patient
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Menu>
        <Button color="inherit" onClick={handleClick} className={classes.menu}>
          Service
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Menu>

        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}