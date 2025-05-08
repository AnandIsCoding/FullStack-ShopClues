import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import appStore from '../redux/appStore'

test("renders Navbar component", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
  const logoElement = screen.getAllByText(/SHOP/i)[0];
  expect(logoElement).toBeInTheDocument();
});
