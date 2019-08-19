import React from "react";
import { Button, Card } from "semantic-ui-react";

export function NoteCard(props) {
  const { note } = props;
  return (
    <Card color={note.color}>
      <Card.Content>
        <Card.Header>{note.title}</Card.Header>
        {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
        <Card.Description>{note.text}</Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button basic color="blue">Note details</Button>
      </Card.Content>
    </Card>
  );
}
