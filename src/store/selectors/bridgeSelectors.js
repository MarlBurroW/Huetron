import { linkedBridges } from './settingsSelectors';
import { discoveredBridges } from './discoverBridgesSelectors';
import _ from 'lodash';

export const mergedBridges = state => {
  const clinkedBridges = linkedBridges(state);
  const cdiscoveredBridges = discoveredBridges(state);

  return _.unionBy(clinkedBridges, cdiscoveredBridges, 'bridgeid');
};
