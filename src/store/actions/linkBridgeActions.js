export const LINK_BRIDGE = 'LINK_BRIDGE';

export const LINK_BRIDGE_FULFILLED = 'LINK_BRIDGE_FULFILLED';
export const LINK_BRIDGE_REJECTED = 'LINK_BRIDGE_REJECTED';

export function linkBridgeAction(bridge) {
  return { type: LINK_BRIDGE, bridge };
}

export function linkBridgeFulfilledAction(linkedBridge) {
  return { type: LINK_BRIDGE_FULFILLED, linkedBridge };
}

export function linkBridgeRejectedAction(error) {
  return { type: LINK_BRIDGE_REJECTED, error };
}
