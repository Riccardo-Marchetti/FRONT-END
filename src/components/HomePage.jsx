import { Col, Container, Row } from "react-bootstrap";
import MyNavBar from "./MyNavBar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [film, setFilm] = useState([]);
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

  useEffect(() => {
    getFilm();
  }, []);

  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <main>
        <h3 className="text-center px-0 mx-0 mt-3 mb-0">Now in theaters</h3>
        <Container>
          <Row>
            {film.slice(0, 8).map((film, i) => {
              return (
                <Col
                  key={i}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-4 mx-0 px-0 "
                  style={{ height: "300px" }}
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
                      }}
                    />
                  </Link>
                </Col>
              );
            })}
            <h3 id="coming-soon" className="text-center px-0 mx-0 mt-3 mb-0">
              Cooming soon
            </h3>
            {film.slice(-8).map((film, i) => {
              return (
                <Col
                  key={i}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 d-flex  justify-content-center gy-3 mx-0 px-0 "
                  style={{ height: "300px" }}
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
                      }}
                    />
                  </Link>
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
