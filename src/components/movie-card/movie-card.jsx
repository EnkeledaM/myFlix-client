

import PropTypes from "prop-types";                            // prop types

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      style={{ cursor: "pointer" }}
      onClick={() => onMovieClick(movie)}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>

        <Button
          variant="primary"
          className="mt-auto"
          onClick={(e) => {
            e.stopPropagation(); // mos e thirr 2 herë click-in
            onMovieClick(movie);
          }}
        >
          Open
        </Button>
      </Card.Body>
    </Card>
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