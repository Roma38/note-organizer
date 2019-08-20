import { SET_FILTER } from "../actions/notesFilter";

const initialState = {};

export const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FILTER:
      return payload; // {type, id}

    default:
      return state;
  }
};
