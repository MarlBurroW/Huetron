import * as api from '../../services/api';
import * as discoverBridgesActions from '../actions/discoverBridgesActions';
import {
  flatMap,
  catchError,
  map,
  concat,
  merge,
  mergeAll,
  concatMap,
  mapTo,
  zip,
  filter,
  take,
  mergeMap,
  finalize,
  mergeMapTo,
  switchMap,
  exhaustMap,
} from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';

const discoverBridgesEpic = action$ =>
  action$.pipe(
    ofType(discoverBridgesActions.DISCOVER_BRIDGES),
    exhaustMap(action => from(api.fetchBridgesIPFromMeetHueAPI())),
    map(_ => {
      return [
        { internalipaddress: '10.0.0.160' },
        { internalipaddress: '10.0.0.160' },
        { internalipaddress: '10.0.0.160' },
      ];
    }),
    mergeMap(bridgesIPs => bridgesIPs),
    mergeMap(bridgeIP => from(api.fetchBridgeInfo(bridgeIP))),
    map(foundBridge =>
      discoverBridgesActions.discoverBridgesFoundAction(foundBridge)
    ),
    mapTo(discoverBridgesActions.discoverBridgesFulFilledAction()),
    catchError(error =>
      discoverBridgesActions.discoverBridgesRejectedAction(error)
    )

    // ,
    // map(_ => [
    //   { internalipaddress: '10.0.0.160' },
    //   { internalipaddress: '10.0.0.160' },
    //   { internalipaddress: '10.0.0.160' },
    // ]),
    // mergeMap(bridgesIPs => from(bridgesIPs)),
    // mergeMap(bridgeIP => x.catch(err => null)),
    // filter(foundBridge => foundBridge !== null),
    // map(foundBridge =>
    //   discoverBridgesActions.discoverBridgesFoundAction(foundBridge)
    // ),
    // catchError(error =>
    //   discoverBridgesActions.discoverBridgesRejectedAction(error)
    // )
  );

export default discoverBridgesEpic;
