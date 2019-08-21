import React from "react";
import { Header } from "semantic-ui-react";

import { CategoriesList } from "./CategoriesList";
import { LabelsList } from "./LabelsList";

export function SideBar() {
  return (
    <>
      <Header as="h2" content="Categories" />
      <CategoriesList />
      <Header as="h2" content="Labels" />
      <LabelsList />
    </>
  );
}
