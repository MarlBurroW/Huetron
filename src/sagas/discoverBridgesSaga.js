import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import {
  FETCH_BRIDGE_IP_ADDRESSES,
  fetchBridgeIPFulFilledAction,
  fetchBridgeIPRejectedAction,
} from '../store/actions/discoverBridgesActions';
import * as api from '../services/api';

export function* discoverBridgesSaga() {
  yield takeLatest(FETCH_BRIDGE_IP_ADDRESSES, fetchBridgesSaga);
}

export function* fetchBridgesSaga() {
  try {
    const bridgesIPs = yield call(fetchBridgesIPsFromMeethueAPISaga);

    let bridgeInfos = yield all(
      bridgesIPs.map(bridgeIP => {
        return call(fetchBridgeAdditionalInfoSaga, bridgeIP);
      })
    );

    bridgeInfos = bridgeInfos.filter(bridgeInfo => bridgeInfo !== null);

    yield put(fetchBridgeIPFulFilledAction(bridgeInfos));
  } catch (e) {
    yield put(fetchBridgeIPRejectedAction());
    return;
  }
}

export function* fetchBridgesIPsFromMeethueAPISaga() {
  return yield call(api.fetchBridgesIPFromMeetHueAPI);
}

export function* fetchBridgeAdditionalInfoSaga(bridge) {
  try {
    const bridgeInfo = yield api.fetchBridgeInfo(bridge);
    return Object.assign({}, bridgeInfo, bridge);
  } catch (e) {
    return null;
  }
}
