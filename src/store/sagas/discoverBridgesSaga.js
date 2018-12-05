import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import * as discoverBridgesActions from '../actions/discoverBridgesActions';
import * as api from '../../services/api';

export default function* discoverBridgesSagaWatcher() {
  yield takeLatest(
    discoverBridgesActions.DISCOVER_BRIDGES,
    discoverBridgesSaga
  );
}

export function* discoverBridgesSaga() {
  try {
    const foundBridges = yield call(api.fetchBridgesIPFromMeetHueAPI);

    yield all(
      foundBridges.map(foundBridge => {
        return call(fetchBridgeInfoSaga, foundBridge);
      })
    );

    yield put(discoverBridgesActions.discoverBridgesFulFilledAction());
  } catch (e) {
    yield put(discoverBridgesActions.discoverBridgesRejectedAction());
  }
}

export function* fetchBridgeInfoSaga(foundBridge) {
  try {
    const bridgeInfo = yield call(api.fetchBridgeInfo, foundBridge);
    bridgeInfo.internalipaddress = foundBridge.internalipaddress;
    yield put(discoverBridgesActions.discoverBridgesFoundAction(bridgeInfo));
  } catch (e) {}
}
