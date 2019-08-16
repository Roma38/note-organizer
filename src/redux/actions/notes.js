export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_LABEL = "ADD_LABEL";

export const addNote = payload => ({
  type: ADD_NOTE,
  payload // {id, title, text, color, labels = [], categories = [], wasAdded = new Date}
});

export const editNote = payload => ({
  type: EDIT_NOTE,
  payload // {id, title, text, color, wasUpdated = new Date}
});

export const deleteNote = payload => ({
  type: DELETE_NOTE,
  payload // id
});

export const addCategory = payload => ({
  type: ADD_CATEGORY,
  payload // {id, categoryId}
});

export const addLabel = payload => ({
  type: ADD_LABEL,
  payload // {id, labelId}
});
