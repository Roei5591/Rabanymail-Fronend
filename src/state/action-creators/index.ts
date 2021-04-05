import { Dispatch } from 'redux';
import { fetchInboxFromServer, markAsReadOnServer, toggleStarOnServer , sendMailFromServer , fetchAllMailFromServer, toggleIsTrashOnServer, deleteMailOnServer} from '../../helpers/messages';
import { loginSever, logoutServer , getUserFromServer } from '../../helpers/user';
import { ActionType } from '../action-types';
import {
  Action,
   closeComposeMailAction,
   openComposeMailAction, 
   setLocationAction,
  toggleMailCheckboxAction,
   toggleSidebarAction,
   toggleAllMailCheckboxAction,
} from '../actions';
import { Mail } from '../Mail';

import { RootState } from '../reducers';

export const setLocation = (location: string): setLocationAction => {
  return {
    type: ActionType.SET_LOCATION,
    payload: location
  };
};

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

export const toggleMailCheckbox = (mailId: string): toggleMailCheckboxAction => {
  return {
    type: ActionType.TOGGLE_MALI_CHECKBOX,
    payload: mailId
  };
};

export const toggleAllMailCheckbox = (mailList: Mail[],reset? : boolean): toggleAllMailCheckboxAction => {
  return {
    type: ActionType.TOGGLE_ALL_MALI_CHECKBOX,
    payload: { mailList ,reset } 
  };
};

export const login = (username: string , password: string) => {
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.LOGIN,});
    
  
    try {
      const {data} : {data: {username: string , firstChar: string} | false} = await loginSever(username, password);
     
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

export const fetchAllMail = () =>
{
  return async (dispatch: Dispatch<Action> , getState: () => RootState) => {

    dispatch({type: ActionType.FETCH_ALL_MAIL});
    const mailSize = getState().mail?.mail.length || 0;
  
    try {
      const {allMail , needToUpdate}  = (await fetchAllMailFromServer(mailSize)).data;
     
      
      if(needToUpdate)
      dispatch({
        type: ActionType.FETCH_ALL_MAIL_COMPLETE,
        payload: allMail
      });
     
    
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_ALL_MAIL_ERROR,
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
      const res = await toggleStarOnServer(mailId);
      
      
    
    } catch (err) {
      
      dispatch({
        type: ActionType.TOGGLE_STAR_ERROR,
        payload: err.message
      });
    }
  };
}

export const sendMail = (msg: {
  to: string[],
  subject: string,
  html: string
  text: string | undefined
}) =>
{
  return async (dispatch: Dispatch<Action>) => {

    dispatch({type: ActionType.SEND_MAIL });
    
    try {
      const res = (await sendMailFromServer(msg)).data as Mail;
      console.log(res);
      dispatch({type: ActionType.SEND_MAIL_COMPLETE , payload: res });
    
    } catch (err) {
      console.log("star error: " + err.message)
      dispatch({
        type: ActionType.SEND_MAIL_ERROR,
        payload: err.message
      });
    }
  };
}

export const markAsRead = (mailId : string[] , isRead : boolean) =>
{

  return async (dispatch: Dispatch<Action>) => {
    
    try {
     
      await markAsReadOnServer(mailId , isRead);

      dispatch({type: ActionType.MARK_AS_READ , payload:{ mailId , isRead }});
    
    } catch (err) {
      
      dispatch({
        type: ActionType.MARK_AS_READ_ERROR,
        payload: err.message
      });
    }
  };
}

export const toggleIsTrash = (mailId : string[]) =>
{
  return async (dispatch: Dispatch<Action>) => {
    
    dispatch({type: ActionType.TOGGLE_IS_TRASH , payload: mailId});
    try {
      const res = await toggleIsTrashOnServer(mailId);
      
      
    
    } catch (err) {
      
      dispatch({
        type: ActionType.TOGGLE_IS_TRASH_ERROR,
        payload: err.message
      });
    }
  };
}

export const deleteMail = (mailId : string[]) =>
{
  return async (dispatch: Dispatch<Action>) => {
    
   
    try {
       await deleteMailOnServer(mailId);
       dispatch({type: ActionType.DELETE_MAIL , payload: mailId});
      
    
    } catch (err) {
      
      dispatch({
        type: ActionType.DELETE_MAIL_ERROR,
        payload: err.message
      });
    }
  };
}

