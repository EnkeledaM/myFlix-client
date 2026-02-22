
import placeholder from "../../assets/interstellar.jpeg";
import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.Title}</h1>

      <img
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ width: "150px" }}
        onError={(e) => {
          e.currentTarget.onerror = null; // mos hyjë në loop
          e.currentTarget.src = placeholder;
        }}
      />

      <p><b>Description:</b> {movie.Description}</p>
      <p><b>Genre:</b> {movie.Genre?.Name}</p>
      <p><b>Director:</b> {movie.Director?.Name}</p>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};