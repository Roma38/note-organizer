import { v4 } from "node-uuid";

export const colorOptions = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "grey",
  "black"
].map((color, index) => ({
  key: index,
  text: color,
  value: color,
  label: { color, empty: true, circular: true }
}));

export const defaultLabels = [
  { id: v4(), name: "Label_1" },
  { id: v4(), name: "Label_2" },
  { id: v4(), name: "Label_3" }
];
