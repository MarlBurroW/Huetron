import * as settingsSelectors from './settingsSelectors';
import _ from 'lodash';

export const discoveredBridgesSelector = state =>
  state.discoveredBridges.bridges;

export const isDiscoveringSelector = state => state.discoveredBridges.fetching;

export const mergedBridgesSelector = state => {
  return _.unionBy(
    settingsSelectors.linkedBridgesSelector(state),
    discoveredBridgesSelector(state),
    'bridgeid'
  );
};
