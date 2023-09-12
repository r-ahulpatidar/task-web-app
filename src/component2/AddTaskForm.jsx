import React, { useState, useContext } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AppContext } from "../App2";

const AddTaskForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: { id: Date.now(), title, completed: false },
      });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={` ${
          state.darkTheme ? "bg-gray-800" : "bg-white"
        } w-full  flex space-x-2 items-center  rounded-lg px-4`}
      >
        <CiCirclePlus size={28} className="px-0 text-gray-500" />
        <input
          className=" bg-transparent w-full h-fit p-1 py-4 text-lg"
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className=" px-4 uppercase text-gray-500" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
