import { styled, Box, Button } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  padding: "64px",
  gap: "32px",
  ["@media (max-width: 480px)"]: {
    padding: "64px 24px",
  },
});

export const Image = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  ["@media (max-width: 480px)"]: {
    padding: "none",
  },
});

export const Wrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  aspectRatio: "5/1",
  ["@media (max-width: 840px)"]: {
    aspectRatio: "4/1",
  },
  ["@media (max-width: 480px"]: {
    aspectRatio: "3/2",
  },
});

export const Text = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "24px",
  borderBottom: "1px solid",
  paddingBottom: "32px",
});

export const TextHeading = styled(Box)({
  fontSize: "48px",
  ["@media (max-width: 840px)"]: {
    fontSize: "32px",
  },
  ["@media (max-width: 480px"]: {
    fontSize: "16px",
  },
});

export const TextContent = styled(Box)({
  width: "50%",
  ["@media (max-width: 840px)"]: {
    width: "75%",
  },
  ["@media (max-width: 480px"]: {
    width: "100%",
  },
});

export const Buttons = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const HomeButton = styled(Button)({
  padding: "12px 32px",
  fontSize: "20px",
  ["@media (max-width: 840px)"]: {
    fontSize: "16px",
  },
  ["@media (max-width: 480px"]: {
    fontSize: "12px",
  },
});
