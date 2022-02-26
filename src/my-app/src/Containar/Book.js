import { useEffect, useState } from "react";

import { Container, Form, Modal, Spinner } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "../helper/axios";
import NotFound from "./NotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Book.css";

const BookingNow = (props) => {
  const [startError,setStartError]=useState(false);
  const [StartDate,setstartDate]=useState('');
  const [EndDate,setendDate]=useState('')
  const date = new Date();
  const [quantity, setQuantity] = useState(1);
  const minStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  const endStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 2
  );
  const [startDate, setStartDate] = useState(minStart);
  const [endDate, setEndDate] = useState(endStart);
  const [show, setShow] = useState(true);
  const [count,setCount]=useState(1);
  const { id } = useParams();
  const range=(endDate.getTime()-startDate.getTime())/ (1000 * 3600 * 24);
  const Details = useLocation();
  const [userData, setUserData] = useState(Details.state || undefined);
  const [error, setError] = useState(null);
  useEffect(() => {
    setShow(true);
    if (userData?._id !== id) setUserData(undefined);
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
  },[]);

   useEffect(() => {
      setstartDate(startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+(startDate.getDate()+1));
       setendDate(endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+(endDate.getDate()+1));
       async function count(){
        if(range>0){
          setStartError(false)
          // setCount(await axios.post(`/bookingcount/${userData._id}`,{StartDate:sDate,EndDate:eDate}))
         const data= await axios.post(`/bookingcount/${userData._id}`,{StartDate,EndDate})
         setCount(data?.data)
         }
         else
           setStartError(true);
       }

       if(userData)
          count();

  },[startDate,endDate,userData,count]);

  const handleClose = () => {
    setShow(false);
  };
 async function handleSubmit(e) {
    e.preventDefault();
    if(range<=0)
       {
         alert('Please Enter Valid End And Start Date');
         return;
       }
   if(quantity<=0){
    alert('Quantity Minimum 1');
    return;
   }    
    const res =await axios.post(`/booking/${userData._id}`,{
      StartDate,
      EndDate,
      room:quantity,
      Totalprice:(range*quantity)*userData.calculatePrice
    })
    if(res.status===201)
       setShow(false)
  }
  if (show === false) return <Navigate to="/" />;
  return userData ? (
    error ? (
      <Container>
        <NotFound error />
      </Container>
    ) : (
      <>
        <Modal size="md" show={show} onHide={handleClose} backdrop="static">
          <div className="background">
            <Modal.Body>
              <button onClick={handleClose} className="close">
                X
              </button>
              <h3 className="center">Booking Now</h3>
              <Form onSubmit={handleSubmit}>
                Start Date :
                <DatePicker
                  selected={startDate}
                  minDate={minStart}
                  onChange={(date) => setStartDate(date)}
                />
                End Date :
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={endStart}
                />
                {startError &&<h3 style={{color:'red'}}>Start Date must less then end Date</h3>}
                <label htmlFor="quantity">Quantity :</label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  max={userData.Room-count*1}
                  className="counter"
                  value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                />
                <br/>
                <label>Total Price : {range>0&&(range*quantity)*userData.calculatePrice}</label>
                <br/>
                <label>Save Price :{range>0&&(range*quantity)*userData.Price-(range*quantity)*userData.calculatePrice}</label>
                <br/>
                <label>Available  Room: {range>0&&userData.Room-count-quantity}</label>
                <input type="submit" value="Submit" />
              </Form>
            </Modal.Body>
          </div>
        </Modal>
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
export default BookingNow;
