import { combineReducers } from 'redux';
import discoverBridgesReducer from './discoverBridgesReducer';
import linkBridgeReducer from './linkBridgeReducer';
import settingsReducer from './settingsReducer';

const AppReducers = combineReducers({
  discoveredBridges: discoverBridgesReducer,
  linkedBridges: linkBridgeReducer,
  settings: settingsReducer,
});

export default AppReducers;
