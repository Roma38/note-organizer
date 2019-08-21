import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "node-uuid";
import { Button, Popup, Input, Icon, Message } from "semantic-ui-react";

import { addCategory } from "../redux/actions/categories";

export function AddSubCategoryPopup({ parentId }) {
  const [categoryName, setCategoryName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const addCategoryHandler = event => {
    event.preventDefault();
    dispatch(addCategory({ id: v4(), name: categoryName, parentId }));
    setCategoryName("");
    setIsPopupOpen(false);
  };

  const iconClickHandler = event => {
    event.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <Popup
        content="Add subcategory"
        trigger={
          <Icon
            className="category__popup"
            onClick={iconClickHandler}
            link
            name={isPopupOpen ? "caret up" : "caret down"}
          />
        }
      />
      {isPopupOpen && (
        <Message
          className="category-form"
          as="form"
          onSubmit={addCategoryHandler}
          onClick={e => e.stopPropagation()}
        >
          <Input
            value={categoryName}
            placeholder="Category name"
            onChange={(e, data) => setCategoryName(data.value)}
          />
          <div className="button-group">
            <Button
              compact
              type="submit"
              basic
              color="blue"
              content="Add"
              disabled={!categoryName}
            />
            <Button
              compact
              basic
              color="blue"
              content="Cancel"
              onClick={e => setIsPopupOpen(false)}
            />
          </div>
        </Message>
      )}
    </>
  );
}
