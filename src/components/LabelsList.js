import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Input, Popup, Form } from "semantic-ui-react";
import { v4 } from "node-uuid";

import { addLabel } from "../redux/actions/labels";
import { setFilter } from "../redux/actions/notesFilter";

export function LabelsList() {
  const [labelName, setLabelName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const labels = useSelector(state => state.labels);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const addLabelHandler = event => {
    event.preventDefault();
    dispatch(addLabel({ id: v4(), name: labelName }));
    setLabelName("");
    setIsPopupOpen(false);
  };

  return (
    <>
      <List link>
        {labels.map(label => (
          <List.Item
            active={filter.type === "labels" && label.id === filter.id}
            key={label.id}
          >
            <span
              onClick={() =>
                dispatch(
                  setFilter({
                    type: "labels",
                    id: label.id
                  })
                )
              }
              className="label-name"
            >
              {label.name}
            </span>
          </List.Item>
        ))}
      </List>
      <Popup
        on="click"
        trigger={<Button basic content="Add label" />}
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onOpen={() => setIsPopupOpen(true)}
      >
        <Form className="category-form" onSubmit={addLabelHandler}>
          <Input
            value={labelName}
            placeholder="Label name"
            onChange={(e, data) => setLabelName(data.value)}
          />
          <div className="button-group">
            <Button
              compact
              type="submit"
              basic
              content="Add"
              disabled={!labelName}
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
    </>
  );
}
