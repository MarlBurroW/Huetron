import { combineReducers } from 'redux';
import discoverBridgesReducer from './discoverBridgesReducer';
import linkBridgeReducer from './linkBridgeReducer';
import settingsReducer from './settingsReducer';
import unlinkBridgeReducer from './unlinkBridgeReducer';

const AppReducers = combineReducers({
  discoveredBridges: discoverBridgesReducer,
  linkedBridges: linkBridgeReducer,
  unlinkBridge: unlinkBridgeReducer,
  settings: settingsReducer,
});

export default AppReducers;
