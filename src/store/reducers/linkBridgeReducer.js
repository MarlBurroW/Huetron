import produce from 'immer';
import {
  LINK_BRIDGE,
  LINK_BRIDGE_FULFILLED,
  LINK_BRIDGE_REJECTED,
} from '../actions/linkBridgeActions';

const linkBridgeReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case LINK_BRIDGE:
        draft.bridgeToLink = action.bridge;
        draft.countDown = 30;
        break;
      case LINK_BRIDGE_FULFILLED:
        draft.countDown = 0;
        draft.bridgeToLink = null;
        draft.bridges.push(action.linkedBridge);
        break;
      case LINK_BRIDGE_REJECTED:
        draft.bridgeToLink = null;
        draft.countDown = 0;
        break;
    }
  },
  {
    bridgeToLink: null,
    countDown: 0,
    bridges: [],
  }
);

export default linkBridgeReducer;
