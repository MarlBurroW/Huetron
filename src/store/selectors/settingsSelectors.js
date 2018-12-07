export const defaultBridgeIdSelector = state => state.settings.defaultBridgeId;

export const defaultBridgeSelector = state =>
  state.settings.linkedBridge.find(
    bridge => bridge.bridgeid === defaultBridgeIdSelector(state)
  );

export const linkedBridgesSelector = state => state.settings.linkedBridges;
