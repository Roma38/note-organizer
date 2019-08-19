import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

import { HeaderComponent as Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { AddNoteCard } from "./components/AddNoteCard";
import { NoteCard } from "./components/NoteCard";

function App() {
  const notes = useSelector(state => state.notes);

  return (
    <Container>
      <Header />
      <Grid divided>
        <Grid.Row>
          <Grid.Column as="aside" width={4}>
            <Sidebar />
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
    </Container>
  );
}

export default App;
