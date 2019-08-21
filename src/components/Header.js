import React from "react";
import { Header } from "semantic-ui-react";

export function HeaderComponent() {
  return (
    <header className="header">
      <Header as="h1" textAlign="center">Note organizer</Header>
    </header>
  );
}