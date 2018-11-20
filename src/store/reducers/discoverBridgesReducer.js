import produce from 'immer';
import {
  FETCH_BRIDGE_IP_ADDRESSES,
  FETCH_BRIDGE_IP_ADDRESSES_FULFILLED,
  FETCH_BRIDGE_IP_ADDRESSES_REJECTED,
} from '../actions/discoverBridgesActions';

const discoverBridgesReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case FETCH_BRIDGE_IP_ADDRESSES:
        draft.fetching = true;
        draft.bridges = [];
        break;
      case FETCH_BRIDGE_IP_ADDRESSES_FULFILLED:
        draft.fetching = false;
        draft.bridges = action.bridges;
        break;
      case FETCH_BRIDGE_IP_ADDRESSES_REJECTED:
        draft.fetching = false;
        draft.bridges = [];
        break;
    }
  },
  {
    fetching: false,
    bridges: [],
  }
);

export default discoverBridgesReducer;
