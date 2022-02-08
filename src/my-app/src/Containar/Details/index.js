import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../helper/axios";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import NotFound from "../NotFound";
import { generatePublicUrl } from "../../urlconfig";
import "./index.css";
import CustomPaging from "../../Component/Slider.js/customPaging";

const Details = (props) => {
  const { id } = useParams();
  const auth=useSelector(state=>state.auth);
  const details = useSelector((state) => state.Room);
  let data = details.Room.filter((it) => it._id === id);
  const [userData, setUserData] = useState(data[0]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fatchdata() {
      try {
        const res = await axios.get(`/singleroom/${id}`);
        if (res.status === 200) {
           setUserData(res.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setUserData(error.response.data);
          setError("404 not found");
        }
      }
    }
    if (userData === undefined) fatchdata();
  }, [userData]);

  return userData ? (
    error ? (
      <Container>
        <NotFound error />
      </Container>
    ) : (
      <>
        <img
          className="coverImage"
          src={generatePublicUrl(userData.coverPhoto)}
          alt="Cover photo"
        />
        <Row sm={1} md={2} style={{ rowGap: "70px" }}>
          <Col>
            <CustomPaging photo={userData.RoomPhoto} title="Room Photo" />
          </Col>
          <Col>
            <div style={{ color: "gray" }}>
              <h2 style={{ textAlign: "center" }}>
                Property Type : {userData.type}
              </h2>
              <h3>Name: {userData.Name}</h3>
              <h3>
                Price:{" "}
                <span style={{ textDecoration: "line-through 3px red" }}>
                  {userData.Price}
                </span>
              </h3>
              <h3>Offer: {userData.Offer}%</h3>
              <h3>Price: {userData.calculatePrice}</h3>
              <h3>{`Save: ${
                userData.Price - userData.calculatePrice
              }tk per room per night`}</h3>
              <h3>Total Room : {userData.Room}</h3>
              {userData.Breakfast && <h3>Free Breakfast</h3>}
              {userData.Restaurant && <h3>Restaurant Available</h3>}
             { auth.authenticate && auth.user.role==='user'&&
              <Link to={`/booking/${userData._id}`} state={userData}>
                <button className="butt">booking now</button>
              </Link>}
             {!auth.authenticate &&
             <Link to={`/login`} state={userData}>
             <button className="butt">booking now</button>
           </Link>}
            </div>
          </Col>
        </Row>
        <div style={{ margin: "70px 20px 20px 20px", textAlign: "justify" }}>
          <h2>Description</h2>
          <p>{userData.Details}</p>
        </div>
      </>
    )
  ) : (
    <Container>
      <Spinner animation="grow" size="lg" />
      <Spinner animation="grow" size="lg" />
      <Spinner animation="grow" size="lg" />
    </Container>
  );
};
export default Details;
