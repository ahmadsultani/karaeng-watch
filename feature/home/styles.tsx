import { Box, styled } from "@mui/material";

export const HeroWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  padding: "64px",
  gap: "64px",
  backgroundColor: theme.palette.secondary.main,
  ["@media (max-width: 1024px)"]: {
    paddingInline: "32px",
  },
  ["@media (max-width: 768px)"]: {
    paddingInline: "24px",
  },
}));

export const HeroContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "36px",
  fontSize: "18px",
  width: "min(100%, 600px)",
  minWidth: "40%",
  ["@media (max-width: 1440px)"]: {
    gap: "24px",
    fontSize: "14px",
  },
  ["@media (max-width: 1024)"]: {
    gap: "16px",
    fontSize: "12px",
  },
});

export const HeroContentText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  "& h1": {
    fontSize: "64px",
    fontWeight: "500",
  },
  "& p": {
    fontSize: "16px",
  },
  ["@media (max-width: 1440px)"]: {
    gap: "16px",
    "& h1": {
      fontSize: "36px",
    },
    "& p": {
      fontSize: "14px",
    },
  },
  ["@media (max-width: 1024px)"]: {
    "& h1": {
      fontSize: "32px",
    },
    "& p": {
      fontSize: "12px",
    },
  },
  ["@media (max-width: 768px)"]: {
    "& h1": {
      fontSize: "28px",
    },
    "& p": {
      fontSize: "12px",
    },
  },
});

export const HeroImage = styled(Box)({
  position: "relative",
  width: "754px",
  height: "100%",
  aspectRatio: "auto",
  objectFit: "cover",
});

export const HighlightWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "64px",
});
