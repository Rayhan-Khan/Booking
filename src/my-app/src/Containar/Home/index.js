import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlconfig";
import "./index.css";
import getData from "../../action/getDataAction";
import { Link } from "react-router-dom";
import Slider from "../../Component/Slider.js";
import typelocation from "../../action/typeandlocation";
import Pagination from "./pagination";
const Home = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [skip, setSkip] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [maxPrice, setMaxPrice] = useState(false);
  const [minPrice, setMinPrice] = useState(false);
  const [maxOffer, setMaxOfeer] = useState(false);
  const [maxPriceOffer, setMaxPriceMaxOffer] = useState(false);
  const [maxMinPrice, setMaxMinPrice] = useState(false);

  const obj = {
    "max to min price": maxPrice,
    "min to max price": minPrice,
    "max offer": maxOffer,
    "max offer low price": maxMinPrice,
    "max offer max price": maxPriceOffer,
    Restaurant: restaurant,
    Breakfast: breakfast,
  };

  function setskip(value) {
    setSkip((value - 1) * 20);
  }
  function propertyType(data, option) {
    setSkip(0);
    if (option === "type") {
      if (type === data) setType("");
      else setType(data);
    } else {
      if (location === data) setLocation("");
      else setLocation(data);
    }
  }

  function selectOption(value) {
    setSkip(0);
    if (value === "Restaurant") {
      setRestaurant(!restaurant);
      return;
    } else if (value === "Breakfast") {
      setBreakfast(!breakfast);
      return;
    } else if (value === "min to max price") {
      setMinPrice(!minPrice);
      setMaxPriceMaxOffer(false);
      setMaxPrice(false);
      return;
    } else if (value === "max to min price") {
      setMaxPrice(!maxPrice);
      setMinPrice(false);
      setMaxMinPrice(false);

      return;
    } else if (value === "max offer") {
      setMaxOfeer(!maxOffer);
      return;
    } else if (value === "max offer low price") {
      setMaxMinPrice(!maxMinPrice);
      setMaxPriceMaxOffer(false);
      setMaxPrice(false);
      return;
    } else if (value === "max offer max price")
      setMaxPriceMaxOffer(!maxPriceOffer);
    setMaxMinPrice(false);
    setMinPrice(false);
    return;
  }

  const dispatch = useDispatch();
  const room = useSelector((state) => state.Room);
  useEffect(() => {
    dispatch(typelocation());
  }, []);
  const params = {};
  useEffect(() => {
    if (type) {
      params.type = type;
    }
    if (location) {
      params.Location = location;
    }
    if (skip) {
      params.Skip = skip;
    }
    if (restaurant) {
      params.Restaurant = restaurant;
    }
    if (breakfast) params.Breakfast = breakfast;
    if (maxOffer) {
      params.Offer = -1;
    }
    if (maxPrice) {
      params.Price = -1;
    } else if (minPrice) {
      params.Price = 1;
    } else if (maxMinPrice) {
      params.Price = 1;
      params.Offer = -1;
    } else if (maxPriceOffer) {
      params.Price = -1;
      params.Offer = -1;
    }
    dispatch(getData(params));
  }, [
    type,
    location,
    skip,
    maxMinPrice,
    maxOffer,
    maxPriceOffer,
    minPrice,
    breakfast,
    restaurant,
    maxPrice,
  ]);
  return (
    <div>
      <Container fluid>
        <Row xs={12} md={12}>
          <Col xs={12} md={2}>
            <h1>Select any filter</h1>
            <Form>
              {Object.keys(obj).map((type, id) => (
                <div key={id} className="mb-3">
                  <Form.Check
                    checked={obj[type]}
                    onChange={() => selectOption(type)}
                    type="checkbox"
                    id={`check-api-${type}`}
                    label={type}
                  ></Form.Check>
                </div>
              ))}
            </Form>
          </Col>

          <Col xs={12} md={10}>
            <div style={{fontSize:'40px'}}>{
              room.loading ? (
                <Container>
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="primary" />

                </Container>
              ) :room.count > 0 ? (
                <div style={{ color: "#cccccc" }}>
                  Total : {room.count} Room found
                </div>
              ):
              <div style={{ color: "#cccccc" }}>
                  Sorry...,No room(s) found at these condition
                </div>

            }</div>
            <Slider
              type={type ? "Type : " + type : "Browse by property type"}
              show="property"
              Location={
                location ? "Location : " + location : "Browse By Location"
              }
              propertyType={propertyType}
              Check={type}
              CheckL={location}
            />

            <h1>Room</h1>
            {!room.count && (
              <h1 style={{ color: "green" }}>
                No room(s) found at these condition
              </h1>
            )}
            <Row xs={1} md={3} xl={4} className="g-1">
              {room?.Room.map((room, idx) => (
                <Link
                  key={idx}
                  /* onClick={()=>} */
                  className="card-style"
                  to={`${room._id}`}
                >
                  <Col>
                    <Card className="rounded-4">
                      {room.coverPhoto && (
                        <Card.Img
                          className="imgcontainer"
                          variant="top"
                          src={generatePublicUrl(room.coverPhoto)}
                        />
                      )}
                      <Card.Body>
                        <Card.Title style={{ height: "8vh" }}>
                          {room.Name}
                        </Card.Title>
                        <Card.Text>
                          Price:
                          <span className="text-decoration-line-through">
                            {room.Price}
                          </span>
                          &nbsp;&nbsp;
                          {room.calculatePrice} tk
                          <br />
                          Offer:{room.Offer}%<br />
                          Location:{room.Location}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Pagination skip={Math.ceil(skip / 20)} pagecalc={setskip} />
    </div>
  );
};
export default Home;
