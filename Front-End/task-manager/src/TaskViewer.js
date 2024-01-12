import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskViewer = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); 

  return (
    <div>
      <h2>Task Viewer</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Date: {task.date}</p>
            <p>Category: {task.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskViewer;
