interface InitialState {
  name: string;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: InitialState = { name: "" };

export const loginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { name: action.payload };
    default:
      return state;
  }
};
