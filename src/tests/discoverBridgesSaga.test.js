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
import discoverBridgesReducer from '../store/reducers/discoverBridgesReducer';

describe('my beverage', () => {
  it('fetchBridges Sagas puts fetchBridgeIPRejectedAction action when Meethue is down', () => {
    nock('https://discovery.meethue.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/')
      .reply(500);

    return expectSaga(discoverBridgesSaga)
      .put(fetchBridgeIPRejectedAction())
      .dispatch(fetchBridgeIPAction())
      .silentRun();
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
      .silentRun();
  });

  it('discoverBridgesSaga Saga should set the good redux state when succeed', () => {
    nock('https://discovery.meethue.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/')
      .reply(200, [
        { id: '001788fffe2737bf', internalipaddress: '10.0.0.160' },
      ]);

    nock('http://10.0.0.160')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/api/config')
      .reply(200, {
        name: 'EN-HUE-BRIDGE',
        datastoreversion: '76',
        swversion: '1811151255',
        apiversion: '1.30.0',
        mac: '00:17:88:27:37:bf',
        bridgeid: '001788FFFE2737BF',
        factorynew: false,
        replacesbridgeid: '001788FFFE145428',
        modelid: 'BSB002',
        starterkitid: '',
      });

    return expectSaga(discoverBridgesSaga)
      .withReducer(discoverBridgesReducer)
      .hasFinalState({
        bridges: [
          {
            name: 'EN-HUE-BRIDGE',
            datastoreversion: '76',
            swversion: '1811151255',
            apiversion: '1.30.0',
            mac: '00:17:88:27:37:bf',
            bridgeid: '001788FFFE2737BF',
            factorynew: false,
            replacesbridgeid: '001788FFFE145428',
            modelid: 'BSB002',
            starterkitid: '',
            internalipaddress: '10.0.0.160',
          },
        ],
        fetching: false, // <-- age changes in store state
      })
      .dispatch(fetchBridgeIPAction())
      .silentRun();
  });
});
