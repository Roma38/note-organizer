export const ADD_LABEL = "ADD_LABEL";

export const addLabel = payload => ({
  type: ADD_LABEL,
  payload   // {id, name}
});
