import { Switch, Route, Redirect } from 'react-router-dom';
import makeStyles from './styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./MyAppBar";
import MailList from "./MailList";
import SideMenu from "./SideMenu";
import MailPage from "./MailPage";
import { useTypedSelector } from "../hooks/use-typed-selector";
import ComposeMail from "./ComposeMail";

const useStyles = makeStyles();

const List = () => {
  
  const composeMail = useTypedSelector(state =>  state.control?.composeMailOpen);

  return <>         
  <Switch>
    <Route path="/mail/:location" exact component ={MailList}/> 
    <Route path="/mail/:location/:mailID"  component={MailPage}/>
    
    <Route path="/" >
      <Redirect to="/mail/inbox"/>
    </Route>
  </Switch>
  {composeMail && <ComposeMail/>}
  </>
}

const Mail = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar/>
      <SideMenu/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <List/>
      </main>
    </div> 
  );
}

export default Mail;
