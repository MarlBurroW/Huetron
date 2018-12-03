export const LINK_BRIDGE = 'LINK_BRIDGE';
export const LINK_BRIDGE_FULFILLED = 'LINK_BRIDGE_FULFILLED';
export const LINK_BRIDGE_REJECTED = 'LINK_BRIDGE_REJECTED';
export const LINK_BRIDGE_CANCEL = 'LINK_BRIDGE_CANCEL';
export const LINK_BRIDGE_DECREMENT_COUNTDOWN =
  'LINK_BRIDGE_DECREMENT_COUNTDOWN';

export function linkBridgeAction(bridgeToLink) {
  return { type: LINK_BRIDGE, bridgeToLink };
}

export function linkBridgeFulfilledAction() {
  return { type: LINK_BRIDGE_FULFILLED };
}

export function linkBridgeRejectedAction(error) {
  return { type: LINK_BRIDGE_REJECTED, error };
}

export function linkBridgeCancelAction() {
  return { type: LINK_BRIDGE_CANCEL };
}

export function linkBridgeDecrementCountDown() {
  return { type: LINK_BRIDGE_DECREMENT_COUNTDOWN };
}
