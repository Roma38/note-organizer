import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setFilter } from "../redux/actions/notesFilter";
import { deleteNote } from "../redux/actions/notes";

export function NoteCard(props) {
  const labels = useSelector(state => state.labels);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

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

  const deleteHandle = (event, id) => {
    event.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure want to delete this card?"))
      dispatch(deleteNote(id));
  };

  return (
    <Card color={note.color} className="note-card">
      <Card.Content
        as={Link}
        to={"/note/" + note.id}
        title="Note details"
        className="card-content"
      >
        <Card.Header
          textAlign="center"
          className={`card-header ${note.color}-color`}
        >
          {note.title}
          <Icon
            className="delete-icon"
            name="delete"
            link
            title="Delete card"
            onClick={e => deleteHandle(e, note.id)}
          />
        </Card.Header>
        <Card.Description textAlign="left">{note.text}</Card.Description>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        {note.labels.length > 0 && (
          <div>{note.labels.map(labelId => renderLabel(labelId))}</div>
        )}
      </Card.Content>
    </Card>
  );
}
