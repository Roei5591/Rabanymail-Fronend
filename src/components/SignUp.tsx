import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { registerServer } from '../helpers/user';
import { useHistory } from "react-router-dom";
import RabanyMailLogo from './RabanyMailLogo';



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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [singUpUsername, setSingUpUsername] = useState("");
  const [singUpPassword, setSingUpnPassword] = useState("");
  const [singUpPasswordConfirm, setSingUpPasswordConfirm] = useState("");

  const [singUpUsernameError, setSingUpUsernameError] = useState(undefined);
  const [singUpPasswordError, setSingUpnPasswordError] = useState(undefined );
  const [singUpPasswordConfirmError, setSingUpPasswordConfirmError] = useState(undefined);

  const signUpOnServer = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = (await registerServer(singUpUsername, singUpPassword, singUpPasswordConfirm)).data;
    console.log(errors);
    
    if(errors.length){
    setSingUpUsernameError(errors.find((e: {param: string}) => e.param === "username")?.msg )
    setSingUpnPasswordError(errors.find((e: {param: string}) => e.param === "password")?.msg )
    setSingUpPasswordConfirmError(errors.find((e: {param: string}) => e.param === "passwordConfirm")?.msg )
    } else {
      history.push("/login");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
      <RabanyMailLogo/>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={signUpOnServer}>
          <Grid container spacing={2}>
 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange = {e => setSingUpUsername(e.target.value)}
                helperText= {singUpUsernameError}
                error = {singUpUsernameError ? true : false}
              />
                </Grid>
         
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {e => setSingUpnPassword(e.target.value)}
                helperText= {singUpPasswordError}
                error = {singUpPasswordError ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-confirm"
                label="password confirm"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                onChange = {e => setSingUpPasswordConfirm(e.target.value)}
                helperText= {singUpPasswordConfirmError}
                error = {singUpPasswordConfirmError ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
            <Link  to={'/login'} style={{ textDecoration: 'none' , color: "inherit" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}