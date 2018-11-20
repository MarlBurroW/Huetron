export const FETCH_BRIDGE_IP_ADDRESSES = 'FETCH_BRIDGE_IP_ADDRESSES';

export const FETCH_BRIDGE_IP_ADDRESSES_FULFILLED =
  'FETCH_BRIDGE_IP_ADDRESSES_FULFILLED';
export const FETCH_BRIDGE_IP_ADDRESSES_REJECTED =
  'FETCH_BRIDGE_IP_ADDRESSES_REJECTED';

export function fetchBrdigeIPAction() {
  return { type: FETCH_BRIDGE_IP_ADDRESSES };
}

export function fetchBrdigeIPFulFilledAction(bridges) {
  return { type: FETCH_BRIDGE_IP_ADDRESSES_FULFILLED, bridges };
}

export function fetchBrdigeIPRejectedAction(error) {
  return { type: FETCH_BRIDGE_IP_ADDRESSES_REJECTED, error };
}
