import _ from 'lodash';

export default () => next => (url, opts) => {
  // We create a new Response object to comply because wretch expects that from fetch.

  const response = new Response();
  console.log(url, opts);

  if (url === 'https://discovery.meethue.com/') {
    response.json = () =>
      Promise.resolve(
        _.shuffle([
          { id: '001788fffe2737bf', internalipaddress: '97.244.22.33' },
          { id: '394ffef3949ff939', internalipaddress: '10.34.21.10' },
          { id: '494feefjFJ499595', internalipaddress: '213.43.23.45' },
        ])
      );
  }

  if (url === 'http://97.244.22.33/api/config') {
    response.json = () =>
      Promise.resolve({
        name: 'Bridge 1',
        datastoreversion: '78',
        swversion: '1811261217',
        apiversion: '1.30.0',
        mac: '00:17:88:27:37:bf',
        bridgeid: '001788FFFE2737BF',
        factorynew: false,
        replacesbridgeid: '001788FFFE145428',
        modelid: 'BSB002',
        starterkitid: '',
      });
  }

  if (url === 'http://10.34.21.10/api/config') {
    response.json = () =>
      Promise.resolve({
        name: 'Bridge 2',
        datastoreversion: '78',
        swversion: '1811261217',
        apiversion: '1.30.0',
        mac: '00:17:88:27:37:bf',
        bridgeid: '394FFEF3949FF939',
        factorynew: false,
        replacesbridgeid: '001788FFFE145428',
        modelid: 'BSB002',
        starterkitid: '',
      });
  }

  if (url === 'http://213.43.23.45/api/config') {
    response.json = () =>
      Promise.resolve({
        name: 'Bridge 3',
        datastoreversion: '78',
        swversion: '1811261217',
        apiversion: '1.30.0',
        mac: '00:17:88:27:37:bf',
        bridgeid: '494FEEFJFJ499595',
        factorynew: false,
        replacesbridgeid: '001788FFFE145428',
        modelid: 'BSB002',
        starterkitid: '',
      });
  }

  return Promise.resolve(response);
};
