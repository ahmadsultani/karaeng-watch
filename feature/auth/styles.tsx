import { Box, TextField, styled } from "@mui/material";

export const AuthForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "36px",
  padding: "72px",
  height: "100%",
  width: "100%",
  ["@media (max-width: 1024px)"]: {
    padding: "24px",
    gap: "24px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "24px 16px",
  },
});

export const AuthInputGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
});

export const StyledTextField = styled(TextField)({
  '& input[type="password"]': {
    "-webkit-text-security": "disc" /* For WebKit (Safari, Chrome) */,
    "text-security": "disc" /* For Firefox */,
  },
});

export const AuthButtonGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "8px",
});
