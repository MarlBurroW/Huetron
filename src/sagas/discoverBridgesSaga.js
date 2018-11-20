import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  FETCH_BRIDGE_IP_ADDRESSES,
  fetchBrdigeIPFulFilledAction,
  fetchBrdigeIPRejectedAction,
} from '../store/actions/discoverBridgesActions';
import { fetchBridgesIPFromMeetHueAPI, fetchBridgeInfo } from '../services/api';

export default function* discoverBridgesSaga() {
  yield takeLatest(FETCH_BRIDGE_IP_ADDRESSES, fetchBridges);
}

export function* fetchBridges() {
  try {
    const bridgesIPs = yield call(fetchBridgesIPsFromMeethueAPISaga);

    let bridgeInfos = yield all(
      bridgesIPs.map(bridgeIP => {
        return call(fetchBridgeAdditionalInfoSaga, bridgeIP);
      })
    );

    bridgeInfos = bridgeInfos.filter(bridgeInfo => bridgeInfo !== null);

    yield put(fetchBrdigeIPFulFilledAction(bridgeInfos));
  } catch (e) {
    yield put(fetchBrdigeIPRejectedAction());
    return;
  }
}

export function* fetchBridgesIPsFromMeethueAPISaga() {
  return yield call(fetchBridgesIPFromMeetHueAPI);
}

export function* fetchBridgeAdditionalInfoSaga(bridge) {
  try {
    const bridgeInfo = yield fetchBridgeInfo(bridge);
    return Object.assign({}, bridgeInfo, bridge);
  } catch (e) {
    return null;
  }
}
