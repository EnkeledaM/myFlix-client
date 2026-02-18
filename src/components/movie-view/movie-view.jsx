export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.title}</h1>

      {/* Poster image */}
      <img
        src={movie.image}
        alt={movie.title}
        style={{ width: "150px" }}
      />

      <p>
        <b>Description:</b> {movie.description}
      </p>
      <p>
        <b>Genre:</b> {movie.genre}
      </p>
      <p>
        <b>Director:</b> {movie.director}
      </p>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
