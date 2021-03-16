import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles as makeStyles2, useTheme } from "@material-ui/core/styles";
import makeStyles from './styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./MyAppBar";
import MailList from "./MailList";
import SideMenu from "./SideMenu";
import Mail from "./Mail";

const drawerWidth = 200;

const useStyles2 = makeStyles2((theme) => {
  const drawerWithClose = theme.spacing(7) + 1;

  return {
    root: {
      display: "flex"
    },
    appBar: {
      
      width: `calc(100% - ${drawerWithClose}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },

    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: drawerWithClose
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  };
});

const useStyles = makeStyles();

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <Router>
    <div className={classes.root}>
       
      <CssBaseline />

      <AppBar open={open}/>

      <SideMenu open={open} toggleDrawer={toggleDrawer}/>
      
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
        <Route path="/inbox" exact>
        <MailList/>
        </Route>
        <Route path="/inbox/:mailID" component={Mail}>
        </Route>

        </Switch>

      </main>
    
    </div>
    </Router>
  );
}

export default App;
