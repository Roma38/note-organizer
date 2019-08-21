import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Grid } from "semantic-ui-react";

import { SideBar } from "./SideBar";
import { AddNoteCard } from "./AddNoteCard";
import { NoteCard } from "./NoteCard";
import { setFilter } from "../redux/actions/notesFilter";

export function HomePage() {
  const notes = useSelector(state => state.notes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const removeFilterHandler = () => dispatch(setFilter({}));

  return (
    <Grid divided className="wrapper">
      <Grid.Row className="wrapper">
        <Grid.Column as="aside" width={4} className="wrapper">
          <SideBar />
        </Grid.Column>
        <Grid.Column as="main" width={12} className="wrapper">
          {filter.type && (
            <Button
              className="remove-filter-button"
              //color="blue"
              content="Remove filter"
              onClick={removeFilterHandler}
            />
          )}
          <Card.Group>
            <AddNoteCard />
            {notes
              .filter(note =>
                filter.type ? note[filter.type].includes(filter.id) : true
              ) //TODO сделать чтоб подкатегории не отфильтровывались
              .map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
