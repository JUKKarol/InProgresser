import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");

  async function createNewTask(ev) {
    const data = new FormData();
    data.set("title", title);
    data.append("file", files[0]);

    ev.preventDefault();
    await fetch("http://localhost:4000/task", {
      method: "POST",
      body: data,
    });
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
