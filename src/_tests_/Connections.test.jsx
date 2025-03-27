import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Connections from "../pages/Connections";

describe("Connections Component", () => {
  test("renders People You May Know", () => {
    render(<Connections />);
    expect(screen.getByText(/People You May Know/i)).toBeInTheDocument();
  });

  
});
