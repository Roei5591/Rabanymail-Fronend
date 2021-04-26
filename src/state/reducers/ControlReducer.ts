import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface ControlState {
  sideBarOpen: boolean;
  composeMailOpen: boolean;
  location: string;
  searchTermRegExp: RegExp | null;
  searchTerm: string;
  timer: NodeJS.Timeout | null;

}

const initialState: ControlState = {
  sideBarOpen: true,
  composeMailOpen: false,
  location: "",
  searchTermRegExp: null,
  searchTerm: "",
  timer: null,
};

const reducer = produce((state: ControlState = initialState, action: Action ) => {


  switch (action.type) {

    case ActionType.SET_SEND_TIMER:
      
      if(!action.payload && state.timer){
        clearTimeout(state.timer)
      }
      state.timer = action.payload;
      return

    case ActionType.SET_LOCATION:
      state.location = action.payload;
      return

    case ActionType.TOGGLE_SIDEBAR:
      state.sideBarOpen = !state.sideBarOpen

      return

      case ActionType.OPEN_COMPOSE_MAIL:
      state.composeMailOpen = true;

      return

      case ActionType.CLOSE_COMPOSE_MAIL:
        state.composeMailOpen = false;
        return

      case ActionType.SEARCH_MAIL:
        if(action.payload === "") {
          state.searchTermRegExp = null;
        } else {
          state.searchTermRegExp = new RegExp("(" + action.payload + ")(?!([^<]+)?>)", "gi");
        }
        state.searchTerm = action.payload;
      return

    default:
      return state;
  }
});


export default reducer;
