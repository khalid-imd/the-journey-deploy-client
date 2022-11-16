import Carousel from "react-bootstrap/Carousel";
import Photobar from "../assets/index-photobar.png";

function Hero() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={Photobar} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;
