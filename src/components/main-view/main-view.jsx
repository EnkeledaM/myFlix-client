import { useState } from "react"; // state
import { MovieCard } from "../movie-card/movie-card"; // kartë filmi
import { MovieView } from "../movie-view/movie-view"; // detaje filmi

export const MainView = () => {
  // lista e filmave (mock data)
  const [movies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller.",
      image: "https://via.placeholder.com/150",
      genre: "Sci-Fi",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "The Matrix",
      description: "Reality is not what it seems.",
      image: "https://via.placeholder.com/150",
      genre: "Action",
      director: "Wachowski Sisters"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A journey through space and time.",
      image: "https://via.placeholder.com/150",
      genre: "Adventure",
      director: "Christopher Nolan"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null); // filmi i klikuar

  // nëse kemi film të zgjedhur, shfaq MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} // Back -> kthehu te lista
      />
    );
  }

  // përndryshe shfaq listën e filmave
  return (
    <div>
      <h1>myFlix</h1>

      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)} // ruaj filmin
        />
      ))}
    </div>
  );
};
