import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import FilmDetails from "./components/FilmDetails";
import BookSeat from "./components/BookSeat";
import Promotions from "./components/Promotions";
import FilmComingSoonDetails from "./components/FilmComingSoonDetails";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/movie-details/:filmId" element={<FilmDetails />} />
          <Route
            path="/movie-coming-soon-details/:filmId"
            element={<FilmComingSoonDetails />}
          />
          <Route path="/book-seat" element={<BookSeat />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
