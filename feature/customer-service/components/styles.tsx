import { Box, styled } from "@mui/material";

export const CircleBox = styled(Box)(({ theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "100%",
  backgroundColor: theme.palette.primary.main,
}));
