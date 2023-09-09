import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "../RegistrationForm";

jest.mock("../ErrorMessage", () => {
  return function MockedErrorMessage() {
    return <div data-testid="mocked-error-message">Mocked Error Message</div>;
  };
});

jest.mock("../RegistrationFormFields", () => {
  return function MockedRegistrationFormFields({ onSuccess, setError }) {
    return (
      <div data-testid="mocked-registration-form-fields">
        <button onClick={onSuccess}>Trigger Success</button>
        <button onClick={() => setError("An error occurred.")}>
          Trigger Error
        </button>
      </div>
    );
  };
});

jest.mock("../SuccessMessage", () => {
  return function MockedSuccessMessage({ open, onClose }) {
    return (
      <div data-testid="mocked-success-message">
        {open ? "Success Dialog Open" : "Success Dialog Closed"}
        <button onClick={onClose}>Close Success Dialog</button>
      </div>
    );
  };
});

describe("RegistrationForm component", () => {
  it("renders and contains child components", () => {
    render(<RegistrationForm />);
    expect(screen.getByTestId("form-container")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-error-message")).toBeInTheDocument();
    expect(
      screen.getByTestId("mocked-registration-form-fields")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mocked-success-message")).toBeInTheDocument();
  });

  it("displays success dialog when onSuccess is triggered", () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByText("Trigger Success"));
    expect(screen.getByText("Success Dialog Open")).toBeInTheDocument();
  });

  it("closes success dialog when onClose is triggered", () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByText("Trigger Success"));
    fireEvent.click(screen.getByText("Close Success Dialog"));
    expect(screen.getByText("Success Dialog Closed")).toBeInTheDocument();
  });
});
