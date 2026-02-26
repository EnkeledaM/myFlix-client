import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const API_URL = "https://test-heroku-exercise-7495d54af436.herokuapp.com";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [filterText, setFilterText] = useState("");

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie?.Title?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [movies, filterText]);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    fetch(`${API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Container fluid="lg" className="px-4 py-3">
        <Routes>
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

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onUserUpdate={setUser}
                />
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={10} lg={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      onUserUpdate={setUser}
                    />
                  </Col>
                </Row>
              )
            }
          />

          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : isLoading ? (
                <Col>Loading movies...</Col>
              ) : error ? (
                <Col>Something went wrong: {error}</Col>
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  <Row className="align-items-center mb-3">
                    <Col>
                      <h1 className="m-0">myFlix</h1>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6} lg={5}>
                      <input
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder="Search movies..."
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col
                        key={movie._id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          onUserUpdate={setUser}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};