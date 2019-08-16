import {
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  ADD_CATEGORY,
  ADD_LABEL
} from "../actions/notes";

const initialState = localStorage.getItem("notes") || [];

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return [...state, payload];
    case EDIT_NOTE:
      let index = state.findIndex(({ id }) => id === payload.id);
      let newState = [...state];
      newState[index] = { ...state[index], ...payload }; // можно ли так делать?
      return newState;
    case DELETE_NOTE:
      return state.filter(({ id }) => id !== payload);
    case ADD_CATEGORY:
      index = state.findIndex(({ id }) => id === payload.id); // наверное, можно как-то лучше сделать
      newState = [...state];
      newState[index] = {
        ...state[index],
        categories: [...state[index].categories, payload.categoryId]
      };
      return newState;
    case ADD_LABEL:
      index = state.findIndex(({ id }) => id === payload.id);
      newState = [...state];
      newState[index] = {
        ...state[index],
        labels: [...state[index].labels, payload.labelId]
      };
      return newState;

    default:
      return state;
  }
};
