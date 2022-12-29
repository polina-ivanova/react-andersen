export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type Todos = Array<Todo>;

export interface Action {
  type: string;
  payload: any;
}
