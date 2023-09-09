import React, { useState } from "react";
import { Container, Box, Paper } from "@mui/material";
import RegistrationFormFields from "./RegistrationFormFields";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const RegistrationForm = () => {
  const [error, setError] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleSuccess = () => {
    setOpenSuccessDialog(true);
  };

  return (
    <Box className="centered-container">
      <Container component="main" maxWidth="xs">
        <Paper className="form-container" data-testid="form-container">
          <ErrorMessage error={error} data-testid="error-message" />
          <RegistrationFormFields
            onSuccess={handleSuccess}
            setError={setError}
          />
          <SuccessMessage
            open={openSuccessDialog}
            onClose={() => setOpenSuccessDialog(false)}
            data-testid="success-message"
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
