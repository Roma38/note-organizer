import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List } from "semantic-ui-react";

import { AddCategoryPopup } from "./AddCategoryPopup";
import { AddSubCategoryPopup } from "./AddSubCategoryPopup";
import { setFilter } from "../redux/actions/notesFilter";

export function CategoriesList() {
  const categories = useSelector(state => state.categories);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const setFilterHandler = (event, id) => {
    event.stopPropagation();
    dispatch(
      setFilter({
        type: "categories",
        id
      })
    );
  };

  const recursion = (category, categories) => {
    return (
      <List.Item
        active={filter.type === "categories" && category.id === filter.id}
        key={category.id}
      >
        <List.Icon name="folder" />
        <List.Content className="category">
          <span onClick={e => setFilterHandler(e, category.id)}>
            {category.name}
          </span>
          <AddSubCategoryPopup parentId={category.id} />
          {category.hasOwnProperty("subCategories") && (
            <List.List>
              {category.subCategories.map(subCategoryId =>
                recursion(
                  categories.find(category => category.id === subCategoryId),
                  categories
                )
              )}
            </List.List>
          )}
        </List.Content>
      </List.Item>
    );
  };

  return (
    <List link>
      {categories
        .filter(category => !category.hasOwnProperty("parentId"))
        .map(category => {
          return (
            <List.Item
              key={category.id}
              active={filter.type === "categories" && category.id === filter.id}
            >
              <List.Icon name="folder" />
              <List.Content className="category">
                <span onClick={event => setFilterHandler(event, category.id)}>
                  {category.name}
                </span>
                <AddSubCategoryPopup parentId={category.id} />
                {category.hasOwnProperty("subCategories") && (
                  <List.List>
                    {category.subCategories.map(subCategoryId =>
                      recursion(
                        categories.find(
                          category => category.id === subCategoryId
                        ),
                        categories
                      )
                    )}
                  </List.List>
                )}
              </List.Content>
            </List.Item>
          );
        })}
      <AddCategoryPopup />
    </List>
  );
}
