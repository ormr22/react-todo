import React from 'react';
import classes from './ToDoList.module.css';
import { useState } from 'react';

const ToDoList = () => {
  const [inputVal, setInputVal] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleValue = (e) => {
    setInputVal(e.target.value);
  };

  const addToDoHandler = (e) => {
    e.preventDefault();
    const addedToDo = {
      taskName: inputVal,
      isCompleted: false,
      id: Math.floor(Math.random() * 1000),
    };

    setTaskList([...taskList, addedToDo]);
    console.log(taskList);
    setInputVal('');
  };

  const handleComplete = (e, id) => {
    e.preventDefault();
    // const newTaskList = [...taskList]
    const findTask = taskList.find((task) => task.id === id);
    // console.log(findTask);
    // findTask.isCompleted = !findTask.isCompleted;
    // setTaskList([...taskList]);

    //find index at selected id
    const findTaskIndex = taskList.findIndex((task) => task.id === id);
    console.log(findTaskIndex);
    // copy task list to be modified
    const newTaskList = [...taskList];
    newTaskList[findTaskIndex] = {
      ...newTaskList[findTaskIndex],
      isCompleted: !newTaskList[findTaskIndex].isCompleted,
    };
    setTaskList([...newTaskList]);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log('get your cliks');
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const editTaskHandler = (e, id) => {
    e.preventDefault();
    const findTask = taskList.find((t) => t.id === id);
    console.log(findTask);
    findTask.taskName = inputVal;
    setTaskList([...taskList]);
  };

  return (
    <div className={classes.toDoContainer}>
      <h2>Gooker's To Do List:</h2>
      <input
        type="text"
        className={classes.toDoListInput}
        placeholder="Add your To Do"
        onChange={handleValue}
        value={inputVal}
      />
      <button className={classes.addToDoBtn} onClick={addToDoHandler}>
        ADD TO DO
      </button>

      <div className="toDoList">
        <ul>
          {taskList.map((task) => (
            <li
              className={task.isCompleted ? classes.completedTask : null}
              key={Math.floor(Math.random() * 1000)}
            >
              {task.taskName}
              <button
                className={classes.editBtn}
                onClick={(e) => editTaskHandler(e, task.id)}
              >
                Edit
              </button>

              <button
                className={classes.completed}
                onClick={(e) => handleComplete(e, task.id)}
              >
                Completed
              </button>
              <button
                className={classes.deleted}
                onClick={(e) => handleDelete(e, task.id)}
              >
                Delete Pls Bro
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ToDoList;
