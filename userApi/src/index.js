const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

app.use(express.json());

// CRUD operations
app.post('/users', (req, res) => {
  const { id, name } = req.body;
  client.set(id, name, (err, reply) => {
    if (err) res.status(500).send(err);
    res.status(201).send(reply);
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  client.get(id, (err, reply) => {
    if (err) res.status(500).send(err);
    res.status(200).send(reply);
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  client.set(id, name, (err, reply) => {
    if (err) res.status(500).send(err);
    res.status(200).send(reply);
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  client.del(id, (err, reply) => {
    if (err) res.status(500).send(err);
    res.status(204).send(reply);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});