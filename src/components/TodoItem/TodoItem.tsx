import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../../redux/actions";
import styles from "./TodoItem.module.css";
import Input from "../Input/Input";
import { BsCheckSquare, BsPen, BsTrash, BsXSquare } from "react-icons/bs";
import { CHANGE_TASK } from "../../constants";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const { id, title, isCompleted } = todo;
  const { task, editTask, actions, buttonIcon } = styles;
  const [edit, setEdit] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(title);

  const toggleTodoTask = (): void => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  const deleteTodoTask = (): void => {
    const action = deleteTodo(id);
    dispatch(action);
  };

  const editTodoTask = (): void => {
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
            <Input
              value={titleValue}
              onChange={setTitleValue}
              placeholder={CHANGE_TASK}
            />
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
            onClick={toggleTodoTask}
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
            <BsTrash className={buttonIcon} onClick={deleteTodoTask} />
          </div>
        )}
      </div>
    </div>
  );
}
