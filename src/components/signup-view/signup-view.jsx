import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const SignupView = ({ onSignupSuccess, onBackClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      Username: username.trim(),
      Password: password,
      Email: email.trim(),
      Birthday: birthday || null,
    };

    try {
      const response = await fetch(
        "https://test-heroku-exercise-7495d54af436.herokuapp.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {}

      if (!response.ok) {
        const msg =
          (json && (json.message || json.error)) ||
          text ||
          `HTTP ${response.status}`;
        setError(`Signup failed: ${msg}`);
        return;
      }

      setSuccess("Signup successful! Now login.");

      const goBack = onSignupSuccess || onBackClick;
      if (goBack) {
        setTimeout(() => goBack(), 800);
      }
    } catch (err) {
      setError(`Signup failed: ${err.message}`);
    }
  };

  return (
    <Card className="p-4 my-4">
      <Card.Body>
        <Card.Title className="mb-3">Sign Up</Card.Title>

        <Form onSubmit={handleSubmit}>

          {error && (
            <div className="text-danger mb-3">{error}</div>
          )}

          {success && (
            <div className="text-success mb-3">{success}</div>
          )}

          <Form.Group className="mb-3" controlId="signupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              minLength="2"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              minLength="6"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>

            {(onBackClick || onSignupSuccess) && (
              <Button
                variant="secondary"
                type="button"
                onClick={() =>
                  onBackClick ? onBackClick() : onSignupSuccess()
                }
              >
                Back
              </Button>
            )}
          </div>

        </Form>
      </Card.Body>
    </Card>
  );
};

SignupView.propTypes = {
  onSignupSuccess: PropTypes.func,
  onBackClick: PropTypes.func,
};