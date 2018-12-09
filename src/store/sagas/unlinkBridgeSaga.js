import { put, takeEvery } from 'redux-saga/effects';
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
  yield put(settingsActions.removeLinkedBridgeAction(action.bridgeToUnlink));
}
