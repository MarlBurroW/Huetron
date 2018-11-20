import ky from 'ky';
import reactotron from './reactotron';

const api = ky.extend({
  timeout: 5000,
});

export function fetchBridgesIPFromMeetHueAPI() {
  return apiCall('get', 'https://discovery.meethue.com/');
}

export function fetchBridgeInfo(bridge) {
  return apiCall('get', 'http://' + bridge.internalipaddress + '/api/config');
}

export function apiCall(method, endpoint, payload) {
  if (process.env.NODE_ENV !== 'production') {
    reactotron.log(`API CALL REQUEST - ${method.toUpperCase()} ${endpoint}`, {
      payload,
    });
  }

  return api[method](endpoint, payload)
    .then(async response => {
      if (process.env.NODE_ENV !== 'production') {
        reactotron.log(
          `API CALL REPONSE ${
            response.ok ? 'OK' : 'KO'
          } - ${method.toUpperCase()} ${endpoint} ${response.status}`,
          { body: await response.clone().json() }
        );
      }

      return response.json();
    })
    .catch(err => {
      reactotron.error(`API CALL REQUEST ERROR: ${err}`);
    });
}
