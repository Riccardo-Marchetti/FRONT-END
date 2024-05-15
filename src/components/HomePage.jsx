import { Button, Col, Container, Row } from "react-bootstrap";
import MyNavBar from "./MyNavBar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import ShowFilm from "./ShowTrailer";

const HomePage = () => {
  const [film, setFilm] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleClose = () => setSelectedFilm(null);
  const handleShow = (film) => setSelectedFilm(film);

  const navigate = useNavigate();

  const getFilm = async () => {
    try {
      const response = await fetch("http://localhost:3001/film", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.content);
        setFilm(data.content);
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    navigate("/book-ticket");
  };

  useEffect(() => {
    getFilm();
  }, []);

  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <main>
        <h1 className="text-center px-0 mx-0 mt-3 mb-0">Now in theaters</h1>
        <Container>
          <Row>
            {film.slice(0, 8).map((film, i) => {
              return (
                <Col
                  key={i}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-4 mx-0 px-0 film-col"
                  style={{ height: "300px", position: "relative" }}
                >
                  <Link to={`/movie-details/${film.id}`} key={film.id}>
                    {" "}
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
                  </Link>
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
                      onClick={handleButtonClick}
                    >
                      BOOK TICKET
                    </Button>
                  </div>
                </Col>
              );
            })}
            <h1 id="coming-soon" className="text-center px-0 mx-0 mt-3 mb-2">
              Cooming soon
            </h1>
            {film.slice(-8).map((film, i) => {
              return (
                <Col
                  key={i}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-3 mx-0 px-0 film-col"
                  style={{ height: "300px", position: "relative" }}
                >
                  <Link to={`/movie-details/${film.id}`} key={film.id}>
                    {" "}
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
                  </Link>
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
                  </div>
                </Col>
              );
            })}
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
