import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nameSelector, todoSelector } from "../../redux/selectors/selectors";
import { addTodo } from "../../redux/actions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoItem from "../TodoItem/TodoItem";
import { ADD_TASK } from "../../constants";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const name = useSelector(nameSelector);

  const dispatch = useDispatch();

  const todos = useSelector(todoSelector);

  const [task, setTask] = useState<string>("");

  const [active, setActive] = useState<number>(0);

  const { todo, header, info, username, counter, form } = styles;

  const activeTasksCount = useMemo(
    () => todos.filter((todo) => todo.isCompleted === false).length,
    [todos]
  );

  const addNewTodo = () => {
    if (task.trim().length !== 0) {
      const action = addTodo(task);
      dispatch(action);
      setTask("");
    }
  };

  return (
    <div className={todo}>
      <div className={header}>
        <div className={info}>
          <div className={username}>Hi, {name}</div>
          <div className={counter}>
            You have {activeTasksCount} active tasks
          </div>
        </div>
        <div>
          <Button name={"All"} onClick={() => setActive(0)} />
          <Button
            name={"Active"}
            onClick={() => setActive(1)}
            type={"button"}
          />
          <Button
            name={"Completed"}
            onClick={() => setActive(2)}
            type={"button"}
          />
        </div>
      </div>
      <div className={form}>
        <Input placeholder={ADD_TASK} value={task} onChange={setTask} />
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
