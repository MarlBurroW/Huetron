import wretch from 'wretch';
import logger from './logger';

const REQUEST_TIMEOUT = 1000;
const DELAY = 1;

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

export function buildBridgeAPIUrl(bridge, resource) {
  return `http://${bridge.internalipaddress}/api/${resource}`;
}

export function apiCall(method, endpoint, payload) {
  logRequest({ method, endpoint, payload });

  return api
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
