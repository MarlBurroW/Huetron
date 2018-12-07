import produce from 'immer';
import * as discoverBridgesActions from '../actions/discoverBridgesActions';
import _ from 'lodash';

const discoverBridgesReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case discoverBridgesActions.DISCOVER_BRIDGES:
        draft.fetching = true;
        draft.bridges = [];
        break;
      case discoverBridgesActions.DISCOVER_BRIDGES_FULFILLED:
        draft.fetching = false;
        break;
      case discoverBridgesActions.DISCOVER_BRIDGES_REJECTED:
        draft.fetching = false;
        draft.bridges = [];
        break;
      case discoverBridgesActions.DISCOVER_BRIDGES_FOUND_FULFILLED:
        draft.bridges.push(action.foundBridge);
        break;
      case discoverBridgesActions.DISCOVER_BRIDGES_SHUFFLE:
        draft.bridges = _.shuffle(draft.bridges);
        break;
    }
  },
  {
    fetching: false,
    bridges: [],
  }
);

export default discoverBridgesReducer;
