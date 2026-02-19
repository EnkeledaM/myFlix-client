import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // Krijojmë URL string për fotot (Parcel-friendly)
  const inceptionPoster = new URL("../../assets/inception.jpeg", import.meta.url).href;
  const matrixPoster = new URL("../../assets/matrix.jpeg", import.meta.url).href;
  const interstellarPoster = new URL("../../assets/interstellar.jpeg", import.meta.url).href;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
  fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/movies")
    .then((response) => response.json())
    
    .then((data) => {
      console.log("✅ movies from API:", data);
      setMovies(data);
    })


    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}, []);


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
        
          key={movie._id}

          movie={movie}
          onMovieClick={(m) => setSelectedMovie(m)}
        />
      ))}
    </div>
  );
};
