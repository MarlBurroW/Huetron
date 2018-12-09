import produce from 'immer';
import * as actions from '../actions/settingsActions';

const linkBridgeReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case actions.ADD_LINKED_BRIDGE:
        const existing = draft.linkedBridges.find(
          bridge => bridge.bridgeid === action.authorizedBridge.bridgeid
        );

        if (existing) {
          Object.assign(existing, action.authorizedBridge);
        } else {
          draft.linkedBridges.push(action.authorizedBridge);
        }

        break;
      case actions.REMOVE_LINKED_BRIDGE:
        const bridgeToRemove = draft.linkedBridges.find(
          bridge => bridge.bridgeid === action.bridgeToRemove.bridgeid
        );
        if (bridgeToRemove) {
          draft.linkedBridges.splice(
            draft.linkedBridges.indexOf(bridgeToRemove),
            1
          );
        }

        break;
      case actions.SET_DEFAULT_BRIDGE:
        draft.defaultBridgeId = action.authorizedBridge.bridgeid;
        break;
    }
  },
  {
    linkedBridges: [],
    defaultBridgeId: null,
  }
);

export default linkBridgeReducer;
