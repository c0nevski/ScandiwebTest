import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../components";
import mockStore from "./setup/mockReduxStore";

afterAll(cleanup);

const reunderWithRedux = (component) => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("Header tests", () => {
  it("should contain HOME menu item", () => {
    reunderWithRedux(<Header />);
    const homeMenuItem = screen.getByText(/home/i);
    expect(homeMenuItem).toBeInTheDocument();
  });

  it("should contain Clothes menu item", () => {
    reunderWithRedux(<Header />);
    const clothesCategoryMenuItem = screen.getByText(/clothes/i);
    expect(clothesCategoryMenuItem).toBeInTheDocument();
  });

  it("should contain Tech menu item", () => {
    reunderWithRedux(<Header />);
    const techCategoryMenuItem = screen.getByText(/tech/i);
    expect(techCategoryMenuItem).toBeInTheDocument();
  });
});
