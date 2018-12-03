import { createSelector } from 'reselect';

export const defaultBridgeId = state => state.settings.defaultBridgeId;

export const defaultBridge = state =>
  state.settings.linkedBridge.find(
    bridge => bridge.bridgeid === defaultBridgeId(state)
  );

export const linkedBridges = state => state.settings.linkedBridges;
