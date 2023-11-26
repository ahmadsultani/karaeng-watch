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
}));

export const HeroContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "36px",
  width: "min(100%, 700px)",
  minWidth: "50%",
});

export const HeroContentText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const HeroImage = styled(Box)({
  position: "relative",
  width: "754px",
  height: "100%",
  objectFit: "cover",
});
