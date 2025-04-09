/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task) return;

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('http://localhost:3001/add', { task });
      setTask('');
      onTaskAdded(); // Notify parent to update the list
    } catch (err) {
      console.error('Failed to add task ❌', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: '5px' }}
      />
      <button type="submit" style={{ marginLeft: '10px' }}>Add Task</button>
    </form>
  );
};

export default AddTask;
