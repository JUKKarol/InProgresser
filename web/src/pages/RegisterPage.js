import { userState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = userState("");
  const [password, setPassword] = userState("");

  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Contetnt-Type": "application/json" },
    });
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      ></input>
      <button>Register</button>
    </form>
  );
}
