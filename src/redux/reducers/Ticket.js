import {
  SELECT_CINEMA,
  SELECT_DAY,
  SELECT_TIME,
  SELECT_SHOW_ID,
  BOOK_TICKET,
  SELECT_CITY,
} from "../actions/actions";

// Initial state for booking-related data
const initialState = {
  selectCinema: null,
  selectCity: null,
  selectDay: null,
  selectTime: null,
  selectShowId: null,
};

const bookingReducers = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CINEMA:
      // Update selected cinema
      return {
        ...state,
        selectCinema: action.payload,
      };
    case SELECT_CITY:
      // Update selected city
      return {
        ...state,
        selectCity: action.payload,
      };

    case SELECT_DAY:
      // Update selected day
      return {
        ...state,
        selectDay: action.payload,
      };

    case SELECT_TIME:
      // Update selected time
      return {
        ...state,
        selectTime: action.payload,
      };
    case BOOK_TICKET:
      // Set the flag indicating a ticket has been booked
      return {
        ...state,
        bookTicket: true,
      };
    case SELECT_SHOW_ID:
      // Update selected show ID
      return {
        ...state,
        selectShowId: action.payload,
      };
    default:
      return state;
  }
};
export default bookingReducers;
