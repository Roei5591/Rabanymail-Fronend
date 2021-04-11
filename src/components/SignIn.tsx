import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link  to={'/'} style={{ textDecoration: 'none' , color: "inherit" }}>
        Rabany Mail
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert:{
    marginBottom:0,
    marginRight: 10,
    marginTop: 20,
    minHeight: 0,
    position: "relative",
    display: "flex",
    padding: "9px 12px 9px 20px",
    borderWidth: "1px 1px 1px 0px",
    borderStyle: "solid",
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 3,
    color: "rgb(143, 34, 27)",
    borderColor: "rgb(249, 211, 197) rgb(249, 211, 197) rgb(249, 211, 197) rgb(207, 74, 34)",
    backgroundColor: "rgb(252, 235, 226)",
  },
  alertText:{
 
  alignSelf: "center",
  mozBoxFlex: 1,
  flexGrow: 1,
  marginLeft: 15,
  marginRight: 10,
  color: "rgb(207, 74, 34)",
  }
  

}));

const SignIn = () => {
  const classes = useStyles();
  const {login} = useActions();

  const fail = useTypedSelector((state) => {
    return state.user?.fail;
   });

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const signInOnServer = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginUsername , loginPassword)

    window.addEventListener('beforeunload', function (e) {
      //e.preventDefault();
     // logout();
  });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Sign in
          </Typography>
         {fail && <div role="alert" className={classes.alert}  data-testid="bannerAuthCodeError">
         <WarningRoundedIcon style={{marginTop: 8}}/>
            
            <span className= {classes.alertText}>
              Please provide a valid username and password.
            </span>
            
            </div>}
      
        <form className={classes.form} noValidate onSubmit={signInOnServer}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            //autoComplete="username"
            autoFocus
            value = {loginUsername}
            error={fail}
            onChange = {e => setLoginUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {loginPassword}
            error={fail}
            onChange = {e => setLoginPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            <Link  to={'/login'} style={{ textDecoration: 'none' , color: "inherit" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <Link  to={'/signup'} style={{ textDecoration: 'none' , color: "inherit" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;