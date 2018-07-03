const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const app = express();
const port = process.env.APP_PORT || '3000';
const key = process.env.API_KEY || 'INSERT_YOUR_API_KEY_HERE';
const auth = 'Basic ' + Buffer.from(key + ':').toString('base64');
const sandbox = true; // !!process.env.SANDBOX;
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

app.listen(port, () => console.log(`Proxy server listening on port ${port}...`));
