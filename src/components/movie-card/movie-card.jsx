

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
  onMovieClick: PropTypes.func.isRequired
};