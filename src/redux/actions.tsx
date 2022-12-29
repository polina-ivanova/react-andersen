import { Action, Todo } from "../types";

export const login = (name: string): Action => {
  return { type: "LOGIN", payload: name };
};

export const addTodo = (title: string): Action => {
  return {
    type: "ADD",
    payload: {
      id: new Date().getTime(),
      title,
      isCompleted: false,
    },
  };
};

export const toggleTodo = (id: number): Action => ({
  type: "TOGGLE_TODO_STATE",
  payload: { id },
});

export const deleteTodo = (id: number): Action => ({
  type: "DELETE_TODO",
  payload: { id },
});

export const editTodo = (todo: Todo): Action => ({
  type: "EDIT_TODO",
  payload: todo,
});
