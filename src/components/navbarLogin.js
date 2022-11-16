import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import IconLogin from "../assets/navbar-icon-after-login.png";
import IconProfile from "../assets/profile-user.png";
import DropdownProfile from "./dropdown";

function NavbarLogin() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
      <Container>
        <Link to="/home">
          <Navbar.Brand>
            <img width="80px" src={IconLogin} alt="" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link eventKey={2}>
              <DropdownProfile />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLogin;
