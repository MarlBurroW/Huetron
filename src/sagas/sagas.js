import { fork, all } from 'redux-saga/effects';
import { discoverBridgesSaga } from './discoverBridgesSaga';

export default function* AppSaga() {
  yield all([fork(discoverBridgesSaga)]);
}
