import { Box, styled } from "@mui/material";

export const OrderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  padding: "64px",
  backgroundColor: "white",
  ["@media (max-width: 768px)"]: {
    padding: "24px",
  },
});
