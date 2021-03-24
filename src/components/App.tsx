import ReactDOM from 'react-dom';
import Mail from './Mail';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';


const App  = () => {
  
  const [data, setData] = useState<any>({ username: "" , loading: false});
  const {getUser} = useActions();
  const {username , loading} = useTypedSelector((state) => {
    return { username: state.user?.username , loading: state.user?.loading};
  });


 
  
  useEffect(() => {
    getUser();
  },[]);

  //useEffect(() => {
    //setData({username , loading});
    //console.log(username , loading);
  //},[username, loading]);

  if(loading) return <h1>Loading...</h1>
  else if (!username ) return (
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
  
  return (
    <div>
      
      <Switch>

      <Route path="/loading">
        <h1>Loading...</h1>
      </Route>

      <Route path="/Mail">
        <Mail/>
      </Route>

      <Route path="/login">
        <Redirect to="/mail/inbox"/>
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>
     



      </Switch>
      </div>
  )
  }

export default App;
