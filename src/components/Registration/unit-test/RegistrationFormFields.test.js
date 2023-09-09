import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RegistrationFormFields from "../RegistrationFormFields";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

// Mock Firebase database after initializing Firebase
jest.mock("firebase/database", () => {
  const originalModule = jest.requireActual("firebase/database");
  return {
    __esModule: true,
    ...originalModule,
    get: jest.fn(),
  };
});

describe("RegistrationFormFields", () => {
  beforeEach(() => {
    const { get } = require("firebase/database");
    get.mockReset();
  });

  it("renders email, password, confirm password fields, and a register button", async () => {
    render(<RegistrationFormFields />);

    const emailField = screen.getByTestId("email-input").querySelector("input");
    const passwordField = screen
      .getByTestId("password-input")
      .querySelector("input");
    const confirmPasswordField = screen
      .getByTestId("password-input-confirm")
      .querySelector("input");
    const registerButton = screen.getByTestId("register-button");

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("validates the email format", async () => {
    render(<RegistrationFormFields />);

    const emailField = screen.getByTestId("email-input").querySelector("input");
    fireEvent.change(emailField, { target: { value: "invalid-email" } });

    const passwordField = screen
      .getByTestId("password-input")
      .querySelector("input");
    const confirmPasswordField = screen
      .getByTestId("password-input-confirm")
      .querySelector("input");

    fireEvent.change(passwordField, { target: { value: "test12" } });
    fireEvent.change(confirmPasswordField, { target: { value: "testy12" } });

    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Invalid email/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("validates password mismatch", async () => {
    render(<RegistrationFormFields />);

    const emailField = screen.getByTestId("email-input").querySelector("input");
    const passwordField = screen
      .getByTestId("password-input")
      .querySelector("input");
    const confirmPasswordField = screen
      .getByTestId("password-input-confirm")
      .querySelector("input");

    fireEvent.change(emailField, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordField, { target: { value: "testy" } });
    fireEvent.change(confirmPasswordField, { target: { value: "testy2" } });

    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Passwords do not match/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("validates password length", async () => {
    render(<RegistrationFormFields />);

    const emailField = screen.getByTestId("email-input").querySelector("input");
    const passwordField = screen
      .getByTestId("password-input")
      .querySelector("input");
    const confirmPasswordField = screen
      .getByTestId("password-input-confirm")
      .querySelector("input");

    fireEvent.change(emailField, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordField, { target: { value: "test" } });
    fireEvent.change(confirmPasswordField, { target: { value: "test" } });

    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        /Password must be at least 6 characters long./
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("validates non-unique email", async () => {
    const { get } = require("firebase/database");
    get.mockResolvedValueOnce({ exists: () => true });

    render(<RegistrationFormFields />);

    const emailField = screen.getByTestId("email-input").querySelector("input");
    fireEvent.change(emailField, { target: { value: "test@gmail.com" } });

    const passwordField = screen
      .getByTestId("password-input")
      .querySelector("input");
    const confirmPasswordField = screen
      .getByTestId("password-input-confirm")
      .querySelector("input");

    fireEvent.change(passwordField, { target: { value: "test12" } });
    fireEvent.change(confirmPasswordField, { target: { value: "test12" } });

    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Email already exists/);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
