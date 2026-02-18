export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{ cursor: "pointer", marginBottom: "10px" }}
    >
      {movie.title}
    </div>
  );
};
