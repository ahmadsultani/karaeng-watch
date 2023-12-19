import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const DashboardWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const StatCardsWrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "12px",
  ["@media (max-width: 1280px)"]: {
    gridTemplateColumns: "repeat(2,1fr)",
  },
  ["@media (max-width: 500px)"]: {
    gridTemplateColumns: "repeat(1,1fr)",
  },
});

export const TableContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",

  ["@media (max-width: 1280px)"]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
});

export const StatsCardContainer = styled(Box)({
  display: "flex",
  padding: "24px",
  gap: "12px",
  alignItems: "center",
  boxShadow: "0 0 1px 0 rgba(0,0,0,0.4)",
});
