import { Dispatch } from 'redux';
import { fetchInboxFromServer, toggleStarOnServer } from '../../helpers/messages';
import { loginSever, logoutServer , getUserFromServer } from '../../helpers/user';
import { ActionType } from '../action-types';
import {
  Action, closeComposeMailAction, openComposeMailAction, toggleSidebarAction,
} from '../actions';
import { Mail } from '../Mail';

import { RootState } from '../reducers';

export const toggleSideBar = (): toggleSidebarAction => {
  return {
    type: ActionType.TOGGLE_SIDEBAR,
  };
};

export const openComposeMail = (): openComposeMailAction => {
  return {
    type: ActionType.OPEN_COMPOSE_MAIL,
  };
};

export const closeComposeMail = (): closeComposeMailAction => {
  return {
    type: ActionType.CLOSE_COMPOSE_MAIL,
  };
};

export const login = (username: string , password: string) => {
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.LOGIN,});
    
  
    try {
      const {data} : {data: {username: string , firstChar: string}} = await loginSever(username, password);
     
      if(data) {
        dispatch({
          type: ActionType.LOGIN_SUCCESS,
          payload: {username: data.username , firstChar: data.firstChar}
        });
      } else {
        dispatch({
          type: ActionType.LOGIN_FAIL,
        });
      }
    
    } catch (err) {
      
      dispatch({
        type: ActionType.LOGIN_ERROR,
        payload: err.message
      });
    }
  };
};

export const getUser = () =>
{
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.GET_USER});
    
    try {
      const {data} : {data: {username: string , firstChar: string}}  = await getUserFromServer();

      ///console.log("sdsad " + data.charAt(0));
      dispatch({
        type: ActionType.GET_USER_COMPLETE,
        payload: {username: data.username , firstChar: data.firstChar}
      });
     
    
    } catch (err) {
     
      dispatch({
        type: ActionType.GET_USER_ERROR,
        payload: err.message
      });
    }
  };
}

export const logout = () =>
{
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.LOGOUT});
    
    try {
      await logoutServer();

      dispatch({
        type: ActionType.LOGOUT_COMPLETE
      });
     
    
    } catch (err) {
      
      dispatch({
        type: ActionType.LOGOUT_ERROR,
        payload: err.message
      });
    }
  };
}

export const fetchInbox = () =>
{
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.FETCH_INBOX});
    
    try {
      const inbox  = (await fetchInboxFromServer()).data;
      
      dispatch({
        type: ActionType.FETCH_INBOX_COMPLETE,
        payload: inbox
      });
     
    
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_INBOX_ERROR,
        payload: err.message
      });
    }
  };
}

export const toggleStar = (mailId : string) =>
{
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.TOGGLE_STAR , payload: mailId});
    
    try {
      await toggleStarOnServer(mailId);
      
    
    } catch (err) {
      console.log("star error: " + err.message)
      dispatch({
        type: ActionType.TOGGLE_STAR_ERROR,
        payload: err.message
      });
    }
  };
}

