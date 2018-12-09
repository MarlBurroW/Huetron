import { fork, all } from 'redux-saga/effects';
import discoverBridgesSagaWatcher from './discoverBridgesSaga';
import linkBridgeSagaWatcher from './linkBridgeSaga';
import startupSaga from './startupSaga';
import unlinkBridgeSagaWatcher from './unlinkBridgeSaga';

function* rootSaga() {
  yield all([
    fork(startupSaga),
    fork(discoverBridgesSagaWatcher),
    fork(linkBridgeSagaWatcher),
    fork(unlinkBridgeSagaWatcher),
  ]);
}

export default rootSaga;
