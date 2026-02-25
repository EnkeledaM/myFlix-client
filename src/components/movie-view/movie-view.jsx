import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token, onUserUpdate }) => {
  const { movieId } = useParams();

  // Gjej filmin nga URL
  const movie = movies.find((m) => m._id === movieId);

  const addToFavorites = async () => {
    const username = user?.Username;

    if (!username || !token) {
      alert("You are not logged in.");
      return;
    }

    if (!movie?._id) {
      alert("Movie not found.");
      return;
    }

    try {
      const res = await fetch(
        `https://test-heroku-exercise-7495d54af436.herokuapp.com/users/${encodeURIComponent(
          username
        )}/movies/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Add favorite failed:", res.status, text);
        throw new Error("Add favorite failed");
      }

      const updatedUser = await res.json();

      // update MainView state + localStorage
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Could not add to favorites.");
    }
  };

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <h2>{movie.Title}</h2>

      <Button variant="success" onClick={addToFavorites} className="mb-3">
        Add to favorites
      </Button>

      {movie.Description && <p>{movie.Description}</p>}

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  onUserUpdate: PropTypes.func.isRequired,
};