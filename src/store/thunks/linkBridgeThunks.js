import * as actions from '../actions/linkBridgeActions';
import * as linkBridgeSelectors from '../selectors/linkBridgeSelectors';

export function linkBridgeThunk(discoveredDridge) {
  return async function(dispatch, getState, { api }) {
    dispatch(actions.linkBridgeAction(discoveredDridge));

    setInterval(() => {
      dispatch(actions.linkBridgeDecrementCountDown());
      console.log(linkBridgeSelectors.countDown(getState()));
    }, 1000);
  };
}

export function cancelBridgeLinkThunk() {
  return async function(dispatch, getState, { api }) {
    dispatch(actions.linkBridgeCancelAction());
  };
}
