import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  async function createNewTask(ev) {
    const data = new FormData();
    data.set("title", title);
    data.append("file", files[0]);

    ev.preventDefault();
    const response = await fetch("http://localhost:4000/task", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewTask}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <button style={{ marginTop: "5px" }}>Add task</button>
    </form>
  );
}
