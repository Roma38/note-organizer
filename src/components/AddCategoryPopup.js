import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "node-uuid";
import { Button, Popup, Input, Form } from "semantic-ui-react";

import { addCategory } from "../redux/actions/categories";

export function AddCategoryPopup() {
  const [categoryName, setCategoryName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const addCategoryHandler = event => {
    event.preventDefault();
    dispatch(addCategory({ id: v4(), name: categoryName }));
    setCategoryName("");
    setIsPopupOpen(false);
  };

  return (
    <Popup
      on="click"
      trigger={<Button basic content="Add category" />}
      open={isPopupOpen}
      onClose={() => setIsPopupOpen(false)}
      onOpen={() => setIsPopupOpen(true)}
    >
      <Form
        className="category-form"
        onSubmit={addCategoryHandler}
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
            content="Add"
            disabled={!categoryName}
          />
          <Button
            compact
            basic
            content="Cancel"
            onClick={() => setIsPopupOpen(false)}
          />
        </div>
      </Form>
    </Popup>
  );
}
