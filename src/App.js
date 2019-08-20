import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";

import { HeaderComponent as Header } from "./components/Header";
import {HomePage} from "./components/HomePage";
import { NotePage } from "./components/NotePage";
import { SideBar } from "./components/SideBar";
import { AddNoteCard } from "./components/AddNoteCard";
import { NoteCard } from "./components/NoteCard";

function App() {
  const notes = useSelector(state => state.notes);

  return (
    <Container>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route path="/note/:id" component={NotePage} />
    </Container>
  );
}

export default App;
