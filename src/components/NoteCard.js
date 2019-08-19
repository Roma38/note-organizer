import React from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";

export function NoteCard(props) {
  const labels = useSelector(state => state.labels);
  const { note } = props;

  const renderLabel = labelId => {
    const label = labels.find(label => label.id === labelId);
    return (
      <Label
        key={label.id}
        as="a"
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
      <Card.Content extra>
        {note.labels.length > 0 &&
          note.labels.map(labelId => renderLabel(labelId))}
        <Button basic color="blue">
          Note details
        </Button>
      </Card.Content>
    </Card>
  );
}
