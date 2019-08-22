import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Grid } from "semantic-ui-react";

import { SideBar } from "./SideBar";
import { AddNoteCard } from "./AddNoteCard";
import { NoteCard } from "./NoteCard";
import { setFilter } from "../redux/actions/notesFilter";
import { filterNotes } from "../utils";

export function HomePage() {
  const notes = useSelector(state => state.notes);
  const filter = useSelector(state => state.filter);
  const categories = useSelector(state => state.categories);
  const filteredNotes = filterNotes(notes, filter, categories);
  const dispatch = useDispatch();

  const removeFilterHandler = () => dispatch(setFilter({}));

  return (
    <Grid divided>
      <Grid.Row className="grid-row">
        <Grid.Column as="aside" width={4}>
          <SideBar />
        </Grid.Column>
        <Grid.Column as="main" width={12}>
          {filter.type && (
            <Button
              className="remove-filter-button"
              content="Remove filter"
              onClick={removeFilterHandler}
            />
          )}
          <Card.Group>
            <AddNoteCard />
            {filteredNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
