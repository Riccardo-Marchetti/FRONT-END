import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Blue Yellow Futuristic Virtual Technology Blog Banner (3).png";
import Loading from "./Loading";
import Error from "./Error";
import { Dropdown, Form } from "react-bootstrap";

const MyNavBar = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Method to fetch user data
  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        setIsLoading(false);
      } else {
        throw new Error(`${response.status} - Errore nella fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUser();
  }, []);

  // Method to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // If the data is still loading, show the loading component
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, show the error component
  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary navbar">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={logo}
              style={{ width: "65px", height: "65px" }}
              className="rounded-circle object-fit-cover ms-2"
              alt="LOGO"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-md-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                to="/home"
                className="text-decoration-none d-flex align-items-center ms-1 ms-md-3 me-4 text-white"
              >
                Home
              </Link>
              <Link
                to="/promotions"
                className="text-decoration-none d-flex align-items-center ms-1 me-4 text-white"
              >
                Promotions
              </Link>
            </Nav>
            <div className="d-flex align-items-center justify-content-start mb-2 mb-md-0 me-3">
              <Dropdown>
                <Dropdown.Toggle
                  as={Button}
                  bsPrefix="custom-toggle"
                  className="rounded-circle ms-md-3 mt-1 mb-1 mb-md-0 mt-md-0 p-0 button-login d-flex align-items-center bg-transparent border-0"
                >
                  <img
                    className="rounded-circle object-fit-cover me-md-2"
                    src={user.avatar}
                    style={{ width: "45px", height: "45px" }}
                    alt="profile-image"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg-dropdown">
                  <Dropdown.Item
                    className="text-white bg-dropdown"
                    href="/profile"
                  >
                    Profile
                  </Dropdown.Item>
                  {["ADMIN", "MODERATOR"].includes(user.role) && (
                    <Dropdown.Item
                      className="text-white bg-dropdown"
                      href="/admin"
                    >
                      Admin
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    className="text-white bg-dropdown"
                    onClick={handleLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form className="d-flex search-film mb-2 mb-md-0">
              <Form.Control
                type="search"
                placeholder="Search movies..."
                className="me-2 "
                aria-label="Search"
              />
              <Button variant="outline-success" className="search-button">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavBar;
