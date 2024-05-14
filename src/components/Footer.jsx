import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  return (
    <>
      <Row className="d-flex flex-column ps-3 d-md-none col-12">
        <Col
          className="d-flex justify-content-between pb-3 ps-4 pe-0"
          onClick={() => setIsOpen1(!isOpen1)}
          style={{ cursor: "pointer" }}
        >
          SOCIAL{" "}
          {isOpen1 ? (
            <i className="fas fa-chevron-up me-4"></i>
          ) : (
            <i className="fas fa-chevron-down me-4"></i>
          )}
        </Col>
        {isOpen1 && (
          <div className="d-flex flex-column ms-3">
            <Link
              to={"https://www.instagram.com/_k.izzi_/"}
              className="text-decoration-none text-black foot-text"
            >
              <i className="fab fa-instagram-square"></i> Instagram
            </Link>
            <Link
              to={"https://github.com/Riccardo-Marchetti"}
              className="text-decoration-none text-black foot-text"
            >
              <i className="fab fa-github"></i> Github
            </Link>
            <Link
              to={"https://www.linkedin.com/in/riccardo-marchetti-137149295/"}
              className="text-decoration-none text-black foot-text"
            >
              <i className="fab fa-linkedin"></i> Linkedin
            </Link>
          </div>
        )}

        <Col
          className="d-flex justify-content-between pb-3 ps-4 pe-0"
          onClick={() => setIsOpen2(!isOpen2)}
          style={{ cursor: "pointer" }}
        >
          USEFUL LINKS{" "}
          {isOpen2 ? (
            <i className="fas fa-chevron-up me-4"></i>
          ) : (
            <i className="fas fa-chevron-down me-4"></i>
          )}
        </Col>
        {isOpen2 && (
          <div className="d-flex flex-column ms-3">
            <Link
              to={"https://www.instagram.com/_k.izzi_/"}
              className="text-decoration-none text-black foot-text"
            >
              Your account
            </Link>
            <Link
              to={"/promotions"}
              className="text-decoration-none text-black foot-text"
            >
              Promotions
            </Link>
            <Link className="text-decoration-none text-black foot-text">
              Coming soon
            </Link>
          </div>
        )}

        <Col
          className="d-flex justify-content-between pb-3 ps-4 pe-0"
          onClick={() => setIsOpen3(!isOpen3)}
          style={{ cursor: "pointer" }}
        >
          CONTACT{" "}
          {isOpen3 ? (
            <i className="fas fa-chevron-up me-4"></i>
          ) : (
            <i className="fas fa-chevron-down me-4"></i>
          )}
        </Col>
        {isOpen3 && (
          <div className="d-flex flex-column ms-3">
            <p>
              <i className="fas fa-home"></i> Bergamo, BG 24030, IT
            </p>
            <p>
              <i className="bi bi-envelope-fill"></i> dreamcinema@gmail.com
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> + 01 23456789
            </p>
          </div>
        )}
      </Row>

      <Container className="mt-5 foot-cont">
        <Row className="d-flex justify-content-center ">
          <Col className="col-4 col-lg-3">
            <div className="d-flex flex-column text-center">
              <h6>SOCIAL</h6>
              <Link
                to={"https://www.instagram.com/_k.izzi_/"}
                className="text-decoration-none text-black foot-text"
              >
                <i className="fab fa-instagram-square"></i> Instagram
              </Link>
              <Link
                to={"https://github.com/Riccardo-Marchetti"}
                className="text-decoration-none text-black foot-text"
              >
                <i className="fab fa-github"></i> Github
              </Link>
              <Link
                to={"https://www.linkedin.com/in/riccardo-marchetti-137149295/"}
                className="text-decoration-none text-black foot-text"
              >
                <i className="fab fa-linkedin"></i> Linkedin
              </Link>
            </div>
          </Col>

          <Col className="col-4 col-lg-3">
            <div className="d-flex flex-column text-center">
              <h6>USEFUL LINKS</h6>
              <Link
                to={"https://www.instagram.com/_k.izzi_/"}
                className="text-decoration-none text-black foot-text"
              >
                Your account
              </Link>
              <Link
                to={"/promotions"}
                className="text-decoration-none text-black foot-text"
              >
                Promotions
              </Link>
              <Link className="text-decoration-none text-black foot-text">
                Coming soon
              </Link>
            </div>
          </Col>
          <Col className="col-4 col-lg-3">
            <div className="text-center">
              <h6>CONTACT</h6>
              <p>
                <i className="fas fa-home"></i> Bergamo, BG 24030, IT
              </p>
              <p>
                <i className="bi bi-envelope-fill"></i> dreamcinema@gmail.com
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> + 01 23456789
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Footer;
