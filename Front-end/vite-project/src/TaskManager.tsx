import React, { useState, useEffect } from "react";
import Form from "./Form";
import { Link } from "react-router-dom";

// tells how the Task component should look like
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // fetch tasks from the backend when the component mounts
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", (error as Error).message);
      }
    };

    fetchTasks();
  }, []); // Run this effect only once when the component mounts

  const handleTaskSubmit = async (
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      // validate input fields
      if (!title || !description || !dueDate || !category) {
        setErrorMessage("All fields are required");
        return;
      } else {
        setErrorMessage(null); // Clear error message if all fields are filled
      }

      const requestBody = {
        title,
        description,
        date: dueDate,
        category,
      };

      const response = await fetch("http://127.0.0.1:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        // Task created successfully, update the UI
        const updatedTasksResponse = await fetch(
          "http://127.0.0.1:3000/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedTasksResponse.ok) {
          const updatedTasksData = await updatedTasksResponse.json();
          setTasks(updatedTasksData);
        } else {
          console.error("Failed to fetch updated tasks");
        }
      } else if (response.status === 422) {
        // Validation error, handle and display error message to the user
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Validation Error");
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", (error as Error).message);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
  };

  const handleUpdateTask = async (id: number, updatedFields: Partial<Task>) => {
    try {
      const token = localStorage.getItem("token");

      const requestBody = {
        ...updatedFields,
      };
      console.log(updatedFields);
      const response = await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);

      if (response.ok) {
        // Task updated successfully, update the UI
        const updatedTask = await response.json();
        const updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        setTasks(updatedTasks);
        setEditTask(null); // Clear the edit task after successful update
      } else if (response.status === 422) {
        // Validation error, handle and display error message to the user
        const errorData = await response.json();
        console.error("Validation Error:", errorData);
      } else {
        // Handle other error cases
        console.error("Error updating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", (error as Error).message);
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        // Task deleted successfully, update the UI
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else if (response.status === 404) {
        // Task not found, handle and display error message to the user
        console.error("Task not found:", taskId);
      } else {
        // Handle other error cases
        console.error("Error deleting task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", (error as Error).message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="bg-slate-950 text- text-gray-200 bg-opacity-70 h-screen">
      <div className="max-w-screen-2xl mx-2 px-3.5 py-8 grid grid-cols-2 gap-8">
        <div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          {/* Displays Atualizar tarefa if the "editar" button was pressed, else it will just show criar */}
          {editTask ? (
            <div className=" text-center">
              {/* <div className="mb-4 text-center bg-gray-900 bg-opacity-10 rounded-3xl h-fit" > */}
              <h2 className="text-xl font-semibold mb-2">Atualizar Tarefa</h2>
              <Form
                onSubmit={(title, description, dueDate, category) =>
                  handleUpdateTask(editTask.id, {
                    title,
                    description,
                    dueDate,
                    category,
                  })
                }
                initialTitle={editTask.title}
                initialDescription={editTask.description}
                initialDueDate={editTask.dueDate}
              />
            </div>
          ) : (
            // <div className="mb-4 text-center bg-gray-900 bg-opacity-10 rounded-3xl h-fit" >
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2 py-2">Criar Tarefa</h2>
              <Form onSubmit={handleTaskSubmit} />
            </div>
          )}
        </div>
        <div className="w-full max-h-[70vh] overflow-y-auto  bg-gray-900 bg-opacity-10 rounded-3xl">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold m-2 text-center ">Tarefas</h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-zinc-800 hover:bg-gray-500 max-w-prose m-5 rounded-lg shadow-md p-4 bg-opacity-10"
              >
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="mb-2">{task.description}</p>
                <p className="mb-2 font-semibold ">
                  Categoria: {task.category}
                </p>
                <p className="mb-2 font-black">Data: {task.dueDate}</p>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Excluir
                </button>
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleLogout()}
        className="bg-red-600 hover:bg-red-800 text-white m-4 font-bold py-2 px-4 rounded absolute bottom-0 right-0">
        <Link to="/login">Log Out</Link>
        <div></div>
      </button>
    </div>
  );
};

export default App;
