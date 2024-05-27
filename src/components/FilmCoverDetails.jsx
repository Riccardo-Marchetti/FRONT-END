/* eslint-disable react/prop-types */
import { Col, Spinner } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const FilmCoverDetails = ({ show, convertiData }) => {
  if (!show || !show[0]) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <div
        className="bg-cover"
        // eslint-disable-next-line react/prop-types
        style={{ backgroundImage: `url('${show[0].film.cover}')` }}
      ></div>
      <Col className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4 ">
        <img
          src={show[0].film.cover}
          alt={show[0].film.title}
          className="img-fluid fadeIn cover-img"
          style={{ height: "450px" }}
        />
      </Col>
      <Col className="col-12 col-md-6 d-flex flex-column justify-content-start  align-items-center px-5 pt-3 pb-5 p-md-5 col-details">
        <h1 className="my-4 mt-md-0 mb-md-3 text-center text-white fadeIn d-flex align-items-center">
          {show[0].film.title}
          <span className="fs-6 fw-normal ms-3">
            <i className="fas fa-star"></i>{" "}
            {show && show[0].film.rating ? show[0].film.rating.toFixed(1) : "0"}
            /5
          </span>
        </h1>
        <div>
          <p className="text-white fadeIn">
            <strong>Duration:</strong> {show[0].film.duration} min
          </p>
          <p className="text-white fadeIn">
            <strong>Exit date:</strong> {convertiData(show[0].film.exitDate)}
          </p>
          <p className="text-white fadeIn">
            <strong>Director:</strong> {show[0].film.director}
          </p>
        </div>

        <p className="text-white fadeIn">{show[0].film.description}</p>
      </Col>
    </>
  );
};
export default FilmCoverDetails;
