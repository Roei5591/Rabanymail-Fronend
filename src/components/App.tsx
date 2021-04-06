import ReactDOM from 'react-dom';
import Mail from './Mail';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import React from 'react';
import { ContactsOutlined } from '@material-ui/icons';


const PureMail = React.memo(Mail);


const App  = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  const {getUser , fetchAllMail} = useActions();
  

  const username  = useTypedSelector((state) => {
   // console.log("ERROR: " + state.user?.username );
    return state.user?.username 
  });

  const loading = useTypedSelector((state) => {
    return  state.user?.loading
  });

  const error = useTypedSelector((state) => {
    
    return  state.mail?.error
  });


  
  
  useEffect(() => {
    if(username) 
    fetchAllMail();
    else
    getUser();

  },[username]);

    
   if (username === undefined) return <></> 
   if (!username) {
    return (
    <div>
    <Redirect to="/login"/>
    <Route path="/login">
    <SignIn />
     </Route>

  <Route path="/signup">
    <SignUp />
  </Route>
  </div>
  )
  } else 
  return (
    
      
     
        <Mail/>
   

     
     
  )

  
  }

export default App;
