const Root = (proxyPath) => {
  const baseUrl = (proxyPath || 'http://localhost:3000') + '/v1';

  const makeRequest = (data, path, cb) =>
    $.post({
      url: baseUrl + path,
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .done(d => cb(null, d))
    .fail(e => cb(e, null));

  return {
    getQuote: (type, data, cb) => makeRequest(Object.assign({}, { type: type }, data), '/insurance/quotes', cb),
    createPolicyholder: (data, cb) => makeRequest(data, '/insurance/policyholders', cb),
    createApplication: (data, cb) => makeRequest(data, '/insurance/applications', cb),
    createPolicy: (data, cb) => makeRequest(data, '/insurance/policies', cb),
    getRandValue: amount => `${((parseInt(amount) / 100.0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  };
};
