import { call, select, put, race, all, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as linkBridgeActions from '../actions/linkBridgeActions';
import * as linkBridgeSelectors from '../selectors/linkBridgeSelectors';
import * as api from '../../services/api';

export default function* linkBridgeSagaWatcher() {
  while (true) {
    yield take(linkBridgeActions.LINK_BRIDGE);
    yield race({
      task: call(linkBridgeSaga),
      cancel: take(linkBridgeActions.LINK_BRIDGE_CANCEL),
    });
  }
}

function* linkBridgeSaga(action) {
  while (true) {
    yield call(delay, 1000);

    const bridgeToLink = yield select(linkBridgeSelectors.bridgeToLink);

    yield all([
      put(linkBridgeActions.linkBridgeDecrementCountDown()),
      call(api.authorizeBridge, bridgeToLink),
    ]);
  }
}
