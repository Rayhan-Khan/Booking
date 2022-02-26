import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../helper/axios";
//import './index.css'

const BookingList = (props) => {
  const [booking, setBooking] = useState(undefined);
  let res;
  useEffect(() => {
    async function bookdata() {
      res = await axios.get("/admin/booking");
      if (res?.status === 200) {
        setBooking(res?.data);
      }
    }
    bookdata();
  }, []);

  return booking ? (
    booking.message ? (
      <Container>
        <h1 style={{ color: "green" }}>
          No Booking.No user Booking Any Room
        </h1>
      </Container>
    ) : (
      <Container>
        <h1>Details Room Click anyOne</h1>
        {booking.map((data, id) => {
          return (
            <Link className="linkStyle" to={`/${data.RoomId}`} key={id}>
              <Row className={id%2?'color1':'color2'}>
                <Col xs={1}>{id+1}.</Col>
                <Col><span style={{fontWeight: 'bold'}}>Product Id :</span><br/>{data.RoomId}</Col>
                <Col><span style={{fontWeight: 'bold'}} >StartDate :</span><br/>{new Date(data.StartDate).toDateString()}</Col>
                <Col><span style={{fontWeight: 'bold'}} >EndDate :</span><br/> {new Date(data.EndDate).toDateString()}</Col>
                <Col><span style={{fontWeight: 'bold'}} >Total Paid :</span><br/> {data.Totalprice}</Col>
                <Col><span style={{fontWeight: 'bold'}} >Payment Date :</span><br/>{new Date(data.createdAt).toDateString()}</Col>
              </Row>
            </Link>
          );
        })}
      </Container>
    )
  ) : (
    <Container>
      <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
<Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
<Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
    </Container>
  );
};

export default BookingList;