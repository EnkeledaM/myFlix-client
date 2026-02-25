import { useEffect, useMemo, useState } from "react";
import { Card, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

const API_URL = "https://test-heroku-exercise-7495d54af436.herokuapp.com";

export const ProfileView = ({ user, token, movies = [], onUserUpdate }) => {
  // --------- form state ----------
  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday ? user.Birthday.slice(0, 10) : "");

  // --------- ui state ----------
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sinkronizo formen kur ndryshon user-i (p.sh pas update)
  useEffect(() => {
    setUsername(user?.Username || "");
    setEmail(user?.Email || "");
    setBirthday(user?.Birthday ? user.Birthday.slice(0, 10) : "");
  }, [user]);

  // Favorite movies (array filmash) — s’crash-on kur movies është bosh
  const favoriteMovies = useMemo(() => {
    const favIds = user?.FavoriteMovies || [];
    return (movies || []).filter((m) => favIds.includes(m._id));
  }, [movies, user]);

  // ---------- helpers ----------
  const requireAuth = () => {
    if (!user || !token) {
      setErrorMsg("You are not logged in.");
      return false;
    }
    return true;
  };

  // ✅ UPDATE ACCOUNT
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!requireAuth()) return;

    const dataToSend = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };
    if (password.trim().length > 0) dataToSend.Password = password;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/users/${encodeURIComponent(user.Username)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", res.status, text);
        throw new Error(text || "Update failed");
      }

      const updatedUser = await res.json();

      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPassword("");
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE ACCOUNT
  const handleDelete = async () => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!requireAuth()) return;

    const ok = window.confirm("Are you sure you want to delete your account?");
    if (!ok) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/users/${encodeURIComponent(user.Username)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        throw new Error(text || "Delete failed");
      }

      localStorage.clear();
      alert("Account deleted.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Could not delete account.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REMOVE MOVIE FROM FAVORITES
  const handleRemoveFavorite = async (movieId) => {
    setSuccessMsg("");
    setErrorMsg("");

    if (!requireAuth()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Remove favorite failed:", res.status, text);
        throw new Error(text || "Remove favorite failed");
      }

      const updatedUser = await res.json();
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccessMsg("Removed from favorites.");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Could not remove favorite.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Profile</h1>

      {/* INFO CARD */}
      <Card className="mb-4">
        <Card.Body>
          <div><strong>Username:</strong> {user.Username}</div>
          <div><strong>Email:</strong> {user.Email}</div>
          <div><strong>Birthday:</strong> {user.Birthday?.slice(0, 10)}</div>
        </Card.Body>
      </Card>

      {/* UPDATE CARD */}
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-3">Update Profile</h4>

          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={2}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password (optional)</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                placeholder="Leave empty to keep current password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* FAVORITES CARD */}
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-3">Favorite Movies</h4>

          {favoriteMovies.length === 0 ? (
            <div>No favorite movies yet.</div>
          ) : (
            <Row>
              {favoriteMovies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                  <MovieCard movie={movie} />
                  <Button
                    variant="outline-danger"
                    className="mt-2 w-100"
                    onClick={() => handleRemoveFavorite(movie._id)}
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* DELETE CARD */}
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-2">Danger Zone</h4>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Please wait..." : "Delete Account"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};