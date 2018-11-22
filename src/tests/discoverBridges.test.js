import nock from 'nock';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { FlushThunks } from 'redux-testkit';

import reducers from '../store/reducers/reducers';
import * as discoverBridgesSelectors from '../store/selectors/discoverBridgesSelectors';

import * as discoveredBridgesThunks from '../store/thunks/discoverBridgesThunks';
import * as api from '../services/api';

describe('Discover bridges Integration', () => {
  let flushThunks, store;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(
      reducers,
      applyMiddleware(flushThunks, thunk.withExtraArgument({ api }))
    );
  });

  it('Test redux state when discoverBridgesThunk fails caused by a meethue error', async () => {
    nock('https://discovery.meethue.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/')
      .reply(500);

    expect(discoverBridgesSelectors.isDiscovering(store.getState())).toBe(
      false
    );

    expect(
      discoverBridgesSelectors.discoveredBridges(store.getState())
    ).toEqual([]);

    await store.dispatch(discoveredBridgesThunks.discoverBridgesThunk());
    await flushThunks.flush();

    expect(discoverBridgesSelectors.isDiscovering(store.getState())).toBe(
      false
    );

    expect(
      discoverBridgesSelectors.discoveredBridges(store.getState())
    ).toEqual([]);
  });

  it('Test redux state when discoverBridgesThunk succeed', async () => {
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

    expect(discoverBridgesSelectors.isDiscovering(store.getState())).toBe(
      false
    );

    expect(
      discoverBridgesSelectors.discoveredBridges(store.getState())
    ).toEqual([]);

    await store.dispatch(discoveredBridgesThunks.discoverBridgesThunk());
    await flushThunks.flush();

    expect(discoverBridgesSelectors.isDiscovering(store.getState())).toBe(
      false
    );

    expect(
      discoverBridgesSelectors.discoveredBridges(store.getState())
    ).toEqual([
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
    ]);
  });
});
