import { ADD_CATEGORY } from "../actions/categories";

const initialState = localStorage.getItem("labels") || [];

export const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY:
      return { ...state, payload }; // {id, name, subCategories = [}]}

    default:
      return state;
  }
};
