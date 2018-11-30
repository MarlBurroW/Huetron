import { combineEpics } from 'redux-observable';
import discoverBridgesEpic from './discoverBridgesEpic';

export default combineEpics(discoverBridgesEpic);
