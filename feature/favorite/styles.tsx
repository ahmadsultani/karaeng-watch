"use client";
import { styled, Box } from "@mui/material";

export const ProductPageWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "24px",
  padding: "64px",
  flexDirection: "column",
  ["@media (max-width: 1024px)"]: {
    padding: "32px",
    gap: "12px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "16px",
  },
});

export const ProductBoxWrapper = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  padding: "48px 0",
  gap: "64px",
  alignContent: "center",
  alignItems: "center",
  justifyItems: "center",
  justifyContent: "center",
  ["@media (max-width: 1024px)"]: {
    padding: " 0",
    gap: "32px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "0",
    gap: "8px",
  },
});
