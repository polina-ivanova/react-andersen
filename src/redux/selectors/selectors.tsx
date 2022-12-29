import { Todo } from "../../types";

export const nameSelector = (state): string => state.loginReducer.name;
export const todoSelector = (state): Array<Todo> => state.todoReducer.todos;
