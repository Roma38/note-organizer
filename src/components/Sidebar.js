import React from "react";
import { Header, Button } from "semantic-ui-react";

import { CategoriesList } from "./CategoriesList";
import { LabelsList } from "./LabelsList";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/actions/notesFilter";

export function SideBar() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const removeFilterHandler = () => dispatch(setFilter({}));

  return (
    <>
      {filter.type && (
        <Button
          basic
          color="blue"
          content="Remove filter"
          onClick={removeFilterHandler}
        />
      )}
      <Header as="h2" content="Categories" />
      <CategoriesList />
      <Header as="h2" content="Labels" />
      <LabelsList />
    </>
  );
}
