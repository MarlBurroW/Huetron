export const DISCOVER_BRIDGES = 'DISCOVER_BRIDGES';
export const DISCOVER_BRIDGES_FULFILLED = 'DISCOVER_BRIDGES_FULFILLED';
export const DISCOVER_BRIDGES_REJECTED = 'DISCOVER_BRIDGES_REJECTED';
export const DISCOVER_BRIDGES_FOUND_FULFILLED =
  'DISCOVER_BRIDGES_FOUND_FULFILLED';

export function discoverBridgesAction() {
  return { type: DISCOVER_BRIDGES };
}

export function discoverBridgesFulFilledAction() {
  return { type: DISCOVER_BRIDGES_FULFILLED };
}

export function discoverBridgesFoundAction(foundBridge) {
  return { type: DISCOVER_BRIDGES_FOUND_FULFILLED, foundBridge };
}

export function discoverBridgesRejectedAction(error) {
  return { type: DISCOVER_BRIDGES_REJECTED, error };
}
