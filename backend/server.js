const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./TodoModel'); // Import the model

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


app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new TodoModel({ task });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully ✅', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add task ❌', error });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TodoModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks ❌', error });
  }
});


app.delete('/delete/:id', async (req, res) => {
  try {
    const deletedTask = await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted ✅', task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed ❌', error });
  }
});

app.listen(3001, () => {
  console.log('Server is Running on http://localhost:3001');
});
