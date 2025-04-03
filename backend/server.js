const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB ✅'))
  .catch((err) => console.error('MongoDB connection failed ❌', err));

app.post('/add', (req, res) => {
  const task = req.body.task;
  res.json({ message: 'Task received', task });
});

app.listen(3001, () => {
  console.log('Server is Running on http://localhost:3001');
});
