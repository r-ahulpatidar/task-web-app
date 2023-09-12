import React, { useReducer, useEffect, createContext } from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";
import AddTaskForm from "./component2/AddTaskForm";
import TaskList from "./component2/TaskList";
import Task from "./component2/Task";

const initialState = {
  tasks: [],
  darkTheme: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "CLEAR_TASKS":
      return { ...state, tasks: [] };
    case "TOGGLE_THEME":
      return { ...state, darkTheme: !state.darkTheme };
    default:
      return state;
  }
};

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedTheme = JSON.parse(localStorage.getItem("darkTheme")) || false;
    dispatch({ type: "ADD_TASKS", payload: storedTasks });
    dispatch({ type: "TOGGLE_THEME", payload: storedTheme });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(state.darkTheme));
  }, [state.darkTheme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div
        className={`hero ${
          state.darkTheme ? "bg-gray-900" : "bg-gray-100"
        } h-screen md:min-h-[700px]  w-full m-auto flex flex-col items-center mt-14 transition-all duration-500`}
      >
        <div
          className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 ${
            state.darkTheme ? "text-white" : "text-black"
          }`}
        >
          <div className=" w-full flex items-center justify-between">
            <h1 className=" uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
              {/* Task Manager */}
              My Tasks
            </h1>

            {state.darkTheme ? (
              <MdSunny
                onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  state.darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            ) : (
              <MdDarkMode
                onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  state.darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            )}
          </div>
          <div className=" shadow-md">
            <AddTaskForm />
          </div>
          <div
            className={`scroll ${
              state.darkTheme ? "bg-gray-800" : "bg-white"
            } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
          >
            <div
              className={`w-full overflow-hidden mb- sticky top-0 ${
                state.darkTheme ? "bg-gray-800" : "bg-white"
              } flex items-center justify-between text-gray-500 border-b`}
            >
              <p className=" text-gray-500 px-2 py-3">
                {state.tasks.filter((task) => !task.completed).length} tasks
                left{" "}
              </p>
              <button onClick={() => dispatch({ type: "CLEAR_TASKS" })}>
                Clear all tasks
              </button>
            </div>

            {state.tasks.length ? (
              <TaskList />
            ) : (
              <div className=" w-full h-[80%] flex items-center justify-center overflow-hidden">
                <p className=" text-gray-500 text-center z-10">Empty task</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
