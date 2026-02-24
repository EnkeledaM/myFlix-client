import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const [movies, setMovies] = useState([]);


  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  useEffect(() => {
    if (!token) return;

    fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, [token]);

  const handleLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setMovies([]);
    localStorage.clear();
  };

  return (
  <BrowserRouter>
    <Container fluid="lg" className="px-4 py-3">
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Row className="justify-content-md-center">
                <Col md={6} lg={5}>
                  <LoginView onLoggedIn={handleLoggedIn} />
                </Col>
              </Row>
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Row className="justify-content-md-center">
                <Col md={6} lg={5}>
                  <SignupView />
                </Col>
              </Row>
            )
          }
        />

        {/* MOVIE VIEW */}
        <Route
          path="/movies/:movieId"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Row className="justify-content-md-center">
                <Col md={10} lg={8}>
                  <MovieView movies={movies} />
                </Col>
              </Row>
            )
          }
        />

        {/* HOME - MOVIE LIST */}
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
                <Row className="align-items-center mb-4">
                  <Col>
                    <h1 className="m-0">myFlix</h1>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-secondary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Col>
                </Row>

                <Row>
                  {movies
                    .filter((m) => m && m.Title)
                    .map((movie) => (
                      <Col
                        key={movie._id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                </Row>
              </>
            )
          }
        />
      </Routes>
    </Container>
  </BrowserRouter>
);
};
