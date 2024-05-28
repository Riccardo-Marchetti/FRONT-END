import { useState } from "react";
import { Button, Col, Row, Form, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  // Function to fetch login credentials from backend
  const fetchLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        setLoginFailed(false);
        navigate("/home");
        window.location.reload();
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      setError("Error in fetch");
      setLoginFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    fetchLogin();
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
      <Container className="login-container p-0 col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-4 d-flex justify-content-center  text-white">
        <Row className="flex-column align-items-center">
          <Col className="mt-3 p-0 ">
            <div className="text-center mx-2 mx-sm-3 mx-xl-4 mb-3">
              <h1 className="mb-1  login-title ">DREAM CINEMA</h1>
              <p className="text-white mx-3">
                Dream Cinema is a magical place where dreams come to life on the
                big screen. <br className=" brake" /> Modern, and welcoming, it
                offers an unforgettable cinematic experience for all movie
                lovers.
              </p>
            </div>

            <h2 className="mb-2 mt-4 fw-bold text-center">Login</h2>
            <p className="text-center">
              Not registered yet?{" "}
              <Link to="/register" className="text-decoration-none ">
                {" "}
                Sign up{" "}
              </Link>{" "}
              now!
            </p>
          </Col>
          <Col className="mb-4 col-8 col-sm-7  col-lg-6 col-xxl-7 ">
            <Form>
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
                className="login-but col-12 mb-2"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>
            {loginFailed && (
              <Alert variant="danger" className="mt-2 mb-2">
                Email or password is incorrect
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};
export default LoginPage;
