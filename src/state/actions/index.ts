import { ActionType } from '../action-types';
import { Mail  } from '../Mail';

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

export interface fetchAllMailAction {
  type: ActionType.FETCH_ALL_MAIL;
}

export interface fetchAllMailCompleteAction {
  type: ActionType.FETCH_ALL_MAIL_COMPLETE;
  payload: Mail[];
}

export interface  fetchAllMailErrorAction {
  type: ActionType.FETCH_ALL_MAIL_ERROR;
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


export interface sendMailAction {
  type: ActionType.SEND_MAIL;
}

export interface  sendMailCompleteAction {
  type: ActionType.SEND_MAIL_COMPLETE;
  payload: Mail;
}

export interface  sendMailErrorAction {
  type: ActionType.SEND_MAIL_ERROR;
  payload: string;
}

export interface setLocationAction {
  type: ActionType.SET_LOCATION;
  payload: string;
}

export interface markAsReadAction {
  type: ActionType.MARK_AS_READ;
  payload: {
    mailId: string[],
    isRead: boolean
  };
}


export interface markAsReadErrorAction {
  type: ActionType.MARK_AS_READ_ERROR;
  payload: string,

}

export interface toggleIsTrashAction {
  type: ActionType.TOGGLE_IS_TRASH;
  payload: string[];
}

export interface  toggleIsTrashErrorAction {
  type: ActionType.TOGGLE_IS_TRASH_ERROR;
  payload: string;
}

export interface deleteMailAction {
  type: ActionType.DELETE_MAIL;
  payload: string[];
}

export interface  deleteMailErrorAction {
  type: ActionType.DELETE_MAIL_ERROR;
  payload: string;
}

export interface  toggleMailCheckboxAction{
  type: ActionType.TOGGLE_MALI_CHECKBOX;
  payload: string;
}

export interface  toggleAllMailCheckboxAction{
  type: ActionType.TOGGLE_ALL_MALI_CHECKBOX;
  payload: {
    mailList: string[];
    reset: boolean | undefined;
  } 
}

  export interface  searchMailAction{ 
    type: ActionType.SEARCH_MAIL;
    payload: string;
  }

  export interface  setSendTimer{ 
    type: ActionType.SET_SEND_TIMER;
    payload: NodeJS.Timeout | null;
  }

  export interface  setSendTimerAction{ 
    type: ActionType.SET_SEND_TIMER;
    payload: NodeJS.Timeout | null;
  }

  export interface  saveDraftAction{ 
    type: ActionType.SAVE_DRAFT;
    payload: {
      to: string[],
      subject: string,
      html: string,
      flag: boolean,
    } | null;
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
  | fetchAllMailAction
  | fetchAllMailCompleteAction
  | fetchAllMailErrorAction
  | toggleStarAction
  | toggleStarErrorAction
  | toggleSidebarAction
  | openComposeMailAction
  | closeComposeMailAction
  | setLocationAction
  | sendMailAction
  | sendMailCompleteAction
  | sendMailErrorAction
  | markAsReadAction
  | markAsReadErrorAction
  | toggleIsTrashAction
  | toggleIsTrashErrorAction
  | deleteMailAction
  | deleteMailErrorAction
  | toggleMailCheckboxAction
  | toggleAllMailCheckboxAction
  | searchMailAction
  | setSendTimerAction
  | saveDraftAction;
