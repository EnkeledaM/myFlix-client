import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Gjej filmin që ka _id të njëjtë me movieId nga URL
  const movie = movies.find((m) => m._id === movieId);

  // Nëse movies ende s’janë ngarkuar ose ID s’gjendet
  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div>
      <h2>{movie.Title}</h2>

      {/* Shembull detajesh - mund t’i shtojmë më shumë */}
      {movie.Description && <p>{movie.Description}</p>}

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
};