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
import DeleteIcon from '@material-ui/icons/Delete';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';



const useStyles = makeStyles();

const SideMenu = () => {
  
  const classes = useStyles();
  const theme = useTheme();

  const {openComposeMail ,toggleSideBar ,setLocation} = useActions();
  
  const open = useTypedSelector(state => state.control?.sideBarOpen); 

  const location = useTypedSelector(state => state.control?.location); 


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
          {[
            ["Inbox", <InboxIcon />],
            ["Starred", <StarRoundedIcon/>] ,
            ["Sent" , <PresentToAllIcon/>],
            ["All mail" , <MailIcon /> ],
            ["trash",<DeleteIcon/>],
          ].map((text : any, index) => {
            
            const locationFromArray = text[0].toLocaleLowerCase().replaceAll( ' ', '');
            return (
            <Link to={'/mail/' + locationFromArray} style={{ textDecoration: 'none' , color: "inherit" }} key={text}>
            <ListItem 
            button key={text} 
            className={clsx({[classes.loc]: locationFromArray === location})}
            onClick= {() => { setLocation(locationFromArray)}}
            >
              <ListItemIcon>
                {text[1]}
              </ListItemIcon>
              <ListItemText primary={text[0]} />
            </ListItem>
            </Link>
            )
          }
          
          )}
            <Divider />
            <ListItem ></ListItem> 
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
