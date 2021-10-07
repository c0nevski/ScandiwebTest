import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("Header test", () => {
  test("should contain WOMEN category menu item", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const womenCatMenuItem = screen.getByText('WOMEN');
    expect(womenCatMenuItem).toBeInTheDocument();
  });

  test("should contain MEN category menu item", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const menCatMenuItem = screen.getByText('MEN');
    expect(menCatMenuItem).toBeInTheDocument();
  });

  test("should contain KIDS category menu item", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const kidsCatMenuItem = screen.getByText('KIDS');
    expect(kidsCatMenuItem).toBeInTheDocument();
  });
});
