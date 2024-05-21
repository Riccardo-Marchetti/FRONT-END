import Footer from "./Footer";
import MyNavBar from "./MyNavBar";
import image from "../assets/CarouselImage.png";
import image1 from "../assets/CarouselImage1.png";
import image2 from "../assets/CarouselImage2.png";
import image3 from "../assets/CarouselImage5.png";
import image4 from "../assets/CarouselImage6.png";
import image5 from "../assets/CarouselImage7.png";
import { Col, Container, Row } from "react-bootstrap";
const Promotions = () => {
  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <main>
        <Container className="mt-3 promotions-container">
          <Row className="justify-content-center align-items-center">
            <Col className="col-12 col-lg-11   m-0 p-0">
              <img
                src={image}
                alt="image-promotions"
                className="mb-3 image-promotions"
                style={{ width: "100%" }}
              />
              <img
                src={image1}
                alt="image-promotions"
                className="mb-3 image-promotions"
                style={{ width: "100%" }}
              />
              <img
                src={image2}
                alt="image-promotions"
                className="mb-3 image-promotions"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Container>
        <Container className="mt-3 d-md-none">
          <Row className="justify-content-center align-items-center">
            <Col className="col-10 col-sm-12 m-0 p-0">
              <img
                src={image3}
                alt="image-promotions"
                className="image-promotions mb-3 "
                style={{ width: "100%" }}
              />
              <img
                src={image4}
                alt="image-promotions"
                className="image-promotions mb-3"
                style={{ width: "100%" }}
              />
              <img
                src={image5}
                alt="image-promotions"
                className="image-promotions mb-3"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Promotions;
