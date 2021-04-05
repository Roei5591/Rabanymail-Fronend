import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles as makeStyles2, useTheme } from "@material-ui/core/styles";
import makeStyles from './styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./MyAppBar";
import MailList from "./MailList";
import SideMenu from "./SideMenu";
import MailPage from "./MailPage";
import { useTypedSelector } from "../hooks/use-typed-selector";
import ComposeMail from "./ComposeMail";
import { stat } from "node:fs";
import { useActions } from "../hooks/use-actions";

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

const List = () => {
  
  const composeMail = useTypedSelector(state =>  state.control?.composeMailOpen);


  return <div>        
    

  <Route path="/mail/:location" exact component ={MailList}> 
  
  </Route>
  
  
  <Route path="/mail/:location/:mailID"  component={MailPage}>
  </Route>
  
 
  
  {composeMail && <ComposeMail/>}
  
  </div>

}

const Plist = React.memo(List);

const PureMailList = React.memo(MailList);

const useStyles = makeStyles();

const Mail = (props : any) => {
  const classes = useStyles();
  const theme = useTheme();




  return (
   
    <div className={classes.root}>
       
      <CssBaseline />

      <AppBar/>

      <SideMenu/>
      
      <main className={classes.content}>
        <div className={classes.toolbar}/>
       
        <Plist/>

      
      </main>
    
    </div>
    
  );
}

export default Mail;
