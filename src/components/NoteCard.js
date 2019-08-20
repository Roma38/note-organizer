import React from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setFilter } from "../redux/actions/notesFilter";

export function NoteCard(props) {
  const labels = useSelector(state => state.labels);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const { note } = props;

  const renderLabel = labelId => {
    const label = labels.find(label => label.id === labelId);
    return (
      <Label
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

  return (
    <Card color={note.color}>
      <Card.Content>
        <Card.Header>{note.title}</Card.Header>
        <Card.Description>{note.text}</Card.Description>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        {note.labels.length > 0 &&
          note.labels.map(labelId => renderLabel(labelId))}
        <Button as={Link} color={note.color} to={"/note/" + note.id}>
          Note details
        </Button>
      </Card.Content>
    </Card>
  );
}
