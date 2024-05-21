import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import MyNavBar from "./MyNavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import {
  bookTicket as bookTicketAction,
  deselectSeat,
  selectSeat,
} from "../redux/actions/actions";
import Loading from "./Loading";
import Error from "./Error";

const BookSeat = () => {
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const selectedCinema = useSelector((state) => state.ticket.selectCinema);
  const selectedCity = useSelector((state) => state.ticket.selectCity);
  const selectedDay = useSelector((state) => state.ticket.selectDay);
  const selectedTime = useSelector((state) => state.ticket.selectTime);
  const idShow = useSelector((state) => state.ticket.selectShowId);

  const dispatch = useDispatch();

  const handleSeatSelect = (seatId, seatPrice, rowNumber, seatNumber) => {
    const seatIndex = selectedSeat.findIndex((seat) => seat.id === seatId);
    if (seatIndex === -1) {
      setSelectedSeat([
        ...selectedSeat,
        { id: seatId, row: rowNumber, seat: seatNumber },
      ]);
      setPrice(price + seatPrice);
      dispatch(selectSeat(seatId, rowNumber, seatNumber));
    } else {
      setSelectedSeat(selectedSeat.filter((seat) => seat.id !== seatId));
      setPrice(price - seatPrice);
      dispatch(deselectSeat(seatId));
    }
  };

  const bookTicket = async () => {
    if (!selectedTime || !selectedSeat.length || !price || !idShow) {
      setError("Missing required fields");
      return;
    }
    const ticketData = {
      selectedShowTime: selectedTime,
      assignedSeats: selectedSeat.map((seat) => seat.id),
      price: price,
      idShow: idShow,
      idSeat: selectedSeat.map((seat) => seat.id),
    };
    dispatch(bookTicketAction(ticketData));
    try {
      const response = await fetch("http://localhost:3001/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(ticketData),
      });
      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        setShowAlert(true);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        throw new Error(`${response.status} - Error in fetch`);
      }
    } catch (error) {
      setError("Error in fetch");
      setLoading(false);
    }
  };

  const getBookedSeats = async (showId, showDate, showTime) => {
    const response = await fetch(
      `http://localhost:3001/ticket/bookedSeats/${showId}/${showDate}/${showTime}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} - Error in fetch`);
    }
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`http://localhost:3001/seat`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          let data = await response.json();
          const bookedSeats = await getBookedSeats(
            idShow,
            selectedDay,
            selectedTime
          );
          data.content = data.content.map((seat) => ({
            ...seat,
            booked: bookedSeats.includes(seat.id),
          }));
          setSeats(data.content);
          setLoading(false);
        } else {
          throw new Error(`${response.status} - Error in fetch`);
        }
      } catch (error) {
        setError("Error in fetch");
        setLoading(false);
      }
    };

    fetchSeats();
  }, [idShow, selectedDay, selectedTime]);

  const numberOfRows = 8;
  const seatForRows = 8;

  function convertiData(dataBackend) {
    if (dataBackend) {
      let partiData = dataBackend.split("-");
      let anno = partiData[0];
      let mese = partiData[1];
      let giorno = partiData[2];

      let dataConvertita = giorno + "-" + mese + "-" + anno;
      return dataConvertita;
    } else {
      return "";
    }
  }
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (loading) {
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
      <main>
        <Container className="seat-cont mt-4 mb-5">
          <Row>
            <Col className=" d-flex flex-column align-items-center ">
              <h3 className="mt-3">Selected options</h3>
              <p className="text-center ">
                Movie: {selectedCinema} | {selectedCity} |{" "}
                {convertiData(selectedDay)} | {selectedTime}{" "}
              </p>
              <h3>Select your seats</h3>
              <p className="mb-1">Classic seat: 10€</p>

              <p className="mb-2">Premium seat (row E - F ) : 20€</p>
            </Col>
          </Row>
          <>
            {Array.from({ length: numberOfRows }, (_, i) => i).map(
              (rowNumber) => (
                <Row
                  key={rowNumber}
                  className="align-items-center justify-content-center"
                >
                  <Col className="col-1 text-center text-white">
                    {String.fromCharCode(65 + rowNumber)}
                  </Col>
                  {seats
                    .filter(
                      (seat) =>
                        Math.floor((seat.id - 1) / seatForRows) === rowNumber
                    )
                    .map((seat) => (
                      <Col
                        key={seat.id}
                        className={`col-10 my-1 mx-1 d-flex justify-content-center align-items-center seat text-white ${
                          selectedSeat.find((s) => s.id === seat.id)
                            ? "selected"
                            : seat.booked
                            ? "booked"
                            : ""
                        }`}
                        onClick={() =>
                          !seat.booked &&
                          handleSeatSelect(
                            seat.id,
                            seat.price,
                            rowNumber,
                            seat.id
                          )
                        }
                      >
                        {seat.id}
                      </Col>
                    ))}
                  <Col className="col-1 text-center text-white">
                    {String.fromCharCode(65 + rowNumber)}
                  </Col>
                </Row>
              )
            )}
            <Row>
              <Col className=" d-flex flex-column align-items-center ">
                <h3 className="mt-2">Checkout</h3>
                <p>Total cost of your seats: {price}€</p>
                <Button
                  className="checkout-but mb-3"
                  onClick={bookTicket}
                  disabled={selectedSeat.length === 0}
                >
                  Confirm and pay
                </Button>
                {showAlert && (
                  <Alert
                    onClose={handleAlertClose}
                    variant="success"
                    style={{ width: "180px" }}
                  >
                    Payment accepted!
                  </Alert>
                )}
              </Col>
            </Row>
          </>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default BookSeat;
