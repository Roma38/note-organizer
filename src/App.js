import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";

import { HeaderComponent as Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { NotePage } from "./components/NotePage";

function App() {
  return (
    <Container>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route path="/note/:id" component={NotePage} />
    </Container>
  );
}

export default App;
