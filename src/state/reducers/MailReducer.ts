import produce , { enableMapSet } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Mail } from '../Mail';


enableMapSet();

interface MailState {
  loading: boolean;
  sending: boolean;
  error: string | null;
  mail: Mail[];
  checked: Set<string>;
  draft: {
    to: string[];
    subject: string;
    html: string;
    flag: boolean;
  } | null;
}

const initialState: MailState = {
  loading: false,
  sending: false,
  error: null,
  mail: [],
  checked: new Set(),
  draft: null
};

const reducer = produce((state: MailState = initialState, action: Action) => {
  

  switch (action.type) {

    case ActionType.SET_SEND_TIMER:
      
      if(state.draft){
      state.draft = {...state.draft , flag: true};
      }
      return

    case ActionType.SAVE_DRAFT:
      state.draft = action.payload;
      return
      
    case ActionType.FETCH_INBOX:
      state.loading = true;
      return

    case ActionType.FETCH_INBOX_COMPLETE:
      state.loading = false;
     // state.inbox = action.payload;
      return

    case ActionType.FETCH_INBOX_ERROR:
      state.loading = false;
      state.error = action.payload;
      return

    case ActionType.FETCH_ALL_MAIL:
        state.loading = true;
        return
  
    case ActionType.FETCH_ALL_MAIL_COMPLETE:
      state.loading = false;
      state.mail = action.payload;
      
      return
  
      case ActionType.FETCH_ALL_MAIL_ERROR:
        state.loading = false;
        state.error = action.payload;
        return  

    case ActionType.TOGGLE_STAR: {
      const mailId = action.payload;
      const index = state.mail.findIndex(mail => mail._id === mailId)
      const newToggle = !state.mail[index].isStarred
      state.mail[index] = {...state.mail[index] , isStarred: newToggle }
      return
    }
    case ActionType.TOGGLE_STAR_ERROR: 
      state.error = action.payload;
    
      return

    case ActionType.MARK_AS_READ: {
      const {mailId , isRead} = action.payload;
      for(const id of mailId) {
      const index = state.mail.findIndex(mail => mail._id === id)
      state.mail[index] = {...state.mail[index] , isRead: isRead }
      }
      return
    }

    case ActionType.SEND_MAIL:
      state.sending = true;
      return
    
    case ActionType.SEND_MAIL_COMPLETE:
      state.sending = false;
      state.mail.push(action.payload);
      return
    
    case ActionType.SEND_MAIL_ERROR:
      state.sending = false;
      state.error = action.payload;
      return

    case ActionType.MARK_AS_READ_ERROR:
      state.error = action.payload;
      return

    case ActionType.TOGGLE_IS_TRASH: {
      const mailId = action.payload;
      for(const id of mailId) {
      const index = state.mail.findIndex(mail => mail._id === id)
      const newToggle = !state.mail[index].isTrash;
      state.mail[index] = {...state.mail[index] , isTrash: newToggle }
      }
      return
    }
    
    case ActionType.TOGGLE_IS_TRASH_ERROR: 
      state.error = action.payload;
      return

    case ActionType.DELETE_MAIL: {
      const mailId = action.payload;
      const filletedMail = [];
      for(const mail of state.mail) {
      if(!mailId.includes(mail._id))
      filletedMail.push(mail);
      }
      state.mail = filletedMail;
      return 
  
    }
      
    case ActionType.DELETE_MAIL_ERROR: 
      state.error = action.payload;
      return
    
    case ActionType.TOGGLE_ALL_MALI_CHECKBOX:
      if(state.checked.size || action.payload.reset){
        state.checked = new Set();
      } else {
        state.checked = new Set(action.payload.mailList);
      }
      return

    case ActionType.TOGGLE_MALI_CHECKBOX:
        if(state.checked.has(action.payload)){
          state.checked.delete(action.payload);
        } else {
          state.checked.add(action.payload);
        }
        return

    default:
      return state;
  }
});


export default reducer;
