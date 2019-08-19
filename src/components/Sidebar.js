import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Popup, Input, Icon } from "semantic-ui-react";

import { AddCategoryPopup } from "./AddCategoryPopup";
import { AddSubCategoryPopup } from "./AddSubCategoryPopup";

export function Sidebar() {
  const categories = useSelector(state => state.categories);

  const recursion = (category, categories) => {
    return (
      <List.Item key={category.id}>
        <List.Icon name="folder" />
        <List.Content className="category">
          {category.name}
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
  };

  return (
    <List>
      {categories
        .filter(category => !category.hasOwnProperty("parentId"))
        .map(category => {
          return (
            <List.Item key={category.id}>
              <List.Content className="category">
                {category.name}
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
