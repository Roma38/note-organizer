import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "node-uuid";
import { Button, Popup, Input, Icon } from "semantic-ui-react";

import { addCategory } from "../redux/actions/categories";

export function AddSubCategoryPopup({ parentId }) {
  const [categoryName, setCategoryName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const addCategoryHandler = e => {
    e.preventDefault();
    dispatch(addCategory({ id: v4(), name: categoryName, parentId }));
    setCategoryName("");
    setIsPopupOpen(false);
  };

  return (
    <>
      <Popup
        content="Add subcategory"
        trigger={
          <Icon
            className="category__popup"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            link
            name={isPopupOpen ? "caret up" : "caret down"}
          />
        }
      />
      {isPopupOpen && (
        <form onSubmit={addCategoryHandler}>
          <Input
            value={categoryName}
            placeholder="Category name"
            onChange={(e, data) => setCategoryName(data.value)}
          />
          <Button basic color="blue" content="Add" disabled={!categoryName} />
        </form>
      )}
    </>
  );
}
