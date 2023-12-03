import { Box, styled } from "@mui/material";

export const EmptyWrapper = styled(Box)({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
});

export const AdminWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
});

export const ProductWrapper = styled(Box)({
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
