export const ADD_NOTE = "ADD_NOTE";

export const addNote = payload => ({
  type: ADD_NOTE,
  payload   // {id, title, text, color, labels = [], categories = [], wasAdded = new Date}
});
