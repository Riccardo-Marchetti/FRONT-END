/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyNavBar from "./MyNavBar";
import Footer from "./Footer";
import Loading from "./Loading";
import Error from "./Error";

const FilmComingSoonDetails = () => {
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const params = useParams();

  // Function to convert date format from YYYY-MM-DD to DD-MM-YYYY
  function convertData(dataBackend) {
    if (dataBackend) {
      let data = dataBackend.split("-");
      let year = data[0];
      let month = data[1];
      let day = data[2];

      let dataConvertita = day + "-" + month + "-" + year;
      return dataConvertita;
    } else {
      return "";
    }
  }

  // Effect to fetch film details based on the filmId parameter
  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/film/${params.filmId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFilm(data);
          setLoading(false);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        setError("Error in fetch");
        setLoading(false);
      }
    };

    fetchFilm();
  }, [params.filmId]);

  // If the data is still loading, show the loading component
  if (loading) {
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
      <main className="flex-grow-1 ">
        <Container fluid className="mb-md-5 ">
          <Row
            className="justify-content-center position-relative"
            style={{
              minHeight: "60vh",
            }}
          >
            <div
              className="bg-cover"
              // eslint-disable-next-line react/prop-types
              style={{ backgroundImage: `url('${film.cover}')` }}
            ></div>
            <Col className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4 ">
              <img
                src={film.cover}
                alt={film.title}
                className="img-fluid fadeIn cover-img"
                style={{ height: "450px" }}
              />
            </Col>
            <Col className="col-12 col-md-6 d-flex flex-column justify-content-start  align-items-center px-5 pt-3 pb-5 p-md-5 col-details">
              <h1 className="my-4 mt-md-0 mb-md-3 text-center text-white fadeIn d-flex align-items-center">
                {film.title}
                <span className="fs-6 fw-normal ms-3">
                  <i className="fas fa-star"></i>{" "}
                  {film && film.rating ? film.rating.toFixed(1) : "Loading..."}
                  /5
                </span>
              </h1>
              <div>
                <p className="text-white fadeIn">
                  <strong>Duration:</strong> {film.duration} min
                </p>
                <p className="text-white fadeIn">
                  <strong>Exit date:</strong> {convertData(film.exitDate)}
                </p>
                <p className="text-white fadeIn">
                  <strong>Director:</strong> {film.director}
                </p>
              </div>

              <p className="text-white fadeIn">{film.description}</p>
            </Col>
          </Row>
        </Container>
        <div style={{ height: "50px" }}></div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default FilmComingSoonDetails;
