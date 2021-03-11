import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import Drawer from '@material-ui/core/Drawer';
import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';




const App = () => {

  return (
      <div>
 <ResponsiveDrawer />

  

      </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));


