import clsx from "clsx";
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
import CreateSharpIcon from '@material-ui/icons/CreateSharp';

import { useCallback ,memo } from "react";

const linkStyle = { textDecoration: 'none' , color: "inherit" };

const useStyles = makeStyles();


const MenuItem = memo(({text , location} : any) => {
  
  const locationFromArray = text[0].toLocaleLowerCase().replaceAll( ' ', '');
  const classes = useStyles();
  const { setLocation} = useActions();


  const handleClick = useCallback((locationFromArray : string) => {
    return () => { 
      if(location !== locationFromArray)
      setLocation(locationFromArray)
    }
  } , [])

  return (
  <Link to={'/mail/' + locationFromArray} 
  style={linkStyle} 
  key={text}
  >
     
<ListItem 
button key={text} 
className={clsx({[classes.loc]: locationFromArray === location})}
onClick= {handleClick(locationFromArray)}
>
<ListItemIcon>
  {text[1]}
</ListItemIcon>
<ListItemText primary={text[0]} />

</ListItem>
</Link> )
})

const SideMenu = () => {
  
  const classes = useStyles();

  const {openComposeMail ,toggleSideBar ,setLocation} = useActions();
  
  const open = useTypedSelector(state => state.control?.sideBarOpen); 

  const location = useTypedSelector(state => state.control?.location); 

  const handleClick = useCallback((locationFromArray : string) => {
    return () => { 
      if(location !== locationFromArray)
      setLocation(locationFromArray)
    }
  } , [])

  const menuArray = [
    ["Inbox", <InboxIcon />],
    ["Starred", <StarRoundedIcon/>] ,
    ["Sent" , <PresentToAllIcon/>],
    ["All mail" , <MailIcon /> ],
    ["trash",<DeleteIcon/>],
  ];

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
       
        { menuArray.map((text : any, index) => {    
          
          return (
            <MenuItem key={text} text={text} location={location}/>
            )
          }
          
          )}
           
        <Divider />
        <ListItem ></ListItem> 
        <ListItem button key={"compose"} onClick={openComposeMail}>
          <ListItemIcon>
            <CreateSharpIcon /> 
          </ListItemIcon>
          <ListItemText primary={"compose"} />
        </ListItem>
      </List>

       
        
    
    </Drawer>
    </div>
  );
}

export default SideMenu;
