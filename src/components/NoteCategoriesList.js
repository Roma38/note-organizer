import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";

export function NoteCategoriesList({noteCategories}) {
  const categories = useSelector(state => state.categories);

  return (
    <List bulleted horizontal>
      {noteCategories.map(categoryId => (
        <List.Item key={categoryId}>
          {categories.find(category => category.id === categoryId).name}
        </List.Item>
      ))}
    </List>
  );
}
