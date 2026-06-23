exports.handler = async (event) => {
  const path = event.queryStringParameters?.path || '';
  const url = 'https://v3.football.api-sports.io' + path;
  try {
    const response = await fetch(url, {
      headers: { 'x-apisports-key': 'd65d0f5beaad8c0674a6392e3085cf60' }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
