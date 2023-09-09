import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../../App";

// Mock the actual RegistrationForm component
jest.mock("../RegistrationForm", () => {
  return function MockedRegistrationForm() {
    return (
      <div data-testid="mocked-registration-form">Mocked Registration Form</div>
    );
  };
});

describe("App component", () => {
  it("renders and contains the mocked RegistrationForm component", () => {
    render(<App />);
    const registrationFormElement = screen.getByTestId(
      "mocked-registration-form"
    );
    expect(registrationFormElement).toBeInTheDocument();
  });
});
