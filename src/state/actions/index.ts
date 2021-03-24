import { ActionType } from '../action-types';
import { Mail,  } from '../Mail';

export interface  toggleSidebarAction {
  type: ActionType.TOGGLE_SIDEBAR;
}

export interface  openComposeMailAction {
  type: ActionType.OPEN_COMPOSE_MAIL;
}

export interface  closeComposeMailAction {
  type: ActionType.CLOSE_COMPOSE_MAIL;
}

export interface LoginAction {
  type: ActionType.LOGIN;
}

export interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: {username: string , firstChar: string};
}

export interface LoginErrorAction {
  type: ActionType.LOGIN_ERROR;
  payload:  string;
}

export interface LoginFailAction {
  type: ActionType.LOGIN_FAIL;
}

export interface getUserAction {
  type: ActionType.GET_USER;
}

export interface getUserCompleteAction {
  type: ActionType.GET_USER_COMPLETE;
  payload: {username: string , firstChar: string};
}

export interface getUserErrorAction {
  type: ActionType.GET_USER_ERROR;
  payload:  string;
}

export interface logoutAction {
  type: ActionType.LOGOUT;
}

export interface logoutCompleteAction {
  type: ActionType.LOGOUT_COMPLETE;
}

export interface  logoutErrorAction {
  type: ActionType.LOGOUT_ERROR;
  payload: string;
}

export interface fetchInboxAction {
  type: ActionType.FETCH_INBOX;
}

export interface fetchInboxCompleteAction {
  type: ActionType.FETCH_INBOX_COMPLETE;
  payload: Mail[];
}

export interface  fetchInboxErrorAction {
  type: ActionType.FETCH_INBOX_ERROR;
  payload: string;
}

export interface toggleStarAction {
  type: ActionType.TOGGLE_STAR;
  payload: string;
}

export interface  toggleStarErrorAction {
  type: ActionType.TOGGLE_STAR_ERROR;
  payload: string;
}







export type Action =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LoginFailAction
  | getUserAction
  | getUserCompleteAction 
  | getUserErrorAction
  | logoutAction
  | logoutCompleteAction 
  | logoutErrorAction
  | fetchInboxAction
  | fetchInboxCompleteAction
  | fetchInboxErrorAction
  | toggleStarAction
  | toggleStarErrorAction
  | toggleSidebarAction
  | openComposeMailAction
  | closeComposeMailAction;
