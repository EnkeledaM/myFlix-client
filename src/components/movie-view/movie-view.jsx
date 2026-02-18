export const MovieView = ({ movie, onBackClick }) => {
  // nëse s’ka movie (për siguri), mos shfaq asgjë
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


      {/* detaje */}
      <p><b>Description:</b> {movie.description}</p>
      <p><b>Genre:</b> {movie.genre}</p>
      <p><b>Director:</b> {movie.director}</p>

      {/* kthehu mbrapa */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

