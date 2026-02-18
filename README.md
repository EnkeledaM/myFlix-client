# myFlix-client

Client-side React application for the myFlix app  
(CareerFoundry Achievement 3)

---

## 📌 Project Overview

This project demonstrates:

- React functional components  
- useState hook for state management  
- Conditional rendering  
- Handling local static assets (poster images)  
- Parcel bundling and transpilation  
- Production build generation  

---

## 🚀 Features

- Displays a list of movies  
- Shows movie details when a movie is clicked  
- Displays poster image, description, genre, and director  
- "Back" button returns to the movie list  

---

## 🛠 Built With

- React  
- Parcel  
- JavaScript (ES6+)  
- SCSS  

---

## 📁 Project Structure

myFlix-client
├── src
│ ├── assets
│ │  ├── inception.jpeg
│ │  ├── matrix.jpeg
│ │  └── interstellar.jpeg
│ ├── components
│ │  ├── main-view
│ │  │    └── main-view.jsx
│ │  ├── movie-card
│ │  │    └── movie-card.jsx
│ │  └── movie-view
│ │       └── movie-view.jsx
│ ├── index.html
│ ├── index.jsx
│ └── index.scss
├── dist
├── package.json
└── README.md

---

## ⚙️ Requirements

- Node.js  
- npm  

---

## 📦 Installation

```bash
npm install


Run (Development)

npm start

or

npx parcel src/index.html

Then  open 
http://localhost:1234

Build (Production)

npm run build


This generates a production-ready build inside the dist/ folder.

🔗 Repository

https://github.com/EnkeledaM/myFlix-client