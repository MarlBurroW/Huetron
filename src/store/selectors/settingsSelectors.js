export const currentBridgeIdSelector = state => state.settings.currentBridgeId;

export const currentBridgeSelector = state =>
  state.settings.linkedBridges.find(
    bridge => bridge.bridgeid === currentBridgeIdSelector(state)
  );

export const linkedBridgesSelector = state => state.settings.linkedBridges;
