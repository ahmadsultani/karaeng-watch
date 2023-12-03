import { Box, Typography, styled } from "@mui/material";

export const FormSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "20px",
});

export const FormSectionHeader = styled(Typography)({
  color: "black",
  fontSize: "24px",
  fontWeight: 700,
});

export const FormSectionBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const FormSectionRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "16px",
  width: "100%",
  "& > *": {
    userSelect: "none",
  },
});
