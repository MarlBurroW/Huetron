import nock from 'nock';

import {
  fetchBridgesSaga,
  fetchBridgesIPsFromMeethueAPISaga,
  discoverBridgesSaga,
} from '../sagas/discoverBridgesSaga';
import { expectSaga } from 'redux-saga-test-plan';
import {
  fetchBridgeIPAction,
  fetchBridgeIPFulFilledAction,
  fetchBridgeIPRejectedAction,
} from '../store/actions/discoverBridgesActions';

describe('my beverage', () => {
  it('fetchBridges Sagas puts fetchBridgeIPRejectedAction action when Meethue is down', () => {
    nock('https://discovery.meethue.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/')
      .reply(500);

    return expectSaga(discoverBridgesSaga)
      .put(fetchBridgeIPRejectedAction())
      .dispatch(fetchBridgeIPAction())
      .run();
  });

  it('fetchBridges Sagas puts fetchBridgeIPRejectedAction action when a request timeout happens (>5000ms)', () => {
    nock('https://discovery.meethue.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/')
      .socketDelay(6000)
      .reply(500);

    return expectSaga(discoverBridgesSaga)
      .put(fetchBridgeIPRejectedAction())
      .dispatch(fetchBridgeIPAction())
      .run();
  });
});
