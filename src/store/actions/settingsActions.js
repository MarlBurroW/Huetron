export const ADD_LINKED_BRIDGE = 'ADD_LINKED_BRIDGE';
export const SET_DEFAULT_BRIDGE = 'SET_DEFAULT_BRIDGE';

export function addLinkedBridgeAction(authorizedBridge) {
  return { type: ADD_LINKED_BRIDGE, authorizedBridge };
}

export function setDefaultBridgeAction(authorizedBridge) {
  return { type: SET_DEFAULT_BRIDGE, authorizedBridge };
}
