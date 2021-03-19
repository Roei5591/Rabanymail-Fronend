import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import SignUp from './components/SignUp';

import SignIn from './components/SignIn';


const T  = () => {
  
  const [data, setData] = useState<{ _id: string , username: string} | null>(null);

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:7777/user",
    }).then((res) => {
      setData(res.data);
      console.log("get user res:");
      console.log(res.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    console.log("WWW");
    getUser();
  },[]);


  return (<div>
 
  <Router>
  {data === null ? <Redirect to="/"/> : (data ? <Redirect to="/inbox"/> : <Redirect to="/login"/>  ) }
      <Switch>
      <Route path="/inbox">
        <App/>
      </Route>

      <Route path="/login">
      <SignIn getUser = {getUser}/>
      </Route>
      <Route path="/signup">
      <SignUp />
      </Route>
     



      </Switch>
  </Router>
  </div>);
}


ReactDOM.render(<T/>, document.querySelector('#root'));


