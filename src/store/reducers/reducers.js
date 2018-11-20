import { combineReducers } from 'redux';
import discoverBridgesReducer from './discoverBridgesReducer';

const AppReducers = combineReducers({
  discoveredBridges: discoverBridgesReducer,
});

export default AppReducers;
