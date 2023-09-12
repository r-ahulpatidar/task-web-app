import React, { useContext } from "react";
import Task from "./Task";
import { AppContext } from "../App2";

const TaskList = () => {
  const { state } = useContext(AppContext);
  const reversedTasks = state.tasks.slice().reverse();

  return (
    <ul className=" ">
      {reversedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
