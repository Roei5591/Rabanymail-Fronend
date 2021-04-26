import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface UserState {
  loading: boolean;
  fail: boolean;
  error: string | null;
  username: string | undefined;
  firstChar: string;
}

const initialState: UserState = {
  loading: true,
  fail: false,
  error: null,
  username: undefined,
  firstChar: "",
};

const reducer = produce((state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      state.loading = true;
      return

    case ActionType.LOGIN_SUCCESS:
      state.loading = false;
      state.fail = false;
      state.username = action.payload.username;
      state.firstChar = action.payload.firstChar;
      return

    case ActionType.LOGIN_FAIL:
      state.loading = false;
      state.fail = true;

      return;

    case ActionType.LOGIN_ERROR:
      state.loading = false;
      state.error = action.payload;
      return


      //may be useless
    case ActionType.GET_USER:
      state.loading = true;
      return
  
    case ActionType.GET_USER_COMPLETE:
      state.loading = false;
      state.fail = false;
      state.username = action.payload.username;
      state.firstChar = action.payload.firstChar;
      return
  
    case ActionType.GET_USER_ERROR:
      state.loading = false;
      state.error = action.payload;
      return  
      
    case ActionType.LOGOUT:
      state.loading = true;
      state.error = null;
      return
    
    case ActionType.LOGOUT_COMPLETE:
      state.loading = false;
      state.username = "";
      state.firstChar = "";
      return
    
    case ActionType.LOGOUT_ERROR:
      state.loading = false;
      state.error = action.payload;
      return  
  
    default:
      return state;
  }
});


export default reducer;
