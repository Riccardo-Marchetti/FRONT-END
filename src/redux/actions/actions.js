export const SELECT_CINEMA = "SELECT_CINEMA";
export const SELECT_DAY = "SELECT_DAY";
export const SELECT_TIME = "SELECT_TIME";
export const BOOK_TICKET = "BOOK_TICKET";
export const BOOK_TICKET_REQUEST = "BOOK_TICKET_REQUEST";
export const BOOK_TICKET_SUCCESS = "BOOK_TICKET_SUCCESS";
export const BOOK_TICKET_FAILURE = "BOOK_TICKET_FAILURE";
export const SELECT_SEAT = "SELECT_SEAT";
export const DESELECT_SEAT = "DESELECT_SEAT";
export const SELECT_SHOW_ID = "SELECT_SHOW_ID";
export const SELECT_CITY = "SELECT_CITY";

// Action creators
export const selectCinema = (cinema) => {
  return {
    type: SELECT_CINEMA,
    payload: cinema,
  };
};
export const selectCity = (city) => {
  return {
    type: SELECT_CITY,
    payload: city,
  };
};

export const selectDay = (day) => {
  return {
    type: SELECT_DAY,
    payload: day,
  };
};

export const selectTime = (time) => {
  return {
    type: SELECT_TIME,
    payload: time,
  };
};
export const selectShowId = (showId) => ({
  type: SELECT_SHOW_ID,
  payload: showId,
});
export const selectSeat = (seatId, rowNumber, seatNumber) => {
  return {
    type: SELECT_SEAT,
    payload: { id: seatId, row: rowNumber, seat: seatNumber },
  };
};
export const deselectSeat = (seatId) => {
  return {
    type: DESELECT_SEAT,
    payload: seatId,
  };
};
export const bookTicket = (ticketData) => ({
  type: BOOK_TICKET,
  payload: ticketData,
});
