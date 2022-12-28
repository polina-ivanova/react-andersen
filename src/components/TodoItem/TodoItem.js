import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../../redux/actions";
import styles from "./TodoItem.module.css";
import Input from "../Input/Input";
import { BsCheckSquare, BsPen, BsTrash, BsXSquare } from "react-icons/bs";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const { id, title, isCompleted } = todo;
  const { task, editTask, actions, buttonIcon } = styles;

  const [edit, setEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(title);

  const toggleTodoTask = () => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  const deleteTodoTask = () => {
    const action = deleteTodo(id);
    dispatch(action);
  };

  const editTodoTask = () => {
    const editedTodo = { ...todo, title: titleValue };
    const action = editTodo(editedTodo);
    dispatch(action);
    setEdit(false);
  };

  return (
    <div className={task}>
      <div>
        {edit ? (
          <div className={editTask}>
            {" "}
            <Input value={titleValue} onChange={setTitleValue} />
            <div className={actions}>
              <BsCheckSquare onClick={editTodoTask} className={buttonIcon} />
              <BsXSquare
                onClick={() => setEdit(false)}
                className={buttonIcon}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => toggleTodoTask(id)}
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </div>
        )}
      </div>
      <div>
        {edit ? null : (
          <div className={actions}>
            <BsPen className={buttonIcon} onClick={() => setEdit(true)} />
            <BsTrash
              className={buttonIcon}
              onClick={() => deleteTodoTask(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
