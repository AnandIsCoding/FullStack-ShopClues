import { render } from "@testing-library/react";
import SearchResultTab from "../components/SearchResultTab";
import { MemoryRouter } from "react-router-dom";
import React from "react";
test("renders SearchResultTab without crashing", () => {
  render(
    <MemoryRouter>
      <SearchResultTab search="" setSearch={() => {}} />
    </MemoryRouter>
  );
});
