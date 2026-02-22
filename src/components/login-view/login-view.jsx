import { useState } from "react";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <br />

      <button type="submit">Login</button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};