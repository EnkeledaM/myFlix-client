import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">{movie.Title}</Card.Title>

        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary" size="sm" className="mt-auto align-self-start">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};