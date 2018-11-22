import {
  fetchBridgeIPAction,
  fetchBridgeIPFulFilledAction,
  fetchBridgeIPRejectedAction,
} from '../store/actions/discoverBridgesActions';

export function discoverBridgesThunk() {
  return async function(dispatch, getState, { api }) {
    dispatch(fetchBridgeIPAction());

    const bridgesIPs = await api.fetchBridgesIPFromMeetHueAPI().catch(() => {
      dispatch(fetchBridgeIPRejectedAction());
      return null;
    });

    if (!bridgesIPs) return;

    const bridgeInfos = [];

    for (let i = 0; i < bridgesIPs.length; i++) {
      const bridgeIP = bridgesIPs[i];

      const bridgeInfo = await api.fetchBridgeInfo(bridgeIP).catch(err => null);
      if (bridgeInfo) {
        bridgeInfo.internalipaddress = bridgeIP.internalipaddress;
        bridgeInfos.push(bridgeInfo);
      }
    }

    dispatch(fetchBridgeIPFulFilledAction(bridgeInfos));
  };
}
