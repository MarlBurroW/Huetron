import wretch from 'wretch';
import logger from './logger';

const api = wretch().middlewares([]);
const REQUEST_TIMEOUT = 5000;

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
