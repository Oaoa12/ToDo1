import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  
  const toggleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Создать новую заметку..."
        />
        <button onClick={addTask}>СОЗДАТЬ</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              contentEditable={!task.completed}
              onBlur={(e) => editTask(task.id, e.target.innerText)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
