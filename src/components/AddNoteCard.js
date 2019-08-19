import React, { useState } from "react";
import { Button, Card } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "node-uuid";

import { addNote } from "../redux/actions/notes";
import { options as colorOptions } from "../constants";


export function AddNoteCard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState();
  const [noteCategories, setNoteCategories] = useState([]);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const categoriesOptions = [];

  const recursion = subCategories => {
    subCategories.forEach(subCategoryId => {
      const subCategory = categories.find(
        category => category.id === subCategoryId
      );
      categoriesOptions.push({
        key: subCategory.id,
        text: subCategory.name,
        value: subCategory.id
      });
      if (subCategory.hasOwnProperty("subCategories")) {
        recursion(subCategory.subCategories);
      }
    });
  };

  const categoryList = () => {
    categories
      .filter(category => !category.hasOwnProperty("parentId"))
      .forEach(category => {
        categoriesOptions.push({
          key: category.id,
          text: category.name,
          value: category.id
        });
        if (category.hasOwnProperty("subCategories")) {
          recursion(category.subCategories);
        }
      });
    return categoriesOptions;
  };

  const addNoteHandler = () => {
    dispatch(
      addNote({ id: v4(), title, text, color, categories: noteCategories })
    );
    setTitle("");
    setText("");
    setNoteCategories([]);
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
            placeholder="Color"
            onChange={(e, data) => setColor(data.value)}
          />
          <Dropdown
            placeholder="Category"
            fluid
            multiple
            search
            selection
            options={categoryList()}
            value={noteCategories}
            onChange={(e, data) => setNoteCategories(data.value)}
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
