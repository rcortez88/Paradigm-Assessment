import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { getDatabase, ref, set, get } from "firebase/database";
import { VALIDATION_ERRORS, ERROR_TYPES, DB_PATCH } from "../../constants";
import bcrypt from "bcryptjs";

const RegistrationFormFields = ({ onSuccess, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({
    field: "",
    text: "",
  });

  const {
    EMAIL,
    PASSWORD,
    INVALID_FORMAT,
    MISMATCH,
    WRONG_LENGTH,
    NOT_UNIQUE,
  } = ERROR_TYPES;

  const handleValidation = (field, text) => {
    setValidationError({ field, text });
  };

  const clearValidation = () => {
    setValidationError({ field: "", text: "" });
  };

  const validateForm = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      handleValidation(EMAIL, INVALID_FORMAT);
      return false;
    }

    if (password !== confirmPassword) {
      handleValidation(PASSWORD, MISMATCH);
      return false;
    }

    if (password.length < 6) {
      handleValidation(PASSWORD, WRONG_LENGTH);
      return false;
    }

    const db = getDatabase();
    const emailRef = ref(db, DB_PATCH + btoa(email));
    const snapshot = await get(emailRef);

    if (snapshot.exists()) {
      handleValidation(EMAIL, NOT_UNIQUE);
      return false;
    }

    clearValidation();
    return true;
  };

  const registerUser = async () => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      if (!salt) {
        throw new Error("Salt generation failed.");
      }

      const hashedPassword = await bcrypt.hash(password, salt);

      if (!hashedPassword) {
        throw new Error("Password hashing failed.");
      }

      const db = getDatabase();
      const userRef = ref(db, DB_PATCH + btoa(email));

      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        throw new Error("User already exists.");
      }

      await set(userRef, {
        email,
        password: hashedPassword,
      });

      onSuccess();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Error registering user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (!(await validateForm())) {
      setLoading(false);
      return;
    }

    registerUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" align="center">
        Register
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={validationError.field === EMAIL}
        helperText={
          validationError.field === EMAIL &&
          VALIDATION_ERRORS[validationError.field][validationError.text]
        }
        data-testid="email-input"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={validationError.field === PASSWORD}
        helperText={
          validationError.field === PASSWORD &&
          VALIDATION_ERRORS[validationError.field][validationError.text]
        }
        data-testid="password-input-confirm"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        data-testid="register-button">
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegistrationFormFields;
