import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center ">
        <Col className="col-3">
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

        <Col className="col-3">
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
        <Col className="col-3">
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
  );
};
export default Footer;
