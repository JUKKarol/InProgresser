import "./App.css";
import Task from "./Task";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Header />
            <Task />
            <Task />
            <Task />
          </main>
        }
      />
      <Route
        path={"/login"}
        element={
          <main>
            <Header />
            <div>login page</div>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
