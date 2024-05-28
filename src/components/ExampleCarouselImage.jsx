import { Col, Row } from "react-bootstrap";

// Component to display an image within a carousel
// eslint-disable-next-line react/prop-types
const ExampleCarouselImage = ({ image, altText }) => {
  return (
    <>
      <Row className="d-flex ">
        <Col className="col-12">
          <img src={image} alt={altText} style={{ width: "100%" }} />
        </Col>
      </Row>
    </>
  );
};

export default ExampleCarouselImage;
