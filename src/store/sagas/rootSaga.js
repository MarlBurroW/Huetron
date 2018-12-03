import { fork, all } from 'redux-saga/effects';
import discoverBridgesSagaWatcher from './discoverBridgesSaga';
import linkBridgeSagaWatcher from './linkBridgeSaga';
import startupSaga from './startupSaga';

function* rootSaga() {
  yield all([
    fork(startupSaga),
    fork(discoverBridgesSagaWatcher),
    fork(linkBridgeSagaWatcher),
  ]);
}

export default rootSaga;
