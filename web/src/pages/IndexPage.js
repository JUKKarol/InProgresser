import { useEffect, useState } from "react";
import Task from "../Task";

export default function IndexPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/task").then((response) => {
      response.json().then((tasks) => setTasks(tasks));
    });
  });
  return <>{tasks.length > 0 && tasks.map((task) => <Task {...task} />)}</>;
}
