import{  useState } from 'react';
import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from './styles';
import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import SearchBar from './SearchBar'
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';



const useStyles = makeStyles();


export default function MyAppBar() {

  const classes = useStyles();

  const {logout} = useActions();

  const username  = useTypedSelector((state) => {
    return state.user?.username;
  });

  const  firstChar = useTypedSelector((state) => {
    return state.user?.firstChar;     
  });

  const open = useTypedSelector((state) => {
    return state.control?.sideBarOpen;
  });

  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <div >
       <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
        <Typography variant="h6" noWrap>
            Rabany Mail
          </Typography>
          

        <div className={classes.AppbBarMiddle}>
        <SearchBar />
           </div>
          
          <div className = {classes.AppBarRight}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> 
        <Tooltip title={`${username}@rabanymail.com`} aria-label="add">  
        <Avatar> {firstChar}  </Avatar>
       </Tooltip>
       </Button>
       <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography style={{margin: 10}} variant ="h5" > {`${username}@rabanymail.com`} </Typography>
        <MenuItem onClick={handleLogout}>
          
        <Button
            fullWidth
            variant="contained"
            color="secondary"
          >
          Logout
          </Button>
          </MenuItem>
      </Menu>

        </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


