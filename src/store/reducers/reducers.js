import { combineReducers } from 'redux';
import discoverBridgesReducer from './discoverBridgesReducer';
import linkBridgeReducer from './linkBridgeReducer';

const AppReducers = combineReducers({
  discoveredBridges: discoverBridgesReducer,
  linkedBridges: linkBridgeReducer,
});

export default AppReducers;
