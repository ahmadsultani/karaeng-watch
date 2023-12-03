import { Box, Typography, styled } from "@mui/material";

export const DrawerContent = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  gap: "24px",
  maxWidth: "300px",
});

export const FilterSection = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const FilterCheckboxes = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "0 16px",
  justifyContent: "flex-start",
});

export const FilterLabel = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  ["@media (max-width: 1024px)"]: {
    fontSize: "16px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "12px",
  },
});
