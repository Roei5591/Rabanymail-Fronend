import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import MailReducer from './MailReducer';
import ControlReducer from './ControlReducer';

const reducers = combineReducers({
  user: userReducer,
  mail: MailReducer,
  control: ControlReducer
  
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
