/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCinema,
  selectCity,
  selectDay,
  selectTime,
  selectShowId,
} from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const BookTicket = ({ show }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const selectedCinema = useSelector((state) => state.ticket.selectCinema);
  const selectedCity = useSelector((state) => state.ticket.selectCity);
  const selectedDay = useSelector((state) => state.ticket.selectDay);
  const selectedTime = useSelector((state) => state.ticket.selectTime);

  const navigate = useNavigate();

  const handleNavigate = () => {
    const matchingShow = show.find(
      (s) =>
        s.showDate === selectedDay &&
        s.showTime.includes(selectedTime) &&
        s.cinemaRoom.cinema.name === selectedCinema &&
        s.cinemaRoom.cinema.city === selectedCity
    );
    if (matchingShow) {
      navigate("/book-seat");
      dispatch(selectShowId(matchingShow.id));
    } else {
      setErrorMessage(
        "There are no shows available that match your search criteria."
      );
      dispatch(selectCinema(null));
      dispatch(selectCity(null));
      dispatch(selectDay(null));
      dispatch(selectTime(null));
    }
  };

  const uniqueCinemas = [...new Set(show.map((s) => s.cinemaRoom.cinema.name))];
  const uniqueCities = [...new Set(show.map((s) => s.cinemaRoom.cinema.city))];
  const uniqueDates = [...new Set(show.map((s) => s.showDate))];
  const uniqueTimes = [...new Set(show.flatMap((s) => s.showTime))];

  useEffect(() => {
    if (selectedCinema && selectedCity && selectedDay && selectedTime) {
      const matchingShow = show.find(
        (s) =>
          s.showDate === selectedDay &&
          s.showTime.includes(selectedTime) &&
          s.cinemaRoom.cinema.name === selectedCinema &&
          s.cinemaRoom.cinema.city === selectedCity
      );
      if (matchingShow) {
        dispatch(selectShowId(matchingShow.id));
        setErrorMessage(null);
      }
    }
  }, [selectedCinema, selectedCity, selectedDay, selectedTime, dispatch, show]);
  useEffect(() => {
    const unloadListener = () => {
      dispatch(selectCinema(null));
      dispatch(selectCity(null));
      dispatch(selectDay(null));
      dispatch(selectTime(null));
    };

    window.addEventListener("unload", unloadListener);

    return () => {
      window.removeEventListener("unload", unloadListener);
    };
  }, [dispatch]);

  return (
    <>
      <Row className="p-0">
        <Col className=" d-flex flex-column align-items-center p-0 m-0  ">
          <h3 className="title-book-ticket mt-4 mb-3 text-center">
            Book your show now
          </h3>
          <DropdownButton
            id="dropdown-details"
            title={selectedCinema || "Select cinema"}
            className="mb-2 "
          >
            {uniqueCinemas.map((cinema, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectCinema(cinema))}
              >
                <p className="m-0 p-0">{cinema}</p>
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-details"
            title={selectedCity || "Select city"}
            className="mb-2 "
            disabled={!selectedCinema}
          >
            {uniqueCities.map((city, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectCity(city))}
              >
                <p className="m-0 p-0"> {city}</p>
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-details"
            title={selectedDay || "Select show day"}
            className="mb-2 "
            disabled={!selectedCity}
          >
            {uniqueDates.map((date, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectDay(date))}
              >
                <p className="m-0 p-0">{date}</p>
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-details"
            title={selectedTime || "Select show time"}
            className="mb-2 "
            disabled={!selectedDay}
          >
            {uniqueTimes.map((time, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectTime(time))}
              >
                <p className="m-0 p-0">{time}</p>
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button
            onClick={handleNavigate}
            disabled={
              !selectedCinema || !selectedCity || !selectedDay || !selectedTime
            }
            className="book-ticket-but mb-3 mt-1"
          >
            Book ticket
          </Button>
          {errorMessage && (
            <Alert variant="danger" className=" alert-booking">
              {errorMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </>
  );
};

export default BookTicket;
