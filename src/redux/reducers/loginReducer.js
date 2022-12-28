const initialState = { name: "" };

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { name: action.payload };
    default:
      return state;
  }
};
