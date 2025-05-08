import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 👈 for Router context
import ProductCarousel from "../components/ProductCarousel"; // Update path if needed

const mockProducts = [
  {
    _id: "1",
    title: "Test Product 1",
    price: 100,
    stock: 10,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    title: "Test Product 2",
    price: 200,
    stock: 5,
    thumbnail: "https://via.placeholder.com/150",
  },
];

describe("ProductCarousel Component", () => {
  const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>); // 👈 helper

  test("renders component with title", () => {
    renderWithRouter(<ProductCarousel name="Featured Products" products={mockProducts} />);
    expect(screen.getByText("Featured Products")).toBeInTheDocument();
  });

  test("renders product list when products are provided", () => {
    renderWithRouter(<ProductCarousel name="Products" products={mockProducts} />);
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("₹100")).toBeInTheDocument();
    expect(screen.getByText("₹200")).toBeInTheDocument();
  });

 
});
