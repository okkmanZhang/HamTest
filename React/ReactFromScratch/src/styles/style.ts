import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
      position: "fixed",
      background: "lightgrey",
      bottom: 0,
      left: 0,
      right: 0,
      height: '50px'
    }
  }));
