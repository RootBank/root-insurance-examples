const Root = (key, sandbox) => {
  const baseUrl = sandbox ? 'https://sandbox.root.co.za/v1' : 'https://api.root.co.za/v1';

  const makeRequest = (data, path, cb) =>
    $.post({
      url: baseUrl + path,
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'Authorization': 'Basic ' + btoa(key + ':'),
        'Content-Type': 'application/json'
      }
    })
    .done(d => cb(null, d))
    .fail(e => cb(e, null));

  return {
    getQuote: (type, data, cb) => makeRequest(Object.assign({}, { type: type }, data), '/insurance/quotes', cb),
    createPolicyholder: (data, cb) => makeRequest(data, '/insurance/policyholders', cb),
    createApplication: (data, cb) => makeRequest(data, '/insurance/applications', cb),
    createPolicy: (data, cb) => makeRequest(data, '/insurance/policies', cb)
  };
};
