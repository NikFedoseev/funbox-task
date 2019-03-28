import { combineReducers } from 'redux';
import { routeReducer } from './routeReducer';

export const rootReducer = combineReducers({
  route: routeReducer
})