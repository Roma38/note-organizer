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
  Dropdown,
  TextArea,
  Form
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

  const saveChangesHandler = () => {
    dispatch(editNote({ id: note.id, title, text, color, categories, labels }));
    setIsEditing(false);
  };

  return (
    <Container text textAlign="center">
      <Segment
        as={Form}
        onSubmit={saveChangesHandler}
        color={note.color}
        textAlign="center"
      >
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
          <TextArea
            value={text}
            placeholder="Text"
            onChange={(e, data) => setText(data.value)}
          />
        ) : (
          <p>{note.text}</p>
        )}
        {(note.categories.length || note.labels.length || isEditing) && (
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
              color={note.color}
              content={labelsJSON.find(label => label.id === labelId).name}
              tag
            />
          ))
        )}
        <Header as="h4" textAlign="center" content="Color:" />
        {isEditing ? (
          <Dropdown
            value={color}
            options={colorOptions}
            selection
            labeled
            placeholder="Color"
            onChange={(e, data) => setColor(data.value)}
          />
        ) : (
          <>
            {note.color}
            <Label circular color={note.color} empty />
          </>
        )}

        <Divider />
        {isEditing && (
          <Button type="submit" color={note.color} basic content="Save" />
        )}
        <Button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          color={note.color}
          basic={!isEditing}
          content={isEditing ? "Cancel" : "Edit note"}
        />
      </Segment>
      <Button
        as={Link}
        to="/"
        color={note.color}
        icon="arrow left"
        content="Back to Home page"
      />
    </Container>
  );
}
