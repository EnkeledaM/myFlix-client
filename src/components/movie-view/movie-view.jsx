import placeholder from "../../assets/interstellar.jpeg";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.Title}</h1>

      <img
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ width: "150px" }}
        onError={(e) => {
          e.currentTarget.onerror = null; // mos hyjë në loop
          e.currentTarget.src = placeholder;
        }}
      />

      <p><b>Description:</b> {movie.Description}</p>
      <p><b>Genre:</b> {movie.Genre?.Name}</p>
      <p><b>Director:</b> {movie.Director?.Name}</p>

      <button onClick={onBackClick}>Back</button>
    </div>
  );
};