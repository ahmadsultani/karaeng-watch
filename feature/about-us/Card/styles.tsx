import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
});

export const Image = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const Name = styled(Box)({
  fontSize: "24px",
  color: "black",
});

export const Role = styled(Box)({
  fontSize: "18px",
  color: "black",
});
