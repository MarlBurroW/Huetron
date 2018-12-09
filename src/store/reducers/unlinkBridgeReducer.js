import produce from 'immer';
import * as actions from '../actions/unlinkBridgeActions';

const unlinkBridgeReducer = produce((draft, action) => {
  switch (action.type) {
    case actions.UNLINK_BRIDGE:
      break;
  }
}, {});

export default unlinkBridgeReducer;
