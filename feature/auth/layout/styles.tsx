import { Box, styled } from "@mui/material";

export const AuthWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  width: "100vw",
  overflowX: "hidden",
  padding: "64px",
  backgroundColor: theme.palette.secondary.main,
  ["@media (max-width: 768px)"]: {
    padding: "24px",
  },
}));

export const AuthContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  height: "100%",
  width: "min(100%, 1280px)",
  backgroundColor: "white",
  ["@media (max-width: 1024px)"]: {
    gridTemplateColumns: "1fr",
    width: "min(100%, 600px)",
  },
});

export const AuthContainerSingle = styled(Box)({
  display: "flex",
  height: "100%",
  width: "min(100%, 640px)",
  backgroundColor: "white",
  ["@media (max-width: 1024px)"]: {
    width: "min(100%, 480px)",
  },
});

export const AuthImageContainer = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ["@media (max-width: 1024px)"]: {
    display: "none",
  },
});
