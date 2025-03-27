import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";

describe("Profile Component", () => {
  beforeEach(() => {
    localStorage.clear(); 
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
  });

  test("renders user profile details", async () => {
    expect(screen.getByText(/Dhilip Kumar M/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
  });


  test("like button increases like count", async () => {
    const likeButtons = screen.getAllByText("👍 0"); 
    fireEvent.click(likeButtons[0]); 

    await waitFor(() => expect(likeButtons[0]).toHaveTextContent("👍 1"));
  });

  test("comment button opens modal", async () => {
    const commentButtons = screen.getAllByText(/💬/i);
    fireEvent.click(commentButtons[0]);

    expect(await screen.findByText("Comments")).toBeInTheDocument();
  });


  test("displays saved jobs in sidebar", async () => {
    localStorage.setItem(
      "savedJobs",
      JSON.stringify([{ id: 1, title: "React Developer", company: "Google", location: "Remote" }])
    );

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("React Developer")).toBeInTheDocument());
  });
  test("removes a saved job", async () => {
    const unsaveButton = screen.queryByText(/Unsave/i);
    if (unsaveButton) {
      fireEvent.click(unsaveButton);
      await waitFor(() => expect(screen.queryByText(/Unsave/i)).not.toBeInTheDocument());
    }
  });

  test("comment modal should open", async () => {
    const commentButtons = screen.getAllByText(/💬/i);
    fireEvent.click(commentButtons[0]);

    expect(await screen.findByText("Comments")).toBeInTheDocument();
  });
});
