import { fork, all } from 'redux-saga/effects';
import discoverBridgesSagaWatcher from './discoverBridgesSaga';
import linkBridgeSagaWatcher from './linkBridgeSaga';

function* rootSaga() {
  yield all([fork(discoverBridgesSagaWatcher), fork(linkBridgeSagaWatcher)]);
}

export default rootSaga;
