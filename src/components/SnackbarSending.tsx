import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarSending = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  
  const sending = useTypedSelector((state) => {
    return state.mail?.sending;
   });

   const timer = useTypedSelector((state) => {
    return state.control?.timer;
   });

   
   const {clearTimer , setDraft} = useActions();

   useEffect(() => {
    if(timer){
      setOpen(true);
    } else if(!sending){
     setOpen(false);
   }
   },[sending , timer])

  const handleClick = () => {
    clearTimer();
    setDraft(null , true)
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const undoButton = 
  (timer  && <Button color="secondary" size="small" onClick={handleClick}>UNDO</Button>);

  return (
    <div className={classes.root}>  
      <Snackbar 
      open={open} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message = "Sending"
      action={
        <React.Fragment>
          {undoButton}
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
      }
      />
   </div>
  );
}

export default SnackbarSending
