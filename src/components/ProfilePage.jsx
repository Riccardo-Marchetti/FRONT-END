import { Col, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import UploadProfileImage from "./UploadProfileImage";
import MyNavBar from "./MyNavBar";
import Error from "./Error";
import Loading from "./Loading";
import Footer from "./Footer";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch user data
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
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  // Function to fetch user's tickets
  const getTicket = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/user/me/tickets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTicket(data);
        setIsLoading(false);
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setIsLoading(false);
    }
  };

  // Function to convert date format from YYYY-MM-DD to DD-MM-YYYY
  function convertData(dataBackend) {
    if (dataBackend) {
      let data = dataBackend.split("-");
      let year = data[0];
      let month = data[1];
      let day = data[2];

      let dataConvertita = day + "-" + month + "-" + year;
      return dataConvertita;
    } else {
      return "";
    }
  }

  // Fetch user data and tickets on component mount
  useEffect(() => {
    getUser();
    getTicket();
  }, []);

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
      <header>
        <MyNavBar />
      </header>
      <main style={{ height: "100vh" }}>
        <div className="profile-cont ">
          <Row className="mt-4 d-flex justify-content-center mx-3 mx-sm-0 ">
            <Col className="col-12 col-sm-10 col-md-5 col-lg-4  col-xxl-3 profile-col me-md-4">
              <Row>
                <Col className="col-6 d-flex justify-content-start ps-4">
                  <img
                    src={user.avatar}
                    alt="profile-img"
                    className="rounded-circle object-fit-cover mt-3 mb-3 profile-img"
                  />
                </Col>
                <Col className="col-6 d-flex justify-content-end align-items-start">
                  <UploadProfileImage />
                </Col>
              </Row>
              <Col className="mb-4 ">
                <h6>
                  Full name:{" "}
                  <span>
                    {user.name} {user.surname}
                  </span>
                </h6>
                <h6>
                  Username: <span>{user.username}</span>
                </h6>
                <h6>
                  Email: <span>{user.email}</span>
                </h6>
              </Col>
            </Col>
            <Col className="col-12 col-sm-10 col-md-6 mb-5   mt-3 mt-md-0 tickets-col ms-md-1 ">
              <div className="d-flex justify-content-center mt-3 mt-md-2">
                <h3 className="title-ticket">My tickets :</h3>
              </div>
              <Row className="justify-content-center pb-3 ">
                {ticket && ticket.length > 0 ? (
                  ticket.map((tick, i) => {
                    return (
                      <div
                        key={i}
                        className="ticket mt-2 pb-2 ps-3 mb-2 col-11 col-sm-10 col-md-11 col-lg-10 col-xl-5  mx-sm-2  mx-lg-2  "
                      >
                        <h5 className="fw-semi-bold pt-3">
                          {tick.show.film.title}
                        </h5>
                        <p>
                          Theater: {tick.show.cinemaRoom.cinema.name}{" "}
                          {tick.show.cinemaRoom.cinema.city}
                        </p>
                        <p>Showtime: {tick.selectedShowTime}</p>
                        <p>Show date: {convertData(tick.show.showDate)}</p>
                        <p>Seats: {tick.assignedSeats.join(" - ")}</p>
                        <p className="fw-bold">Ticket price: {tick.price} €</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center align-items-center ">
                    <p className="text-white">
                      You haven&apos;t booked any tickets
                    </p>
                  </div>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default ProfilePage;
