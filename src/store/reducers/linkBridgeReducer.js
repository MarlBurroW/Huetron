import produce from 'immer';
import * as actions from '../actions/linkBridgeActions';

const linkBridgeReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case actions.LINK_BRIDGE:
        draft.bridgeToLink = action.bridgeToLink;
        draft.countDown = 30;
        break;
      case actions.LINK_BRIDGE_FULFILLED:
        draft.countDown = 0;
        draft.bridgeToLink = null;

        break;
      case actions.LINK_BRIDGE_REJECTED:
        draft.bridgeToLink = null;
        draft.countDown = 0;
        break;
      case actions.LINK_BRIDGE_CANCEL:
        draft.bridgeToLink = null;
        draft.countDown = 0;
        break;
      case actions.LINK_BRIDGE_DECREMENT_COUNTDOWN:
        draft.countDown -= 1;
        break;
    }
  },
  {
    bridgeToLink: null,
    countDown: 0,
  }
);

export default linkBridgeReducer;
