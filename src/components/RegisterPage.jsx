import { useState } from "react";
import { Button, Col, Row, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  // Function to make register request
  const fetchRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, surname, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      } else {
        throw new Error(`${response.status} - Errore nella fetch`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setName("");
    setSurname("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // Function to handle registration submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setValidationError("Name must be longer than 3 characters");
      resetForm();
      return;
    }

    if (surname.length < 4) {
      setValidationError("Surname must be longer than 4 characters");
      resetForm();
      return;
    }

    if (username.length < 4) {
      setValidationError("Username must be longer than 4 characters");
      resetForm();
      return;
    }

    if (!email.includes("@")) {
      setValidationError("You must enter a valid email");
      resetForm();
      return;
    }

    if (password.length < 4) {
      setValidationError("Password must be longer than 4 characters");
      resetForm();
      return;
    }
    // If all validations pass, make register request
    fetchRegister();
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
    <header className="login d-flex flex-column  justify-content-center align-items-center">
      <Container className="login-container p-0 col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4 d-flex justify-content-center  text-white">
        <Row className="d-flex flex-column align-items-center col-12 col-md-11 col-xxl-10 ">
          <Col className="text-center">
            <h2 className="mb-3 fw-bold mt-4">Register</h2>
            <p>
              Are you already registered?{" "}
              <Link to="/" className="text-decoration-none ">
                {" "}
                Log in{" "}
              </Link>{" "}
              now!
            </p>
          </Col>

          <Col className="col-9 col-sm-9 col-md-8 pb-1">
            <Form className="form mb-4 ">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert your surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insert your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Insert your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="login-but col-12 mt-1"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Form>
            {validationError && (
              <Alert variant="danger" className=" mb-4">
                {validationError}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default RegisterPage;
