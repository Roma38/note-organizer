import React from "react";
import { Button, Card, Label, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setFilter } from "../redux/actions/notesFilter";
import { deleteNote } from "../redux/actions/notes";

export function NoteCard(props) {
  const labels = useSelector(state => state.labels);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const { note } = props;

  const renderLabel = labelId => {
    const label = labels.find(label => label.id === labelId);
    return (
      <Label
        className="label-tag"
        key={label.id}
        as="a"
        onClick={() =>
          dispatch(
            setFilter({
              type: "labels",
              id: label.id
            })
          )
        }
        active={filter.type === "labels" && label.id === filter.id}
        color={note.color}
        content={label.name}
        tag
      />
    );
  };

  const deleteHandle = id =>
    // eslint-disable-next-line no-restricted-globals
    confirm("Are you sure want to delete this card?")
      ? dispatch(deleteNote(note.id))
      : null;

  return (
    <Card color={note.color}>
      <Card.Content>
        <Card.Header textAlign="center">
          {note.title}
          <Icon
            className="delete-icon"
            name="delete"
            link
            title="Delete card"
            onClick={() => deleteHandle(note.id)}
          />
        </Card.Header>
        <Card.Description textAlign="left">{note.text}</Card.Description>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        {note.labels.length > 0 && (
          <div>{note.labels.map(labelId => renderLabel(labelId))}</div>
        )}
        <Button as={Link} color={note.color} to={"/note/" + note.id}>
          Note details
        </Button>
      </Card.Content>
    </Card>
  );
}
