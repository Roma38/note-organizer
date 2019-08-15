import { ADD_NOTE } from "../actions/notes";

const initialState = localStorage.getItem("notes") || [];

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return { ...state, payload };

    default:
      return state;
  }
};