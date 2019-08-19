import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "node-uuid";
import { Button, Popup, Input } from "semantic-ui-react";

import { addCategory } from "../redux/actions/categories";

export function AddCategoryPopup() {
  const [categoryName, setCategoryName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const addCategoryHandler = e => {
    e.preventDefault();
    dispatch(addCategory({ id: v4(), name: categoryName }));
    setCategoryName("");
    setIsPopupOpen(false);
  };

  return (
    <Popup
      on="click"
      trigger={<Button basic color="blue" content="Add category" />}
      open={isPopupOpen}
      onClose={() => setIsPopupOpen(false)}
      onOpen={() => setIsPopupOpen(true)}
    >
      <form onSubmit={addCategoryHandler}>
        <Input
          value={categoryName}
          placeholder="Category name"
          onChange={(e, data) => setCategoryName(data.value)}
        />
        <Button basic color="blue" content="Add" />
      </form>
    </Popup>
  );
}
