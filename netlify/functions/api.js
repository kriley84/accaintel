const https = require('https');

exports.handler = async (event) => {
  const path = event.queryStringParameters?.path || '';
  const options = {
    hostname: 'v3.football.api-sports.io',
    path: path,
    headers: { 'x-apisports-key': 'd65d0f5beaad8c0674a6392e3085cf60' }
  };
  return new Promise((resolve) => {
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });
  });
};
