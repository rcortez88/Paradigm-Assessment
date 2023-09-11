export const VALIDATION_ERRORS = {
  PASSWORD: {
    WRONG_LENGTH: "Password must be at least 6 characters long.",
    MISMATCH: "Passwords do not match.",
  },
  EMAIL: {
    INVALID_FORMAT: "Invalid email format.",
    NOT_UNIQUE: "Email already exists.",
  },
};

export const ERROR_TYPES = {
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  INVALID_FORMAT: "INVALID_FORMAT",
  MISMATCH: "MISMATCH",
  WRONG_LENGTH: "WRONG_LENGTH",
  NOT_UNIQUE: "NOT_UNIQUE",
};

export const DB_PATCH = "users/";

export const mapErrorToMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
