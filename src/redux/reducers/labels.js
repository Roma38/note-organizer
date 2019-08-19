import { ADD_LABEL } from "../actions/labels";
import {defaultLabels} from "../../constants"

const initialState = defaultLabels;

export const labelsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LABEL:
      return [...state, payload]; // {id, name}

    default:
      return state;
  }
};
