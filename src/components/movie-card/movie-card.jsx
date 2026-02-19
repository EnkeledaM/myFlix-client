import PropTypes from "prop-types";                            // prop types

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}                      // click -> zgjedh filmin
      style={{ cursor: "pointer", marginBottom: "10px" }}      // stil i thjeshtë
    >
      {movie.Title} {/* titulli nga API */}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,                          // Title duhet string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,                       // duhet funksion
};
