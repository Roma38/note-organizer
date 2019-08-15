import { ADD_LABEL } from "../actions/labels";

const initialState = localStorage.getItem("labels") || [];

export const labelsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LABEL:
      return { ...state, payload }; // {id, name}

    default:
      return state;
  }
};
