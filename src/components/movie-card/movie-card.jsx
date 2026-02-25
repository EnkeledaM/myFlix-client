import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const API_URL = "https://test-heroku-exercise-7495d54af436.herokuapp.com";

export const MovieCard = ({ movie, user, token, onUserUpdate }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const addToFavorites = async () => {
    const username = user?.Username;
    if (!username || !token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movie._id)}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Add favorite failed:", res.status, text);
        throw new Error(text || "Add favorite failed");
      }

      const updatedUser = await res.json();
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not add to favorites.");
    }
  };

  const removeFromFavorites = async () => {
    const username = user?.Username;
    if (!username || !token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movie._id)}`,
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
    } catch (err) {
      console.error(err);
      alert(err.message || "Could not remove from favorites.");
    }
  };

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">{movie.Title}</Card.Title>

        <div className="mt-auto d-flex gap-2">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary" size="sm">
              Open
            </Button>
          </Link>

          {user && token && (
            isFavorite ? (
              <Button variant="outline-danger" size="sm" onClick={removeFromFavorites}>
                Remove
              </Button>
            ) : (
              <Button variant="outline-success" size="sm" onClick={addToFavorites}>
                Favorite
              </Button>
            )
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  onUserUpdate: PropTypes.func,
};