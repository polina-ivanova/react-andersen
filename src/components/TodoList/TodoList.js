import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nameSelector, todoSelector } from "../../redux/selectors/selectors";
import { addTodo } from "../../redux/actions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const name = useSelector(nameSelector);

  const dispatch = useDispatch();

  const todos = useSelector(todoSelector);

  const [task, setTask] = useState("");

  const [active, setActive] = useState(0);

  const addNewTodo = () => {
    if (task.trim().length !== 0) {
      const action = addTodo(task);
      dispatch(action);
      setTask("");
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.name}>Hi, {name}</div>
          <div className={styles.counter}>
            You have {todos.filter((todo) => todo.isCompleted === false).length}{" "}
            active tasks
          </div>
        </div>
        <div>
          <Button name={"All"} onClick={() => setActive(0)} />
          <Button name={"Active"} onClick={() => setActive(1)} />
          <Button name={"Completed"} onClick={() => setActive(2)} />
        </div>
      </div>
      <div className={styles.form}>
        <Input placeholder={"Add new task"} value={task} onChange={setTask} />
        <Button name={"Add"} onClick={addNewTodo} />
      </div>
      <div>
        {todos
          .filter((todo) => {
            switch (active) {
              case 0:
                return true;
              case 1:
                return !todo.isCompleted;
              case 2:
                return todo.isCompleted;
              default:
                return true;
            }
          })
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </div>
    </div>
  );
}
