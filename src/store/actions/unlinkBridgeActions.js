export const UNLINK_BRIDGE = 'UNLINK_BRIDGE';

export function unlinkBridgeAction(bridgeToUnlink) {
  return { type: UNLINK_BRIDGE, bridgeToUnlink };
}
