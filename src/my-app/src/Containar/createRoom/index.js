import Home from "../Home";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import  axios from '../../helper/axios'
import { useSelector } from "react-redux";
import {Alert} from 'react-bootstrap'

const CreateRoom = (props) => {
  
  const auth = useSelector((state) => state.auth);
  const [Type, setType] = useState("");
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [Room, setRoom] = useState('');
  const [Price, setPrice] = useState('');
  const [Breakfast, setBreakfast] = useState(false);
  const [Restaurant, setRestaurant] = useState(false);
  const [Offer, setOffer] = useState(0);
  const [RoomPhoto, setRoomPhoto] = useState([]);
  const [Details, setDetails] = useState("");
  const [coverPhoto, setcoverPhoto] = useState("");
  const [show, setShow] = useState(true);
  const [isValidate, setValidate] = useState(false);
  const handleClose = () => {
    auth.error = null;
    setShow(false);
  };
  useEffect(() => {
    auth.error = null;
    setShow(true);
  }, []);

  async function handleSubmit(){
     if(RoomPhoto.length===0)
     return setValidate(true);
    if (!Type || !Name||!Price|| !Room || !Location||!RoomPhoto ||!coverPhoto)
      return setValidate(true);
      const form = new FormData();
      form.append('type',Type);
      form.append('Name',Name);
      form.append('Location',Location);
      form.append('Room',Room);
      form.append('Breakfast',Breakfast);
      form.append('Price',Price);
      form.append('Offer',Offer);
      form.append('Details',Details);
      form.append('coverPhoto',coverPhoto);
      for (let pic of RoomPhoto) {
        form.append("RoomPhoto", pic);
      }
     const error=null;
    try{
      const res=await axios.post('createroom',form);
      if(res.status===201)
      <Alert  variant='successs'>
         successfully created
    </Alert>
    setShow(false)
    }catch(err){
      if(err.response.status===409)
          {  setValidate(true)
            
          }
     else if(err.response.status===400)
         {
           
           if(process.env.NODE_ENV==='development')
           console.log(err);
           else
            error='Not created products'
         }
    }
    
    
  }
  if (show === false) return <Navigate to="/" />;
  return (
    <>
      <Modal size="md" show={show} onHide={handleClose} backdrop="static">
        <Modal.Body>
          <button onClick={handleClose} className="close">
            X
          </button>
          <h3 className="center">Create Room</h3>
          <Form noValidate validated={isValidate}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                required
                value={Type}
                onChange={(e) => setType(e.target.value)}
                type="text"
                placeholder="Enter room type"
              />
              <Form.Control.Feedback type="invalid">
                type is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{Type} Name</Form.Label>
              <Form.Control
                required
                value={Name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder={`Enter ${Type} Name`}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
              <h3 style={{ color: "red" }}>
                {auth.error && auth.message ? auth.message : null}
              </h3>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{Type} Location</Form.Label>
              <Form.Control
                required
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder={`Enter Location Name`}
              />
              <Form.Control.Feedback type="invalid">
                Location is required
              </Form.Control.Feedback>
              <h3 style={{ color: "red" }}>
                {auth.error && auth.message ? auth.message : null}
              </h3>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder={`Enter Price`}
                isInvalid={Price<=0 &&isValidate===true}
              />
              <Form.Control.Feedback type="invalid">
                Price is Required and must greater than 0
              </Form.Control.Feedback>
              <h3 style={{ color: "red" }}>
                {auth.error && auth.message ? auth.message : null}
              </h3>
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Room</Form.Label>
              <Form.Control
                required
                value={Room}
                onChange={(e) => setRoom(e.target.value)}
                type="text"
                placeholder={`Enter total room`}
                isInvalid={Room<=0 && isValidate===true}
              />
              <Form.Control.Feedback type="invalid">
                Room number is required
              </Form.Control.Feedback>
              <h3 style={{ color: "red" }}>
                {auth.error && auth.message ? auth.message : null}
              </h3>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Offer Percentage</Form.Label>
              <Form.Control
                required
                value={Offer}
                onChange={(e) => setOffer(e.target.value)}
                type="text"
                placeholder={`Offer percentage`}
              />
            </Form.Group>
            <Form.Label>Breakfast</Form.Label>
            <Form.Select aria-label="Default select example"
            value={Breakfast}
            onChange={(e) =>setBreakfast(e.target.value)}>
              <option value="false">False</option>
              <option value="true">True</option>
            </Form.Select>
            <Form.Label>Restaurantt</Form.Label>
            <Form.Select
              value={Restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              aria-label="Default select example"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </Form.Select>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={Details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cover Photo</Form.Label>
              <Form.Control
                name="coverPhoto"
                onChange={(e) => setcoverPhoto(e.target.files[0])}
                type="file"
                required
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Room Photo</Form.Label>
              <Form.Control
                name="RoomPhoto"
                onChange={(e)=>setRoomPhoto([...RoomPhoto,e.target.files[0]])}
                type="file"
                multiple
                required
              />
            </Form.Group>
            <div>
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Create Room
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateRoom;
