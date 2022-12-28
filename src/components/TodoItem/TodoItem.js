import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../../redux/actions";
import styles from "./TodoItem.module.css";
import Input from "../Input/Input";
import { BsCheckSquare, BsPen, BsTrash, BsXSquare } from "react-icons/bs";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const toggleTodoTask = () => {
    const action = toggleTodo(todo.id);
    dispatch(action);
  };

  const deleteTodoTask = () => {
    const action = deleteTodo(todo.id);
    dispatch(action);
  };

  const editTodoTask = () => {
    const editedTodo = { ...todo, title };
    const action = editTodo(editedTodo);
    dispatch(action);
    setEdit(false);
  };

  return (
    <div className={styles.task}>
      <div>
        {edit ? (
          <div className={styles.edit}>
            {" "}
            <Input value={title} onChange={setTitle} />
            <div className={styles.buttons}>
              <BsCheckSquare
                onClick={editTodoTask}
                className={styles.buttonIcon}
              />
              <BsXSquare
                onClick={() => setEdit(false)}
                className={styles.buttonIcon}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => toggleTodoTask(todo.id)}
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </div>
        )}
      </div>
      <div>
        {edit ? null : (
          <div className={styles.buttons}>
            <BsPen
              className={styles.buttonIcon}
              onClick={() => setEdit(true)}
            />
            <BsTrash
              className={styles.buttonIcon}
              onClick={() => deleteTodoTask(todo.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
