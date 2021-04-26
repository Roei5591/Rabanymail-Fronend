import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTypedSelector } from '../hooks/use-typed-selector';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarError = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const errorMassage = useTypedSelector((state) => {
    if(state.mail?.error){
    }
    return state.mail?.error;
   });
  
   useEffect(() => {
     if(errorMassage)
      setOpen(true);
   },[errorMassage])

  const handleClose = (event : any, reason: any) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>  
      <Snackbar 
      open={open} 
      autoHideDuration={9000} 
      onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity="error">
        {errorMassage}
        </MuiAlert>
      </Snackbar>  
   </div>
  );
}

export default SnackbarError
