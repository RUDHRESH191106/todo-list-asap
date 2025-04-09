import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import '../App.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onTaskAdded={fetchTasks} />
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
