import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const data = {
      Username: username.trim(),
      Password: password
    };

    fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          setError("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Login failed. Please check your credentials.");
      });
  };

  return (
    <Card className="p-4 my-4">
      <Card.Body>
        <Card.Title className="mb-3">Login</Card.Title>

        <Form onSubmit={handleSubmit}>

          {error && (
            <div className="text-danger mb-3">
              {error}
            </div>
          )}

          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};