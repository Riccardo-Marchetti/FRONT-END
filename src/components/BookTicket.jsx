import { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCinema,
  selectCity,
  selectDay,
  selectTime,
  selectShowId,
} from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
const BookTicket = ({ show, convertiData }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const selectedCinema = useSelector((state) => state.ticket.selectCinema);
  const selectedCity = useSelector((state) => state.ticket.selectCity);
  const selectedDay = useSelector((state) => state.ticket.selectDay);
  const selectedTime = useSelector((state) => state.ticket.selectTime);
  // const ticketBooked = useSelector((state) => state.ticket.bookTicket);

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
        "Non ci sono spettacoli disponibili che corrispondono ai tuoi criteri di ricerca."
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
      <Row>
        <Col>
          <h3>Book your show now</h3>
          <DropdownButton
            id="dropdown-cinema"
            title={selectedCinema || "Select cinema"}
          >
            {uniqueCinemas.map((cinema, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectCinema(cinema))}
              >
                {cinema}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-city"
            title={selectedCity || "Select city"}
          >
            {uniqueCities.map((city, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectCity(city))}
              >
                {city}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-day"
            title={selectedDay || "Select show day"}
          >
            {uniqueDates.map((date, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectDay(date))}
              >
                {date}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-time"
            title={selectedTime || "Select show time"}
          >
            {uniqueTimes.map((time, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => dispatch(selectTime(time))}
              >
                {time}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <button onClick={handleNavigate}>Prenota biglietto</button>
        </Col>
      </Row>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default BookTicket;
