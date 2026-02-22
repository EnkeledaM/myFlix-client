import { useState } from "react";
import PropTypes from "prop-types";

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
      Birthday: birthday ? birthday : null, // nëse s’ka datë, dërgo null
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

      // Lexo gjithmonë body (shpesh backend kthen mesazh gabimi si text/JSON)
      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        // ok nëse s’është JSON
      }

      if (!response.ok) {
        const msg =
          (json && (json.message || json.error)) ||
          text ||
          `HTTP ${response.status}`;
        setError(`Signup dështoi: ${msg}`);
        return;
      }

      setSuccess("✅ Signup successful! Tani bëj login.");

      // kthehu te Login (mbështet të dyja emrat e prop-it)
      const goBack = onSignupSuccess || onBackClick;
      if (goBack) {
        setTimeout(() => goBack(), 600);
      }
    } catch (err) {
      setError(`Signup dështoi: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {success ? <p style={{ color: "green" }}>{success}</p> : null}

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="2"
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
          minLength="6"
          required
        />
      </label>

      <br />

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          // e bëjmë OPSIONALE (mos e blloko pa nevojë)
        />
      </label>

      <br />
      <br />

      <button type="submit">Sign Up</button>{" "}
      {(onBackClick || onSignupSuccess) && (
        <button
          type="button"
          onClick={() => (onBackClick ? onBackClick() : onSignupSuccess())}
        >
          Back
        </button>
      )}
    </form>
  );
};

SignupView.propTypes = {
  onSignupSuccess: PropTypes.func,
  onBackClick: PropTypes.func,
};