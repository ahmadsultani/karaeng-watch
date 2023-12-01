import { Box, Button, Input, Typography, styled } from "@mui/material";

export const ProfileWrapper = styled(Box)({
  padding: "32px 64px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",

  ["@media (max-width: 1024px)"]: {
    padding: "16px 32px",
    gap: "12px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "8px 16px",
    gap: "6px",
  },
});

export const ProfileItemContainer = styled(Box)({
  padding: "0 16px",
  gap: "16px",
  display: "flex",
  flexDirection: "column",
});

export const ProfileTextHeader = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
});

export const ProfileItems = styled(Box)({
  display: "flex",
  gap: "16px",
  padding: "12px 0",
  height: "max-content",
  alignItems: "center",
  ["@media (max-width: 1024px)"]: {
    gap: "8px",
  },
  ["@media (max-width: 768px)"]: {
    gap: "0px",
  },
});

export const ProfileLabel = styled(Typography)({
  fontSize: "20px",
  minWidth: "150px",
  fontWeight: "400",
  ["@media (max-width: 1024px)"]: {
    fontSize: "18px",
    minWidth: "120px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "16px",
    minWidth: "100px",
  },
});

export const ProfileContent = styled(Input)({
  fontSize: "20px",
  color: "gray",
  width: "100%",
  fontWeight: "300",
  ["@media (max-width: 1024px)"]: {
    fontSize: "18px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "16px",
  },
});

export const SaveButton = styled(Button)({
  padding: "8px 32px",
  ["@media (max-width: 1024px)"]: {},
  ["@media (max-width: 768px)"]: {
    width: "100%",
  },
});

export const CustomerService = styled(Button)({
  padding: "8px 32px",
  ["@media (max-width: 1024px)"]: {},
  ["@media (max-width: 768px)"]: {
    width: "100%",
  },
});
