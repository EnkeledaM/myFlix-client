export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      {/* Titulli */}
      <h2>{movie.title}</h2>

      {/* Poster */}
      <img src={movie.image} alt={movie.title} />

      {/* Info bazë */}
      <p><b>Description:</b> {movie.description}</p>
      <p><b>Genre:</b> {movie.genre}</p>
      <p><b>Director:</b> {movie.director}</p>

      {/* Kthen mbrapsht te lista */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
