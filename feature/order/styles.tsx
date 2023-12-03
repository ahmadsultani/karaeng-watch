import { COLORS } from "@/constants/colors";
import { Box, Tab, styled } from "@mui/material";

export const OrderWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: "1 1 auto",
  padding: "64px",
  gap: "24px",
  backgroundColor: "white",
  ["@media (max-width: 840px)"]: {
    padding: "24px",
    gap: "16px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
    gap: "8px",
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
  backgroundColor: "white",
  ["@media (max-width: 840px)"]: {
    padding: "16px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
  },
});

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "none",
  color: theme.palette.secondary.main,
  borderBottom: `1px solid ${COLORS.lightGrey}`,
  width: "120px",
  ["@media (max-width: 840px)"]: {
    fontSize: "12px",
    width: "80px",
  },
  ["@media (max-width: 480px)"]: {
    fontSize: "12px",
    width: "60px",
  },
}));
