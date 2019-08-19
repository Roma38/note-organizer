import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Input, Popup } from "semantic-ui-react";
import { v4 } from "node-uuid";

import {addLabel} from "../redux/actions/labels"


export function LabelsList() {
  const [labelName, setLabelName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const labels = useSelector(state => state.labels);

  const dispatch = useDispatch();

  const addLabelHandler = e => {
    e.preventDefault();
    dispatch(addLabel({ id: v4(), name: labelName }));
    setLabelName("");
  };
  
  return (
    <>
      <List>
        {labels.map(label => (
          <List.Item key={label.id}>{label.name}</List.Item>
        ))}
      </List>
      <Popup
        on="click"
        trigger={<Button basic color="blue" content="Add label" />}
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onOpen={() => setIsPopupOpen(true)}
      >
        <form onSubmit={addLabelHandler}>
          <Input
            value={labelName}
            placeholder="Category name"
            onChange={(e, data) => setLabelName(data.value)}
          />
          <Button basic color="blue" content="Add" disabled={!labelName} />
        </form>
      </Popup>
    </>
  );
}
