import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SuccessMessage from "../SuccessMessage";

describe("SuccessMessage", () => {
  it("renders with the correct title and content when open is true", () => {
    const onClose = jest.fn();

    render(<SuccessMessage open={true} onClose={onClose} />);

    const title = screen.getByText("Registration Successful");
    const content = screen.getByText(
      "Your account has been successfully created."
    );
    const closeButton = screen.getByText("Close");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    const onClose = jest.fn();

    render(<SuccessMessage open={false} onClose={onClose} />);

    const title = screen.queryByText("Registration Successful");
    const content = screen.queryByText(
      "Your account has been successfully created."
    );
    const closeButton = screen.queryByText("Close");

    expect(title).toBeNull();
    expect(content).toBeNull();
    expect(closeButton).toBeNull();
  });

  it("calls onClose when the Close button is clicked", () => {
    const onClose = jest.fn();

    render(<SuccessMessage open={true} onClose={onClose} />);

    const closeButton = screen.getByText("Close");

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
