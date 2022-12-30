import { login } from "../actions";
import { loginReducer } from "./loginReducer";

describe("username", () => {
  it("adds name", () => {
    const initialState = { name: "" };
    const nextState = loginReducer(initialState, login("testUser"));
    expect(nextState.name).toEqual("testUser");
    expect(nextState).toHaveLength(1);
  });
});
