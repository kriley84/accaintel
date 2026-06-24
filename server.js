const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'd65d0f5beaad8c0674a6392e3085cf60';
const API_BASE = 'https://v3.football.api-sports.io';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/:endpoint', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = `${API_BASE}/${req.params.endpoint}?${params}`;
    const response = await fetch(url, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`AccaIntel running on port ${PORT}`));
