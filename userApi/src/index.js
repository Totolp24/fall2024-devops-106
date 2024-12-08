const express = require('express');
const path = require('path');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de la connexion Redis
const client = redis.createClient({
  url: 'redis://localhost:6379' // Remplace par l'URL de ton serveur Redis si nécessaire
});

client.connect().catch(err => {
  console.error('Redis connection error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route pour vérifier le statut de Redis
app.get('/status', async (req, res) => {
  try {
    const reply = await client.ping();
    res.status(200).send(`Redis server is running: ${reply}`);
  } catch (err) {
    res.status(500).send('Redis server is not available');
  }
});

app.get('/alldata', async (req, res) => {
  console.log('Fetching all data from Redis');
  let responseText = "";
  try {
    const reply = await client.KEYS("*");
    const promises = reply.map(async (key) => {
      const replay = await client.get(key);
      responseText += `${key}: ${replay}<br>`;
    });
    await Promise.all(promises);
    res.status(200).send(`Redis server is running:<br>${responseText}`);
  } catch (err) {
    res.status(500).send('Redis server is not available');
  }
 
});

// CRUD operations
app.post('/users', async (req, res) => {
  const { id, name } = req.body;
  try {
    const reply = await client.set(id, name);
    res.status(201).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to display all data


app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await client.get(id);
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const reply = await client.set(id, name);
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await client.del(id);
    if (reply === 1) {
      res.status(200).send(`User with ID ${id} deleted successfully`);
    } else {
      res.status(404).send(`User with ID ${id} not found`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});