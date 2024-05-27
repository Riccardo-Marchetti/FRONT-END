import { Col, Row } from "react-bootstrap";
import MovieForm from "./MovieForm";
import ShowForm from "./ShowForm";
import MyNavBar from "./MyNavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";

const AdminPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setUserRole(data.role);
        setIsLoading(false);
      } else {
        throw new Error(`${response.status} - Errore nella fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (userRole && !["ADMIN", "MODERATOR"].includes(userRole)) {
      navigate("/home");
    }
  }, [userRole, navigate]);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <header>
        <MyNavBar />
      </header>
      <Row className="flex-column align-items-center admin-cont m-0 p-0">
        <Col className="mt-3 p-0 col-9 col-sm-7 col-md-6 col-xl-5 col-xxl-4">
          <h2 className="text-center text-white">Create a film</h2>
          <MovieForm />
        </Col>
      </Row>
      <Row className="flex-column align-items-center admin-cont m-0 p-0">
        <Col className="mt-3 p-0 col-9 col-sm-7 col-md-6 col-xl-5 col-xxl-4">
          <h2 className="text-center text-white">Create a shows</h2>
          <ShowForm />
        </Col>
      </Row>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default AdminPage;
