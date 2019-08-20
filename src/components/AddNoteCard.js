import React, { useState } from "react";
import { Button, Card } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "node-uuid";

import { addNote } from "../redux/actions/notes";
import { colorOptions } from "../constants";
import { generateCategoryOptions } from "../utils";

export function AddNoteCard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState();
  const [noteCategories, setNoteCategories] = useState([]);
  const [noteLabels, setNoteLabels] = useState([]);
  const categories = useSelector(state => state.categories);
  const labels = useSelector(state => state.labels);
  const dispatch = useDispatch();

  const addNoteHandler = () => {
    dispatch(
      addNote({
        id: v4(),
        title,
        text,
        color,
        labels: noteLabels,
        categories: noteCategories
      })
    );
    setTitle("");
    setText("");
    setColor(null);
    setNoteCategories([]);
    setNoteLabels([]);
  };

  return (
    <Card color={color}>
      <Card.Content>
        <Card.Header>
          <Input
            value={title}
            placeholder="Title"
            fluid
            onChange={(e, data) => setTitle(data.value)}
          />
        </Card.Header>
        <Card.Description>
          <Input
            value={text}
            placeholder="Text"
            fluid
            onChange={(e, data) => setText(data.value)}
          />
          <Dropdown
            value={color}
            options={colorOptions}
            selection
            fluid
            labeled
            placeholder="Color"
            onChange={(e, data) => setColor(data.value)}
          />
          <Dropdown
            placeholder="Category"
            fluid
            multiple
            search
            selection
            options={generateCategoryOptions(categories)}
            value={noteCategories}
            onChange={(e, data) => setNoteCategories(data.value)}
          />
          <Dropdown
            placeholder="Label"
            fluid
            multiple
            selection
            options={labels.map(label => ({
              key: label.id,
              text: label.name,
              value: label.id
            }))}
            value={noteLabels}
            onChange={(e, data) => setNoteLabels(data.value)}
          />
        </Card.Description>
      </Card.Content>
      {/* {id, title, text, color, labels = [], categories = [], wasAdded = new Date} */}
      <Card.Content extra>
        <Button
          disabled={text ? false : true}
          basic
          color="blue"
          onClick={addNoteHandler}
        >
          Add Note
        </Button>
      </Card.Content>
    </Card>
  );
}
