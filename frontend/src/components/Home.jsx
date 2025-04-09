import { useState } from 'react'
import '../App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
  const newTasks = tasks.filter((_, i)=>i !== index);
  setTasks(newTasks);
  };
  return(
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
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={()=>removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App


