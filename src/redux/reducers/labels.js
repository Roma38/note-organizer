import { ADD_LABEL } from "../actions/labels";

const initialState = [];

export const labelsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LABEL:
      return { ...state, payload }; // {id, name}

    default:
      return state;
  }
};
