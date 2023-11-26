"use client";
import { styled, Box, Typography } from "@mui/material";

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

export const TitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  ["@media (max-width: 1024px)"]: {
    gap: "8px",
  },
  ["@media (max-width: 768px)"]: {
    gap: "0px",
  },
});

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
