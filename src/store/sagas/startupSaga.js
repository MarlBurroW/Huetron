import * as api from '../../services/api';
import { select, call, put, all } from 'redux-saga/effects';
import * as settingsSelectors from '../selectors/settingsSelectors';
import * as settingsActions from '../actions/settingsActions';

export default function* startupSaga() {
  const linkedBridges = yield select(settingsSelectors.linkedBridgesSelector);
  // Update bridge information
  if (linkedBridges.length > 0) {
    let foundBridges = [];
    try {
      foundBridges = yield call(api.fetchBridgesIPFromMeetHueAPI);
    } catch (e) {}

    for (let i = 0; i < linkedBridges.length; i++) {
      // Update IP addresses
      let linkedBridge = linkedBridges[i];

      const foundBridge = foundBridges.find(
        bridge =>
          bridge.id.toUpperCase() === linkedBridge.bridgeid.toUpperCase()
      );

      if (
        foundBridge &&
        foundBridge.internalipaddress !== linkedBridge.internalipaddress
      ) {
        const IPUpdatedBridge = Object.assign({}, linkedBridge, {
          internalipaddress: foundBridge.internalipaddress,
        });

        yield put(settingsActions.addLinkedBridgeAction(IPUpdatedBridge));
      }

      // Update bridge info
      try {
        const updatedInfo = yield call(api.fetchBridgeInfo, linkedBridge);
        const updatedBridge = Object.assign({}, linkedBridge, updatedInfo);
        yield put(settingsActions.addLinkedBridgeAction(updatedBridge));
      } catch (e) {}
    }
  }
}
