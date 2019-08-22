export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const ADD_CATEGORY_TO_NOTE = "ADD_CATEGORY_TO_NOTE";
export const ADD_LABEL_TO_NOTE = "ADD_LABEL_TO_NOTE";

export const addNote = payload => ({
  type: ADD_NOTE,
  payload // {id, title, text, color, labels = [], categories = []}
});

export const editNote = payload => ({
  type: EDIT_NOTE,
  payload // {id, title, text, color}
});

export const deleteNote = payload => ({
  type: DELETE_NOTE,
  payload // id
});

export const addCategory = payload => ({
  type: ADD_CATEGORY_TO_NOTE,
  payload // {id, categoryId}
});

export const addLabel = payload => ({
  type: ADD_LABEL_TO_NOTE,
  payload // {id, labelId}
});
