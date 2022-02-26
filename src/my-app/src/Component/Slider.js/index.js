import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Card, Container, Form } from "react-bootstrap";
import { generatePublicUrl } from "../../urlconfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";


const Sliderfun = (props) => {
  const type = useSelector((state) => state.type);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  /*  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      }; */
  return (
    <Container>
      <h1>{props.type}</h1>
      <Slider {...settings}>
        {type.type.map((it, id) => (
          <div 
          onClick={() => props.propertyType(it._id, "type")}
          className={
            it._id === props.Check ? "card-styleSylect" : "card-style"
          }
           key={id}>
            <Card
              className="rounded-4"
              /* onClick={() => props.propertyType(it._id)} */
            >
             <Card.Img
                className="imgcontainer"
                variant="top"
                src={generatePublicUrl(it.coverPhoto)}
                alt={it._id}
              />
              <Card.Body>
                <span style={{ fontWeight: " bold", fontSmooth: "auto" }}>
                  {it._id}
                </span>
                <br />
                Total : {it.count} {it._id}
                <br />
                Price Range : {it.minPrice}-{it.maxPrice}
                <br />
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>

      <h1>{props.Location}</h1>
      <Slider {...settings}>
        {type.location.map((it, id) => (
          <div 
          onClick={() => props.propertyType(it._id, "location")}
            className={
              it._id === props.CheckL ? "card-styleSylect" : "card-style"
            }
           key={id}>
            
            <Card className="rounded-4">
            <Card.Img
                className="imgcontainer"
                variant="top"
                src={generatePublicUrl(it.coverPhoto)}
                alt={it._id}
              />
              <Card.Body>
                <span style={{ fontWeight: " bold", fontSmooth: "auto" }}>
                  {it._id}
                </span>
                <br />
                Total : {it.count} {it._id}
                <br />
                Price Range : {it.minPrice}-{it.maxPrice}

              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};
export default Sliderfun;
