import React from 'react';
import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import makeStyles from './styles';

const useStyles = makeStyles();

export default function MyAppBar({open} : {open: boolean}) {

 
 
  const classes = useStyles();
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
