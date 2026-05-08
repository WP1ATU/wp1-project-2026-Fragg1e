require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function callSnookerApi(params) {
  const response = await axios.get(process.env.SNOOKER_API_BASE, {
    params: params,
    headers: {
      'X-Requested-By': process.env.SNOOKER_API_HEADER
    }
  });

  return response.data;
}

const cache = new Map();

async function cachedCall(key, ttlMs, params) { //helps with caching to keep to 10 / min
  const cached = cache.get(key);

  if (cached && Date.now() - cached.time < ttlMs) {
    return cached.data;
  }

  const data = await callSnookerApi(params);

  cache.set(key, {
    time: Date.now(),
    data: data
  });

  return data;
}

app.get('/', (req, res) => {
  res.send('SnookerStats server is running');
});

app.get('/api/live-matches', async (req, res) => {
  try {
    const data = await cachedCall(
      'live-matches',
      60 * 1000,
      { t: 7, tr: 'main' }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Could not load live matches'
    });
  }
});

app.get('/api/rankings', async (req, res) => {
  try {
    const data = await cachedCall(
      'rankings',
      30 * 60 * 1000,
      { rt: 'MoneyRankings', s: 2025 }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Could not load rankings'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
