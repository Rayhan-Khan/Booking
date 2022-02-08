import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Containar/Home";
import { Routes, Route } from "react-router-dom";
import Booking from "./Containar/Booking";
import Signup from "./Containar/Signup";
import Header from "./Component/Header";
import LoginForm from "./Containar/Login";
import PrivateRoute from "./Component/privateRoute";
import Auth from "./Component/authRoute";
import Logout from "./Containar/Logout";
import Details from "./Containar/Details";
import Admin from "./Component/Admin";
import CreateRoom from "./Containar/createRoom";
import User from "./Component/User";
import BookingNow from "./Containar/Book";
import BookingList from './Containar/BookingList';


function App() { 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:id' element={<Details/>}/>
        <Route path="/*" element={<Auth/>}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path='/*' element={<User/>}>
          <Route path='booking' element={<Booking/>}/>
          <Route path='booking/:id' element={<BookingNow/>}/>
        </Route>
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="logout" element={<Logout/>} />
        </Route>
        <Route path='/admin/*' element={<Admin/>} >
          <Route path='createroom' element={<CreateRoom/>}/>
          <Route  path="bookinglist" element={<BookingList/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
