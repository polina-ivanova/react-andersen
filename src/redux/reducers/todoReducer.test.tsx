import { todoReducer } from "./todoReducer";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "../actions";

describe("todos", () => {
  it("adds todo", () => {
    const initialState = undefined;
    const nextState = todoReducer(initialState, addTodo("test"));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].title).toEqual("test");
    expect(nextState.todos[0].id).toBeGreaterThan(0);
    expect(nextState.todos[0].isCompleted).toBeFalsy();
  });
  it("toggles todo", () => {
    const initialState = {
      todos: [{ id: 1, title: "test", isCompleted: false }],
    };
    const nextState = todoReducer(initialState, toggleTodo(1));
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].isCompleted).toBeTruthy();
  });
  it("deletes todo", () => {
    const initialState = {
      todos: [{ id: 1, title: "test", isCompleted: false }],
    };
    const nextState = todoReducer(initialState, deleteTodo(1));
    expect(nextState.todos).toHaveLength(0);
  });
  it("edits todo", () => {
    const initialState = {
      todos: [{ id: 1, title: "test", isCompleted: false }],
    };
    const nextState = todoReducer(
      initialState,
      editTodo(initialState.todos[0])
    );
    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].id).toEqual(1);
    expect(nextState.todos[0].isCompleted).toEqual(false);
  });
});
