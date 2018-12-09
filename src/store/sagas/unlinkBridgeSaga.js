import { put, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as unlinkBridgeActions from '../actions/unlinkBridgeActions';
import * as settingsActions from '../actions/settingsActions';
import * as linkBridgeSelectors from '../selectors/linkBridgeSelectors';
import * as settingsSelectors from '../selectors/settingsSelectors';

import * as api from '../../services/api';

export default function* unlinkBridgeSagaWatcher() {
  yield takeEvery(unlinkBridgeActions.UNLINK_BRIDGE, unlinkBridgeSaga);
}

function* unlinkBridgeSaga(action) {
  const currentBridge = yield select(settingsSelectors.currentBridgeSelector);
  if (action.bridgeToUnlink.bridgeid === currentBridge.bridgeid) {
    const linkedBridges = yield select(settingsSelectors.linkedBridgesSelector);
    const newCurrentBridge = linkedBridges.find(
      bridge => bridge.bridgeid !== action.bridgeToUnlink.bridgeid
    );
    if (newCurrentBridge) {
      yield put(
        settingsActions.setCurrentBridgeIdAction(newCurrentBridge.bridgeid)
      );
    } else {
      yield put(settingsActions.setCurrentBridgeIdAction(null));
    }
  }
  yield put(settingsActions.removeLinkedBridgeAction(action.bridgeToUnlink));
}
