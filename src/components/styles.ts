import { makeStyles } from "@material-ui/core/styles";


const drawerWidth = 200;

export default () => makeStyles((theme) => {
  const drawerWithClose = theme.spacing(7) + 1;

  return {
    root: {
      display: "flex"
    },
    appBar: {
      display: "flex",
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
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(1)
    },
    AppBarRight: {
      marginLeft: 10
    },
    AppbBarMiddle: {
      flex: 1,  
      display: "flex",
      alignItems: "center",
      
    },
  search:{
    display: "flex",
    flex: 1,
    marginLeft: 20,
    maxWidth: 600,
    minWidth: 200
  },
   input: {
    marginLeft: theme.spacing(1),
    //maxWidth: 200,
    width: "100%"
  },
  iconButton: {
    padding: 10
  },
  loc:{
    backgroundColor: "rgba(0, 0, 0, 0.1) !important"
  }
  };
});