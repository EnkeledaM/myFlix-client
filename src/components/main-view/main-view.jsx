import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // Krijojmë URL string për fotot (Parcel-friendly)
  const inceptionPoster = new URL("../../assets/inception.jpeg", import.meta.url).href;
  const matrixPoster = new URL("../../assets/matrix.jpeg", import.meta.url).href;
  const interstellarPoster = new URL("../../assets/interstellar.jpeg", import.meta.url).href;

  const [movies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller.",
      image: inceptionPoster,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "The Matrix",
      description: "Reality is not what it seems.",
      image: matrixPoster,
      genre: "Action",
      director: "Wachowski Sisters",
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A journey through space and time.",
      image: interstellarPoster,
      genre: "Adventure",
      director: "Christopher Nolan",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <h1>myFlix</h1>

      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(m) => setSelectedMovie(m)}
        />
      ))}
    </div>
  );
};
