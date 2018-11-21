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
  const bridgesIPs = yield call(api.fetchBridgesIPFromMeetHueAPI);
  return bridgesIPs;
}

export function* fetchBridgeAdditionalInfoSaga(bridge) {
  try {
    const bridgeInfo = yield call(api.fetchBridgeInfo, bridge);
    bridgeInfo.internalipaddress = bridge.internalipaddress;
    return bridgeInfo;
  } catch (e) {
    return null;
  }
}
