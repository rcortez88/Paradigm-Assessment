import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage"; // Adjust the import to your file structure

describe("ErrorMessage", () => {
  it("displays the error message when an error exists", () => {
    render(<ErrorMessage error="Some error message" />);

    const errorMessageElement = screen.getByText("Some error message");
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("does not render when there is no error", () => {
    const { container } = render(<ErrorMessage error={null} />);

    expect(container.firstChild).toBeNull();
  });
});
