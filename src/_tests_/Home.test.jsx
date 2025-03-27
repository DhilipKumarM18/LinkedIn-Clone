import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import Home from "../pages/Home";

describe("Home Component", () => {
  
  test("renders Home Feed heading", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Home Feed/i)).toBeInTheDocument();
  });

  test("renders Navbar", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument(); 
  });

  test("renders Profile Sidebar", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Dhilip Kumar M/i)).toBeInTheDocument();
  });

});
