import {
  call,
  select,
  put,
  race,
  all,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as linkBridgeActions from '../actions/linkBridgeActions';
import * as settingsActions from '../actions/settingsActions';
import * as linkBridgeSelectors from '../selectors/linkBridgeSelectors';
import * as settingsSelectors from '../selectors/settingsSelectors';

import * as api from '../../services/api';

export default function* linkBridgeSagaWatcher() {
  while (true) {
    yield take(linkBridgeActions.LINK_BRIDGE);
    yield race({
      task: call(linkBridgeSaga),
      cancel: take(linkBridgeActions.LINK_BRIDGE_CANCEL),
      linked: take(linkBridgeActions.LINK_BRIDGE_FULFILLED),
    });
  }
}

function* linkBridgeSaga(action) {
  while (true) {
    yield call(delay, 1000);
    yield put(linkBridgeActions.linkBridgeDecrementCountDownAction());
    const bridgeToLink = yield select(linkBridgeSelectors.bridgeToLinkSelector);
    const countDown = yield select(linkBridgeSelectors.countDownSelector);
    try {
      const result = yield call(api.authorizeBridge, bridgeToLink);
      if (result[0].success) {
        const authorizedBridge = Object.assign(
          { username: result[0].success.username },
          bridgeToLink
        );
        yield put(settingsActions.addLinkedBridgeAction(authorizedBridge));
        const currentBridgeId = yield select(
          settingsSelectors.currentBridgeIdSelector
        );

        if (!currentBridgeId) {
          yield put(
            settingsActions.setCurrentBridgeIdAction(authorizedBridge.bridgeid)
          );
        }

        yield put(linkBridgeActions.linkBridgeFulfilledAction());
      }
    } catch (e) {}

    if (countDown === 0) {
      yield put(linkBridgeActions.linkBridgeCancelAction());
    }
  }
}
