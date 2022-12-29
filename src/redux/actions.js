export const login = (name) => {
  return { type: "LOGIN", payload: name };
};

export const addTodo = (title) => {
  return {
    type: "ADD",
    payload: {
      id: new Date().getTime(),
      title,
      isCompleted: false,
    },
  };
};

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO_STATE",
  payload: { id },
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  payload: { id },
});

export const editTodo = (todo) => ({
  type: "EDIT_TODO",
  payload: todo,
});
