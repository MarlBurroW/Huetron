import wretch from 'wretch';
import logger from './logger';

const REQUEST_TIMEOUT = 5000;
const DELAY = 0;
const DEVICE_TYPE = 'chromehue-v3';

const delayMiddleware = delay => next => (url, opts) => {
  return new Promise(res => setTimeout(() => res(next(url, opts)), delay));
};

const api = wretch().middlewares([delayMiddleware(DELAY)]);

export function fetchBridgesIPFromMeetHueAPI() {
  return apiCall('get', 'https://discovery.meethue.com/');
}

export function fetchBridgeInfo(bridge) {
  return apiCall('get', buildBridgeAPIUrl(bridge, 'config'));
}

export function authorizeBridge(bridge) {
  return apiCall('post', buildBridgeAPIUrl(bridge), {
    devicetype: DEVICE_TYPE,
  });
}

export function buildBridgeAPIUrl(bridge, resource) {
  return `http://${bridge.internalipaddress}/api${
    resource ? '/' + resource : ''
  }`;
}

export function apiCall(method, endpoint, payload) {
  logRequest({ method, endpoint, payload });

  return api
    .headers({ 'Content-Type': 'application/json', Accept: 'application/json' })
    .url(endpoint)
    [method](payload)
    .setTimeout(REQUEST_TIMEOUT)
    .res(async response => {
      logResponse(response);
      return response.json();
    })
    .catch(err => {
      logger.error(`API CALL REQUEST ERROR: ${err}`);
      throw err;
    });
}

async function logResponse(response) {
  logger.log(
    `API CALL REPONSE ${response.ok ? 'OK' : 'KO'} - ${response.url} ${
      response.status
    }`,
    { body: await response.clone().json() }
  );
}

function logRequest(request) {
  logger.log(
    `API CALL REQUEST - ${request.method.toUpperCase()} ${request.endpoint}`,
    {
      payload: request.payload,
    }
  );
}
