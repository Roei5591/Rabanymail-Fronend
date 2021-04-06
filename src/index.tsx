import './wdyr';

import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { store } from './state';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';




const T  = () => {
  
  return (
  <Provider store={store}>
   
  < Router>
     <App/>
   </Router>
  
  </Provider>
  );

}


ReactDOM.render(<T/>, document.querySelector('#root'));


