// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h2>Todo List</h2>
      <Create setTodos={setTodos} />
      
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index}>{todo}</div> 
        ))
      )}
    </div>
  );
}

export default Home;
