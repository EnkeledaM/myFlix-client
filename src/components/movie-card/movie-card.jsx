import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">{movie.Title}</Card.Title>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onMovieClick(movie)}
          className="mt-auto align-self-start"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};