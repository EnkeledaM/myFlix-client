
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import placeholder from "../../assets/interstellar.jpeg";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <Card>
      <Card.Header as="h5">{movie.Title}</Card.Header>

      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ maxHeight: "420px", objectFit: "cover" }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = placeholder;
        }}
      />

      <Card.Body>
        <Card.Text>
          <b>Description:</b> {movie.Description}
        </Card.Text>

        <Card.Text>
          <b>Genre:</b> {movie.Genre?.Name}
        </Card.Text>

        <Card.Text>
          <b>Director:</b> {movie.Director?.Name}
        </Card.Text>

        <Button variant="secondary" onClick={onBackClick}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({ Name: PropTypes.string }),
    Director: PropTypes.shape({ Name: PropTypes.string }),
  }),
  onBackClick: PropTypes.func.isRequired,
};
