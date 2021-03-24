import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Mail } from '../Mail';

interface MailState {
  loading: boolean;
  
  error: string | null;
  mail: Mail[];
  
}

const initialState: MailState = {
  loading: false,
  error: null,
  mail: [],
};

const reducer = produce((state: MailState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_INBOX:
      state.loading = true;
      return

    case ActionType.FETCH_INBOX_COMPLETE:
      state.loading = false;
      state.mail = action.payload;
      return

    case ActionType.FETCH_INBOX_ERROR:
      state.loading = false;
      state.error = action.payload;
      return

    case ActionType.TOGGLE_STAR:
      const mailId = action.payload;
      const index = state.mail.findIndex(mail => mail._id === mailId)
      const newToggle = !state.mail[index].isStarred
      state.mail[index] = {...state.mail[index] , isStarred: newToggle }
       return
  
    case ActionType.TOGGLE_STAR_ERROR:
      state.error = action.payload;
      return
    
    default:
      return state;
  }
});


export default reducer;
