import { combineReducers } from "redux";
import { notesReducer } from "./notes";
import { categoriesReducer } from "./categories";
import { labelsReducer } from "./labels";

const rootReduser = combineReducers({
  notes: notesReducer,
  categories: categoriesReducer,
  labels: labelsReducer
});

export default rootReduser;
