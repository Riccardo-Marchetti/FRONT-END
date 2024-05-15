/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const FilmCoverDetails = ({ film, convertiData }) => {
  return (
    <>
      <div
        className="bg-cover"
        // eslint-disable-next-line react/prop-types
        style={{ backgroundImage: `url('${film.cover}')` }}
      ></div>
      <Col className="col-12 col-md-6 d-flex justify-content-center align-items-center py-4">
        <img src={film.cover} alt={film.title} className="img-fluid fadeIn" />
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
            <strong>Exit date:</strong> {convertiData(film.exitDate)}
          </p>
          <p className="text-white fadeIn">
            <strong>Director:</strong> {film.director}
          </p>
        </div>

        <p className="text-white fadeIn">{film.description}</p>
      </Col>
    </>
  );
};
export default FilmCoverDetails;
