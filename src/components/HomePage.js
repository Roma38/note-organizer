import React from "react";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

import { SideBar } from "./SideBar";
import { AddNoteCard } from "./AddNoteCard";
import { NoteCard } from "./NoteCard";

export function HomePage() {
  const notes = useSelector(state => state.notes);

  return (
    <Grid divided>
      <Grid.Row>
        <Grid.Column as="aside" width={4}>
          <SideBar />
        </Grid.Column>
        <Grid.Column as="main" width={12}>
          <Card.Group>
            <AddNoteCard />
            {notes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
