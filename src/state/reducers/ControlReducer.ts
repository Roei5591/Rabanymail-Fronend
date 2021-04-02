import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface ControlState {
  sideBarOpen: boolean;
  composeMailOpen: boolean;
  location: string;

}

const initialState: ControlState = {
  sideBarOpen: true,
  composeMailOpen: false,
  location: "",
};

const reducer = produce((state: ControlState = initialState, action: Action) => {
  switch (action.type) {

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
    default:
      return state;
  }
});


export default reducer;
