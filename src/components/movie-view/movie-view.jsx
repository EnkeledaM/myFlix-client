
export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;
  return (
    <div>
      <h1>{movie.Title}</h1>
        <p><b>ImagePath:</b> {movie.ImagePath}</p>
          
      <img
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ width: "150px" }}
        onError={(e) => {
         e.target.src = "https://via.placeholder.com/150x220?text=No+Image";
            }}
        />

      <p>
        <b>Description:</b> {movie.Description}
      </p>

      <p>
        <b>Genre:</b> {movie.Genre?.Name}
      </p>

      <p>
        <b>Director:</b> {movie.Director?.Name}
      </p>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
