const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

if (!process.env.API_KEY) {
  console.error('No `API_KEY` environment variable found - exiting...');
  process.exit(1);
}

if (!process.env.SANDBOX) {
  console.error('No `SANDBOX` environment variable found - exiting...');
  process.exit(1);
}

const app = express();
const port = process.env.APP_PORT || '3000';
const sandbox = !!process.env.SANDBOX;
const key = process.env.API_KEY;
const auth = 'Basic ' + Buffer.from(key + ':').toString('base64');
const basePath = sandbox ? 'https://sandbox.root.co.za' : 'https://api.root.co.za';

app.use(bodyParser.json());
app.use((req, res) => request({
  url: basePath + req.path,
  method: req.method,
  json: true,
  body: req.body,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': auth
  }
}).pipe(res));

app.listen(port, () => console.log(`Proxy listening on port ${port}...`));
