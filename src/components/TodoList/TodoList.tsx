import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nameSelector, todoSelector } from "../../redux/selectors/selectors";
import { addTodo } from "../../redux/actions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TodoItem from "../TodoItem/TodoItem";
import { ADD_TASK } from "../../constants";
import styles from "./TodoList.module.css";
import { Todos } from "../../types";

export default function TodoList() {
  const name = useSelector(nameSelector);
  const dispatch = useDispatch();
  const todos = useSelector(todoSelector);
  const [task, setTask] = useState<string>("");
  const [active, setActive] = useState<number>(0);
  const { todo, header, info, username, counter, form } = styles;

  const activeTasksCount: number = useMemo(
    () => todos.filter((todo) => todo.isCompleted === false).length,
    [todos]
  );

  const addNewTodo = (): void => {
    if (task.trim().length !== 0) {
      const action = addTodo(task);
      dispatch(action);
      setTask("");
    }
  };

  const filterTodos = (todos: Todos): Todos => {
    return todos.filter((todo) => {
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
    });
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
          <Button name={"All"} onClick={() => setActive(0)}>
            All
          </Button>
          <Button name={"Active"} onClick={() => setActive(1)}>
            Active
          </Button>
          <Button name={"Completed"} onClick={() => setActive(2)}>
            Completed
          </Button>
        </div>
      </div>
      <div className={form}>
        <Input placeholder={ADD_TASK} value={task} onChange={setTask} />
        <Button name={"Add"} onClick={addNewTodo}>
          Add
        </Button>
      </div>
      <div>
        {filterTodos(todos).map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}
