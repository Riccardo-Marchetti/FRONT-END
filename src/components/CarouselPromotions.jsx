import { Carousel, Col } from "react-bootstrap";
import ExampleCarouselImage from "./ExampleCarouselImage";
import image from "../assets/CarouselImage.png";
import image1 from "../assets/CarouselImage1.png";
import image2 from "../assets/CarouselImage2.png";
import image3 from "../assets/CarouselImage5.png";
import image4 from "../assets/CarouselImage6.png";
import image5 from "../assets/CarouselImage7.png";

const CarouselPromotions = () => {
  return (
    <>
      <Col className="d-flex justify-content-center carousel1">
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage image={image} altText="dune-img" />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage image={image1} altText="madame-web-img" />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage image={image2} altText="godzilla-img" />
          </Carousel.Item>
        </Carousel>
      </Col>
      <Col className="d-flex justify-content-center d-md-none ">
        <Carousel>
          <Carousel.Item>
            <ExampleCarouselImage image={image4} altText="dune-img" />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage image={image5} altText="madame-web-img" />
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage image={image3} altText="godzilla-img" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </>
  );
};
export default CarouselPromotions;
