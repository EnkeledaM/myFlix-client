
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
  console.log("✅ MainView po renderohet");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          console.log("Unauthorized – do vazhdojmë pa data");
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data || []);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      });
  }, []);

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <h1 className="my-4">myFlix</h1>

      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} md={3} className="mb-4">
            <MovieCard
              movie={movie}
              onMovieClick={(m) => setSelectedMovie(m)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};