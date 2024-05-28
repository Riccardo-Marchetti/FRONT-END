import { Button, Col, Container, Row } from "react-bootstrap";
import MyNavBar from "./MyNavBar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import ShowFilm from "./ShowTrailer";
import CarouselPromotions from "./CarouselPromotions";
import Loading from "./Loading";
import Error from "./Error";

const HomePage = () => {
  const [inTheaters, setInTheaters] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setSelectedFilm(null);
  const handleShow = (film) => setSelectedFilm(film);

  // Fetch films from the backend API based on their state (in theaters or coming soon)
  const fetchFilms = async (filmState) => {
    try {
      const response = await fetch(
        `http://localhost:3001/film/filmState?filmState=${filmState}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      throw new Error("Error in fetch");
    }
  };

  // Retrieve films data (in theaters and coming soon) from the backend
  const getFilm = async () => {
    setIsLoading(true);
    try {
      const inTheatersData = await fetchFilms("INTHEATERS");
      const comingSoonData = await fetchFilms("COMINGSOON");
      setInTheaters(inTheatersData);
      setComingSoon(comingSoonData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Redirect to movie details page
  const handleButtonClick = (filmId) => {
    navigate(`/movie-details/${filmId}`);
  };

  // Redirect to movie details page for coming soon films
  const showDetails = (filmId) => {
    navigate(`/movie-coming-soon-details/${filmId}`);
  };

  // Fetch films data on component mount
  useEffect(() => {
    getFilm();
  }, []);

  // If the data is still loading, show the loading component
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, show the error component
  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <main>
        <Container className="mt-4">
          <Row>
            <CarouselPromotions />
          </Row>
        </Container>
        <h1 className="text-center px-0 mx-0 mt-4 mb-0 title-home">
          Now in theaters
        </h1>
        <Container>
          <Row>
            {inTheaters.map((film, i) => (
              <Col
                key={i}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-4 mx-0 px-0 film-col"
                style={{ height: "300px", position: "relative" }}
              >
                <img
                  src={film.cover}
                  alt="cover-film"
                  style={{
                    height: "100%",
                    width: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <div className="film-buttons  col-xxl-9 col-xl-7 col-lg-8 col-md-8 col-sm-9 px-sm-3 px-md-0 ">
                  <Button
                    variant="primary"
                    className="m-1 trailer-but"
                    onClick={() => handleShow(film)}
                  >
                    WATCH TRAILER
                  </Button>
                  {selectedFilm && (
                    <ShowFilm
                      film={selectedFilm}
                      show={selectedFilm === film}
                      handleClose={handleClose}
                    />
                  )}

                  <Button
                    variant="primary"
                    className="m-1 book-but"
                    onClick={() => handleButtonClick(film.id)}
                  >
                    BOOK TICKET
                  </Button>
                </div>
              </Col>
            ))}
            <h1
              id="coming-soon"
              className="text-center px-0 mx-0 mt-4 mb-2 title-home"
            >
              Coming soon
            </h1>
            {comingSoon.map((film, i) => (
              <Col
                key={i}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-3 mx-0 px-0 film-col"
                style={{ height: "300px", position: "relative" }}
              >
                <img
                  src={film.cover}
                  alt="cover-film"
                  style={{
                    height: "100%",
                    width: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div className="film-buttons col-xxl-9 col-xl-7 col-lg-8 col-md-8 col-sm-9 px-sm-3 px-md-0">
                  <Button
                    variant="primary"
                    className="m-1 trailer-but"
                    onClick={() => handleShow(film)}
                  >
                    WATCH TRAILER
                  </Button>
                  {selectedFilm && (
                    <ShowFilm
                      film={selectedFilm}
                      show={selectedFilm === film}
                      handleClose={handleClose}
                    />
                  )}
                  <Button
                    variant="primary"
                    className="m-1 book-but"
                    onClick={() => showDetails(film.id)}
                  >
                    SHOW DETAILS
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};
export default HomePage;
