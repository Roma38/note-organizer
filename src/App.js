import React from "react";
import "./App.css";
import { Container, Sidebar as SemanticSidebar } from "semantic-ui-react";
import { Route } from "react-router-dom";

import { HeaderComponent as Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { NotePage } from "./components/NotePage";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <Container className="app">
      <Header />
      {/* <SemanticSidebar className="semanti-sidebar"
        animation="overlay"
        icon="labeled"
        //inverted
        //onHide={this.handleSidebarHide}
        //vertical
        visible={true}
      >
        <SideBar />
      </SemanticSidebar> */}
      <Route exact path="/" component={HomePage} />
      <Route path="/note/:id" component={NotePage} />
    </Container>
  );
}

export default App;
