import { Typography } from "@mui/material";

const ErrorMessage = ({ error }) => {
  if (error) {
    return (
      <Typography color="error" style={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }
  return null;
};

export default ErrorMessage;
