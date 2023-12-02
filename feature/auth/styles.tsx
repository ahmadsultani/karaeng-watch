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

export const AuthForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "36px",
  padding: "72px",
  height: "100%",
  width: "100%",
  ["@media (max-width: 1024px)"]: {
    padding: "24px",
    gap: "24px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "24px 16px",
  },
});

export const AuthInputGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
});

export const AuthButtonGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "8px",
});

export const DividerLine = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "1px",
  backgroundColor: theme.palette.secondary.main,
}));

export const AuthImageContainer = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ["@media (max-width: 1024px)"]: {
    display: "none",
  },
});
