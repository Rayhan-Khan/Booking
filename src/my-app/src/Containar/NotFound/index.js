import notfound from "../../img/saedx-blog-featured-70.jpg";
import { Container } from "react-bootstrap";
import "./index.css";
const NotFound = (props) => (
  <Container>
    <h1 className="mx-auto img-fluid w-100 text">{props.error}</h1>
    <img className="d-block mx-auto img-fluid w-40" src={notfound} alt="not found" />
  </Container>
);
export default NotFound;
