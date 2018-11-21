export const FETCH_BRIDGE_IP_ADDRESSES = 'FETCH_BRIDGE_IP_ADDRESSES';

export const FETCH_BRIDGE_IP_ADDRESSES_FULFILLED =
  'FETCH_BRIDGE_IP_ADDRESSES_FULFILLED';
export const FETCH_BRIDGE_IP_ADDRESSES_REJECTED =
  'FETCH_BRIDGE_IP_ADDRESSES_REJECTED';

export function fetchBridgeIPAction() {
  return { type: FETCH_BRIDGE_IP_ADDRESSES };
}

export function fetchBridgeIPFulFilledAction(bridges) {
  return { type: FETCH_BRIDGE_IP_ADDRESSES_FULFILLED, bridges };
}

export function fetchBridgeIPRejectedAction(error) {
  return { type: FETCH_BRIDGE_IP_ADDRESSES_REJECTED, error };
}
