export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      {/* shfaq vetëm titullin */}
      {movie.title}
    </div>
  );
};
