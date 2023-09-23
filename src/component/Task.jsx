import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import "./Task.css"; // Replace 'your-css-file.css' with the path to your CSS file.

function Task() {
  const [check, setCheck] = useState("all");
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState(""); // State for adding a new task
  const [editTask, setEditTask] = useState(null); // State for editing a task

  // Fetch tasks
  const apiUrl = "https://jsonplaceholder.typicode.com/users/1/todos";
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const capitalizedTodos = response.data.map((task) => ({
          ...task,
          title: task.title.charAt(0).toUpperCase() + task.title.slice(1),
        }));
        setTodos(capitalizedTodos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // Handle input change for adding a new task
  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Handle input change for editing a task
  const handleEditTaskChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === editTask ? { ...task, title: e.target.value } : task
      )
    );
  };

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTodos((prevTodos) => [
        {
          id: Date.now(),
          title: newTask,
          completed: false,
        },
        ...prevTodos, // Prepend the new task to the existing tasks
      ]);
      setNewTask(""); // Clear the new task input
    }
  };

  // Edit a task
  const handleEdit = (id) => {
    setEditTask(id);
  };

  // Save edited task
  const handleSave = () => {
    setEditTask(null); // Clear the edit mode
  };

  // Delete a task
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
  };

  // Toggle completion status
  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on completion status
  const filteredTodos = todos.filter((task) => {
    if (check === "all") return true;
    if (check === "true") return task.completed;
    if (check === "false") return !task.completed;
    return true;
  });

  return (
    <>
      <div className="flow-root bg-gray-200">
        <div className="">
          <h2 className="text-4xl font-extrabold flex justify-center mb-8">
            Create Your Todo List
          </h2>
        </div>
        <form className="flex justify-center " action="#" method="POST">
          <div className="mt-2">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  <input
                    type="text"
                    onChange={handleNewTaskChange}
                    value={newTask}
                    name="title"
                    className="block w-full rounded-md border-0 py-2 w-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                <button
                  onClick={handleAddTask}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Add Task
                </button>
              </div>
            </div>

            <div className="flex flex-wrap pt-3 ">
              <input
                onChange={() => setCheck("false")}
                type="radio"
                id="pending"
                name="task"
                value="false"
                className="w-4 h-4 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="pending"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Pending Task
              </label>

              <input
                onChange={() => setCheck("all")}
                type="radio"
                id="all"
                name="task"
                value="all"
                className="w-4 h-4 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="all"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                All Task
              </label>

              <input
                onChange={() => setCheck("true")}
                type="radio"
                id="completed"
                name="task"
                value="true"
                className="w-4 h-4 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="completed"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Completed Task
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center pt-10">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700 bg-slate-200"
        >
          <h6 className="pt-2 text-4xl flex justify-center mb-8">
            List of Task
          </h6>
          {filteredTodos.map((data) => (
            <li className="py-3 sm:py-4" key={data.id}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <AiFillCheckCircle
                    className={`w-8 h-8 rounded-full ${
                      data.completed ? "green-icon" : "red-icon"
                    }`}
                    onClick={() => handleToggleComplete(data.id)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {editTask === data.id ? (
                    <input
                      type="text"
                      onChange={handleEditTaskChange}
                      value={data.title}
                      className="block w-full rounded-md border-0 py-2 w-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                      {data.title}
                    </p>
                  )}
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                  {data.completed ? (
                    <p className="text-lg px-4 text-gray-900 dark:text-black">
                      completed
                    </p>
                  ) : (
                    <p className="text-lg px-4 text-gray-900 dark:text-black">
                      Not Completed
                    </p>
                  )}

                  {editTask === data.id ? (
                    <button
                      onClick={handleSave}
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(data.id)}
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(data.id)}
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Task;
