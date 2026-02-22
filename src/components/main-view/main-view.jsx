import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [showSignup, setShowSignup] = useState(false);
 

  useEffect(() => {
    if (!token) return;

    fetch("https://test-heroku-exercise-7495d54af436.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
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

  // ✅ Nëse s’ka user → shfaq Login ose Signup
  if (!user) {
    if (showSignup) {
      return (
        <>
          <SignupView onSignupSuccess={() => setShowSignup(false)} />
          <button onClick={() => setShowSignup(false)}>Back to Login</button>
        </>
      );
    }

    return (
      <>
        <LoginView onLoggedIn={handleLoggedIn} />
        <button onClick={() => setShowSignup(true)}>Go to Signup</button>
      </>
    );
  }

  // ✅ Nëse është zgjedhur film → shfaq detajet
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

  // ✅ Përndryshe shfaq listën e filmave
  return (
    <div>
    <Row className="align-items-center mt-3">
       <Col>
          <h1 className="m-0">myFlix</h1>
  </Col>
  <Col className="text-end">
    <button className="btn btn-outline-secondary" onClick={handleLogout}>
      Logout
    </button>
  </Col>
</Row>

      <Row className="g-4 mt-2">
  {movies.map((movie) => (
    <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
      <MovieCard movie={movie} onMovieClick={(m) => setSelectedMovie(m)} />
    </Col>
  ))}
</Row>

    </div>
  );
};