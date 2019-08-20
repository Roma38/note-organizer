import React, { useState } from "react";
import {
  Header,
  Container,
  Segment,
  Divider,
  Icon,
  Label,
  Button,
  Input,
  Dropdown
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { editNote } from "../redux/actions/notes";
import { generateCategoryOptions } from "../utils";
import { colorOptions } from "../constants";
import { NoteCategoriesList } from "./NoteCategoriesList";

export function NotePage({ match }) {
  const note = useSelector(state =>
    state.notes.find(note => note.id === match.params.id)
  );
  const labelsJSON = useSelector(state => state.labels);
  const categoriesJSON = useSelector(state => state.categories);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [color, setColor] = useState(note.color);
  const [categories, setCategories] = useState(note.categories);
  const [labels, setLabels] = useState(note.labels);
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    dispatch(editNote({ id: note.id, title, text, color, categories, labels }));
    setIsEditing(false);
  };

  return (
    <Container text>
      <Segment color={note.color} textAlign="center">
        <Header as="h2" textAlign="center">
          {isEditing ? (
            <Input
              value={title}
              placeholder="Title"
              onChange={(e, data) => setTitle(data.value)}
            />
          ) : (
            note.title
          )}
        </Header>
        {isEditing ? (
          <Input                        // TODO наверное, нужно использовать textarea
            value={text}
            placeholder="Text"
            onChange={(e, data) => setText(data.value)}
          />
        ) : (
          <p>{note.text}</p>
        )}
        {(note.categories.length > 0 || note.labels.length || isEditing) >
          0 && (
          <Divider horizontal>
            <Icon name="tag" size="massive" />
          </Divider>
        )}
        {(isEditing || note.categories.length > 0) && (
          <Header as="h4" textAlign="center" content="Categories:" />
        )}
        {isEditing ? (
          <Dropdown
            placeholder="Category"
            
            multiple
            search
            selection
            options={generateCategoryOptions(categoriesJSON)}
            value={categories}
            onChange={(e, data) => setCategories(data.value)}
          />
        ) : (
          note.categories.length > 0 && (
            <NoteCategoriesList noteCategories={note.categories} />
          )
        )}
        {(isEditing || note.labels.length > 0) && (
          <Header as="h4" textAlign="center" content="Labels:" />
        )}
        {isEditing ? (
          <Dropdown
            placeholder="Label"
            
            multiple
            selection
            options={labelsJSON.map(label => ({
              key: label.id,
              text: label.name,
              value: label.id
            }))}
            value={labels}
            onChange={(e, data) => setLabels(data.value)}
          />
        ) : (
          note.labels.length > 0 &&
          note.labels.map(labelId => (
            <Label
              key={labelId}
              as="a"
              color={note.color}
              content={labelsJSON.find(label => label.id === labelId).name}
              tag
            />
          ))
        )}
        <Header as="h4" textAlign="center" content="Color:" />
        <Dropdown
          value={color}
          options={colorOptions}
          selection
          labeled
          placeholder="Color"
          onChange={(e, data) => setColor(data.value)}
        />
        <Divider />
        {isEditing && (
          <Button
            onClick={handleSaveChanges}
            color={note.color}
            basic
            content="Save"
          />
        )}
        <Button
          onClick={() => setIsEditing(!isEditing)}
          color={note.color}
          basic={!isEditing}
          content={isEditing ? "Cancel" : "Edit note"}
        />
        <Button
          as={Link}
          to="/"
          color={note.color}
          content="Back to Home page"
        />
      </Segment>
    </Container>
  );
}
