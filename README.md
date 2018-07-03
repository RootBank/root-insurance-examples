# Root Examples

This repo contains example sites and apps to reference or copy when building on [Root](https://root.co.za).

## Insurance Examples

- [Funeral Cover](https://github.com/RootBank/examples/blob/master/module-funeral/funeral.html)

## Getting started

```
git clone https://github.com/RootBank/examples.git
cd examples
```

Each app lives in its own folder, and proxies requests through the basic Node server. This should/could be replaced by your own backend system.

### Using the server

Open `/server/index.js` and replace `INSERT_YOUR_API_KEY_HERE` with your own sandbox api key. Make sure the organisation has the specific product module type enabled.

```
cd server
npm install
npm start
```
