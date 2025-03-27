import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../components/Post";

const mockPost = {
  id: 1,
  user: "John Doe",
  profilePic: "/images/john.jpg",
  content: "Hello World!",
  likes: 0,
  comments: [],
};

describe("Post Component", () => {
  test("renders post correctly", () => {
    render(<Post post={mockPost} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello World!/i)).toBeInTheDocument();
  });

  test("increments like count on click", () => {
    render(<Post post={mockPost} />);
    const likeButton = screen.getByText(/👍 Like/i);
    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent("1");
  });

  test("opens comment modal and adds comment", () => {
    render(<Post post={mockPost} />);
    fireEvent.click(screen.getByText(/💬 Comment/i));
    fireEvent.change(screen.getByPlaceholderText(/Write a comment/i), { target: { value: "Nice post!" } });
    fireEvent.click(screen.getByText(/Add Comment/i));
    expect(screen.getByText(/Nice post!/i)).toBeInTheDocument();
  });

  
});
