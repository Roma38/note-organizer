import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  ADD_CATEGORY_TO_NOTE,
  ADD_LABEL_TO_NOTE
} from "../actions/notes";

const initialState = [];

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return [...state, payload];
    case EDIT_NOTE: {
      const index = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[index] = { ...state[index], ...payload };
      return newState;
    }
    case DELETE_NOTE:
      return state.filter(({ id }) => id !== payload);
    case ADD_CATEGORY_TO_NOTE: {
      const index = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[index] = {
        ...state[index],
        categories: [...state[index].categories, payload.categoryId]
      };
      return newState;
    }
    case ADD_LABEL_TO_NOTE: {
      const index = state.findIndex(({ id }) => id === payload.id);
      const newState = [...state];
      newState[index] = {
        ...state[index],
        labels: [...state[index].labels, payload.labelId]
      };
      return newState;
    }
    default:
      return state;
  }
};
