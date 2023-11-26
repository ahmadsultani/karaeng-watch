import { styled, Box } from "@mui/material";
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
