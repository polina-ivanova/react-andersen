import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import store from "./redux/store";
import { Provider } from "react-redux";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
