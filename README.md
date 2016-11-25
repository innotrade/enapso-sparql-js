
# Introduction
SPARQL Client (JavaScript) for Enapso Dash
  
# Installation
  ```bash
  npm install --save enapso-sparql-js
  ```

# Getting Started
For this example we will use a production installation of the [Enapso Enterprise Server](https://www.innotrade.com/products/enapso-enterprise-server), this is the [Enapso Dash](https://dash.innotrade.com) platform.
The library use [ES6 Promise](https://developers.google.com/web/fundamentals/getting-started/primers/promises) based APIs.

1. Creating connection instance:
  ```js
  const ClientBuilder = require('enapso-sparql-js');
  ClientBuilder({}).then((client) => {
      // client is ready to be used
  });
  ```

2. Running SPARQL queries:
  ```js
  client.query('EnapsoUnits', 'SELECT ?v WHERE {?s ?p ?v} LIMIT 5')
    .then(console.log)
    .catch(console.error);
  ```

2. Destroying:
  ```js
  client.close(() => console.log('disconnected'))
  ```

4. Join all together using a more elegant way, the [co library](https://www.npmjs.com/package/co):
  ```js
  const co = require('co');
  const ClientBuilder = require('enapso-sparql-js');

  co(function *(){
    // opening and login connection
    let client = yield ClientBuilder({});
    // run queries
    let response1 = yield client.query('EnapsoUnits', 'SELECT ?v WHERE {?s ?p ?v} LIMIT 5');
    let response2 = yield client.query('COSMO', 'SELECT ?v WHERE {?s ?p ?v} LIMIT 5');
    // ...

    // close connection
    yield conn.close();
  }).catch(console.error);
  ```

# Config params
All params are optionals, in the example are listed the default values.

```js
let config = {};
config.url = 'https://dash.innotrade.com/http'; // the Enapso Enterprise Server connection URL
config.username = 'guest'; // login username
config.password = 'guest'; // login password
config.autoSyncTimeout = 10000; // timeout used by the HttpClient to automatically pull messages from the server. Min value: 400ms
config.endpoint = 'https://dash.innotrade.com/sparql'; // SPARQL endpoint suffix 
```

# Tests
```bash
$ git clone https://github.com/innotrade/enapso-sparql-js.git
$ cd enapso-sparql-js/
$ npm install
$ npm test
```