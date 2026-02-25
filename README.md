# myFlix Client

Client-side React application for the myFlix app (CareerFoundry Achievement 3).

This single-page application (SPA) allows users to browse movies, view movie details, manage their profile, and maintain a list of favorite movies.

---

## 🚀 Live Demo

(If deployed, add your link here)

---

## 🛠 Tech Stack

- React
- React Router
- React Bootstrap
- Parcel
- JavaScript (ES6+)
- REST API (Node.js / Express / MongoDB backend)

---

## 📂 Project Structure
myFlix-client

package.json

src

index.jsx

index.html

index.scss

components

login-view

signup-view

main-view

movie-card

movie-view

profile-view

navigation-bar


---

## 🔐 Features

### Authentication
- User registration (Signup)
- User login (JWT authentication)
- Logout

### Routing (React Router)
- `/login`
- `/signup`
- `/` (Home – Movie List)
- `/movies/:movieId`
- `/profile`

### Movie Features
- View all movies
- View movie details
- Add movie to favorites
- Remove movie from favorites

### Profile Features
- View user information
- Update username, password, email, birthday
- Delete account (deregister)
- View list of favorite movies

---

## ⚙ Installation

Clone the repository:


git clone <your-repo-link>


Navigate into the project folder:


cd myFlix-client


Install dependencies:


npm install


Start the development server:


npm start


The app runs at:


http://localhost:1234


---

## 🔌 Backend API

This application connects to the myFlix REST API hosted at:


https://test-heroku-exercise-7495d54af436.herokuapp.com


The API provides:

- `/login`
- `/users`
- `/movies`
- `/users/:Username`
- `/users/:Username/movies/:MovieID`

All protected endpoints require a JWT token.

---

## 🧪 Testing Overview

The following flows were tested:

1. Signup → Login
2. Fetch movies (authenticated)
3. Navigate to movie detail view
4. Add movie to favorites
5. Remove movie from favorites
6. Navigate to profile view
7. Update user information
8. Delete account
9. Logout

All navigation is handled via React Router without page reload.

---

## 📦 Deployment

The project can be deployed using:

- Netlify
- Vercel
- Render
- GitHub Pages (with configuration)

---

## 👩‍💻 Author
Enkeleda M.


