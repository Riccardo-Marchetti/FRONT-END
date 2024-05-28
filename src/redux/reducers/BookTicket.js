import { SELECT_SEAT, DESELECT_SEAT, BOOK_TICKET } from "../actions/actions";

// Initial state for ticket-related data
const initialState = {
  selectCinema: null,
  selectCity: null,
  selectDay: null,
  selectTime: null,
  selectedSeats: [],
  bookedTicket: null,
};

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SEAT:
      // Add selected seat to the array of selected seats
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case DESELECT_SEAT:
      // Remove deselected seat from the array of selected seats
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(
          (seat) => seat.seatId !== action.payload
        ),
      };
    case BOOK_TICKET:
      // Update booked ticket data
      return {
        ...state,
        bookedTicket: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
