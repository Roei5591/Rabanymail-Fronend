import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router} from 'react-router-dom';
import { store } from './state';
import { Provider } from 'react-redux';


const RabanyMail  = () => {
  return (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  );
}


ReactDOM.render(<RabanyMail/>, document.querySelector('#root'));


