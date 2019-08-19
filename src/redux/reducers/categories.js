import { ADD_CATEGORY } from "../actions/categories";

const initialState = [];

export const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY: {
      const newState = [...state, payload];
      if (payload.parentId) {
        const index = state.findIndex(({ id }) => id === payload.parentId);
        newState[index] = {
          ...state[index],
          subCategories: state[index].subCategories
            ? [...state[index].subCategories, payload.id]
            : [payload.id]
        };
      }
      return newState; // {id, name, parentId}
    }
    default:
      return state;
  }
};
