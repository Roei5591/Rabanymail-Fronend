
import Mail from './Mail';
import {  Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import React from 'react';



//const PureMail = React.memo(Mail);


const App  = () => {
  
  const {getUser , fetchAllMail} = useActions();
  

  const username  = useTypedSelector((state) => {
   // console.log("ERROR: " + state.user?.username );
    return state.user?.username 
  });

  //const loading = useTypedSelector((state) => {
   // return  state.user?.loading
  //});

  //const error = useTypedSelector((state) => {
  //  return  state.mail?.error
 // });


  
  
  useEffect(() => {
    if(username) 
    fetchAllMail();
    else
    getUser();

  },[username , getUser , fetchAllMail]);

  //before reaching the server for user
   if (username === undefined) return <></> ;
   
   //if no user is login
   if (!username) {
    return <>
        <Switch>
       
        <Route path="/login"  component ={SignIn}/>
        <Route path="/signup" component ={SignUp}/>
        
        <Route path="/" >
          <Redirect to="/login"/>
        </Route>

        </Switch>
        </>
   }
 
  return ( <Mail/>)

  
  }

export default App;
