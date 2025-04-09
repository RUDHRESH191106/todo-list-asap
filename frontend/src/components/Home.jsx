import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Fetch tasks from DB
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task to DB
  const addTask = async () => {
    if (task) {
      try {
        await axios.post('http://localhost:3001/add', { task });
        setTask('');
        fetchTasks(); // Refresh task list
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Delete task from DB
  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.task}
            <button onClick={() => removeTask(t._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
