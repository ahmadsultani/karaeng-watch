import { Box, styled } from "@mui/material";

export const ReviewCardWrapper = styled(Box)({
  padding: "12px",
  gap: "24px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  ["@media (max-width: 1024px)"]: {
    gap: "12px",
    padding: "8px",
  },
  ["@media (max-width: 768px)"]: {
    gap: "4px",
  },
});
