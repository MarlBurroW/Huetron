import { createSelector } from 'reselect';

export const discoveredBridges = state => state.discoveredBridges.bridges;

export const isDiscovering = state => state.discoveredBridges.fetching;
