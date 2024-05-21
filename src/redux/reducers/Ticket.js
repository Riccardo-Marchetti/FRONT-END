import {
  SELECT_CINEMA,
  SELECT_DAY,
  SELECT_TIME,
  SELECT_SHOW_ID,
  BOOK_TICKET,
  SELECT_CITY,
} from "../actions/actions";

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
      return {
        ...state,
        selectCinema: action.payload,
      };
    case SELECT_CITY:
      return {
        ...state,
        selectCity: action.payload,
      };

    case SELECT_DAY:
      return {
        ...state,
        selectDay: action.payload,
      };

    case SELECT_TIME:
      return {
        ...state,
        selectTime: action.payload,
      };
    case BOOK_TICKET:
      return {
        ...state,
        bookTicket: true,
      };
    case SELECT_SHOW_ID:
      return {
        ...state,
        selectShowId: action.payload,
      };

    default:
      return state;
  }
};
export default bookingReducers;
