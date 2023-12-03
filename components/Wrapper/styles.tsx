import { Box, styled } from "@mui/material";

export const EmptyWrapper = styled(Box)({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
});

export const AdminWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
});
