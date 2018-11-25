import {
  linkBridgeAction,
  linkBridgeFullfilledAction,
  linkBridgeRejectedAction,
} from '../actions/linkBridgeActions';

export function linkBridgeThunk(bridge) {
  return async function(dispatch, getState, { api }) {
    dispatch(linkBridgeAction(bridge));
  };
}
