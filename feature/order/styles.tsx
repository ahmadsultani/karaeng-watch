import { COLORS } from "@/constants/colors";
import { Box, Tab, styled } from "@mui/material";

export const OrderWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "64px",
  gap: "24px",
  backgroundColor: "white",
  ["@media (max-width: 768px)"]: {
    padding: "24px",
  },
});

export const OrderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "24px 16px",
  gap: "16px",
});

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 20,
  fontWeight: "bold",
  textTransform: "none",
  color: theme.palette.secondary.main,
  borderBottom: `1px solid ${COLORS.lightGrey}`,
  width: "160px",
  ["@media (max-width: 768px)"]: {
    fontSize: 16,
    width: "120px",
  },
}));
