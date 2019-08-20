import { combineReducers } from "redux";
import { notesReducer } from "./notes";
import { categoriesReducer } from "./categories";
import { labelsReducer } from "./labels";
import { filterReducer } from "./notesFilter";

const rootReduser = combineReducers({
  notes: notesReducer,
  categories: categoriesReducer,
  labels: labelsReducer,
  filter: filterReducer
});

export default rootReduser;
