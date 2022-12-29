export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface InitialState {
  todos: Array<Todo>;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: InitialState = { todos: [] };

export const todoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD":
      return { todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO_STATE":
      const todos = state.todos;
      const idToggled = todos.findIndex(
        (todo) => action.payload.id === todo.id
      );
      if (idToggled >= 0) {
        const targetTodo = todos[idToggled];
        targetTodo.isCompleted = !targetTodo.isCompleted;
      }
      return { todos: [...todos] };
    case "DELETE_TODO":
      const idDeleted = state.todos.findIndex(
        (todo) => action.payload.id === todo.id
      );
      state.todos.splice(idDeleted, 1);
      return { todos: [...state.todos] };
    case "EDIT_TODO":
      const idEdited = state.todos.findIndex(
        (todo) => action.payload.id === todo.id
      );
      if (idEdited >= 0) {
        state.todos.splice(idEdited, 1, action.payload);
      }
      return { todos: [...state.todos] };
    default:
      return state;
  }
};
