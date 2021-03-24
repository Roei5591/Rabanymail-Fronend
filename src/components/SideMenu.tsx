import clsx from "clsx";
import { makeStyles as makeStyles2, useTheme } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import makeStyles from './styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";



const useStyles = makeStyles();

const SideMenu = () => {
  
  const classes = useStyles();
  const theme = useTheme();
  const {openComposeMail ,toggleSideBar} = useActions();
  const open = useTypedSelector((state) => {
    return state.control?.sideBarOpen 
  });



 

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={toggleSideBar} >
            {open ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <Link to={'/Mail/' + text} style={{ textDecoration: 'none' , color: "inherit" }} key={text}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>

        <Divider />
        <List>
          {["All mail", "Trash"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}

            <ListItem button key={"compose"} onClick={openComposeMail}>
              <ListItemIcon>
               <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary={"compose"} />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default SideMenu;
