import React, { useState } from "react";
import Form from "./Form";
import axios from 'axios'

// tells how the Task component should look like
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // const handleTaskSubmit = (
  //   title: string,
  //   description: string,
  //   dueDate: string,
  //   category: string
  // ) => {
  //   if (editTask) {
  //    // update task 
  //     const updatedTasks = tasks.map((task) =>
  //       task.id === editTask.id
  //         ? { ...task, title, description, dueDate, category}
  //         : task
  //     );
  //     setTasks(updatedTasks);
  //     setEditTask(null);
  //   } else {
  //     // create new task
  //     const newTask: Task = {
  //       id: Date.now(),
  //       title,
  //       description,
  //       dueDate,
  //       category,
  //     };
  //     setTasks([...tasks, newTask]);
  //   }
  // };
  
  const handleTaskSubmit = async (
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) => {
    if (editTask) {
      // update task 
      const updatedTasks = tasks.map((task) =>
        task.id === editTask.id
          ? { ...task, title, description, dueDate, category}
          : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      // create new task
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        category,
      };
      setTasks([...tasks, newTask]);

      // Make a POST request to the API
      try {
        const response = await axios.post('http://127.0.0.1:3000', newTask);
        response
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleEditTask = (task: Task) => {
    setEditTask(task);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-slate-500 text-slate-600 bg-opacity-5 h-screen">
      <div className="m-2">
        <h1 className="text-3xl font-bold text-center">Gerenciador de Tarefas</h1>
      </div>
      <div className="max-w-screen-2xl mx-2 px-3.5 py-8 grid grid-cols-2 gap-8"><div>
      {/* <div className="max-w-screen-2xl mx-8 px-3.5 py-8 grid grid-cols-2 gap-8"><div> */}
        {/* Displays Atualizar tarefa if the "editar" button was pressed, else it will just show criar */}
        {editTask ? (
        <div className=" text-center">
          <h2 className="text-xl font-semibold mb-2">Atualizar Tarefa</h2>
          <Form
            onSubmit={handleTaskSubmit}
            initialTitle={editTask.title}
            initialDescription={editTask.description}
            initialDueDate={editTask.dueDate}
          />
        </div>

        ) : (
          <div className="mb-4 text-center bg-gray-900 bg-opacity-10 rounded-3xl h-fit" >
            <h2 className="text-xl font-semibold mb-2 py-2">Criar Tarefa</h2>
              <Form onSubmit={handleTaskSubmit} />
          </div>
        )}
      </div>
  <div className="w-full max-h-[70vh] overflow-y-auto  bg-gray-900 bg-opacity-10 rounded-3xl">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold m-2 text-center ">Tarefas</h2>
        {tasks.map((task) => (
          <div key={task.id} className="bg-zinc-800 hover:bg-slate-200 max-w-prose m-5 rounded-lg shadow-md p-4 bg-opacity-10">
          {/* <div key={task.id} className="bg-zinc-800 hover:bg-slate-200 max-w-screen-md rounded-lg shadow-md p-4 bg-opacity-10"> */}
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">Categoria: {task.category}</p>
            <p className="mb-2">Data: {task.dueDate}</p>
            <button
              onClick={() => handleEditTask(task)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
            Editar 
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

  </div>
    </div>
      </div>

  );
};

export default App;