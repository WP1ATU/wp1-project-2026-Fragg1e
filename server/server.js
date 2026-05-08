require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI) //connects to MongoDB using .env 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error.message);
  });

const predictionSchema = new mongoose.Schema({
  playerOneName: String,
  playerTwoName: String,
  predictedWinnerName: String,
  reason: String,
  createdAt: { type: Date, default: Date.now }
});


const Prediction = mongoose.model('Prediction', predictionSchema); //creates prediction model

async function callSnookerApi(params) { //calls the API and returns data
  const response = await axios.get(process.env.SNOOKER_API_BASE, {
    params: params,
    headers: {
      'X-Requested-By': process.env.SNOOKER_API_HEADER
    }
  });

  return response.data;
}

const cache = new Map(); //simple in-memory cache

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

app.get('/api/players', async (req, res) => {
  try {
    const data = await cachedCall('players', 24 * 60 * 60 * 1000, {
      t: 10,
      st: 'p',
      s: 2025
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Could not load players' });
  }
});

app.post('/api/predictions', async (req, res) => {
  try {
    const prediction = await Prediction.create(req.body);
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({
      message: 'Could not save prediction'
    });
  }
});

app.get('/api/predictions', async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({
      message: 'Could not load predictions'
    });
  }
});

app.delete('/api/predictions/:id', async (req, res) => {
  try {
    await Prediction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prediction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete prediction' });
  }
});

app.get('/api/upcoming-matches', async (req, res) => {
  try {
    const data = await cachedCall('upcoming-matches', 30 * 60 * 1000, {
      t: 14,
      tr: 'main'
    });

    res.json(data.slice(0, 20));
  } catch (error) {
    res.status(500).json({ message: 'Could not load upcoming matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
