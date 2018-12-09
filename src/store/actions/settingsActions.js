export const ADD_LINKED_BRIDGE = 'ADD_LINKED_BRIDGE';
export const SET_CURRENT_BRIDGE_ID = 'SET_CURRENT_BRIDGE_ID';
export const REMOVE_LINKED_BRIDGE = 'REMOVE_LINKED_BRIDGE';

export function addLinkedBridgeAction(authorizedBridge) {
  return { type: ADD_LINKED_BRIDGE, authorizedBridge };
}

export function removeLinkedBridgeAction(bridgeToRemove) {
  return { type: REMOVE_LINKED_BRIDGE, bridgeToRemove };
}

export function setCurrentBridgeIdAction(bridgeid) {
  return { type: SET_CURRENT_BRIDGE_ID, bridgeid };
}
