import { Box, styled, Button } from "@mui/material";
import { theme } from "@/constants/theme";
import { COLORS } from "@/constants/colors";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: "64px",
  ["@media (max-width: 840px)"]: {
    padding: "24px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
  },
});

export const ProductNameContent = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "left",
  },
});

export const ProductContent = styled(Box)({
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
});

export const ProductNameContentDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "& p": {
    color: theme.palette.secondary.main,
  },
});

export const Quantity = styled(Box)({
  display: "flex",
  width: "fit-content",
  gap: "12px",
  border: "1px solid",
  borderColor: COLORS.grey,
  padding: "8px",
  alignItems: "center",
  height: "fit-content",
});

export const ControlButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  padding: "0",
  color: theme.palette.secondary.main,
  cursor: "pointer",
  minWidth: "24px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

export const Total = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
});

export const TotalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
});

export const CheckoutButton = styled(Button)({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  width: "100%",
  "&:hover": {
    backgroundColor: COLORS.grey,
    boxShadow: "none",
  },
});

export const AddProductButton = styled(Button)({
  backgroundColor: "transparent",
  fontSize: "32px",
  padding: "4px 16px",
  color: COLORS.grey,
  "&:hover, &:active": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  ["@media (max-width: 840px)"]: {
    fontSize: "24px",
  },
  ["@media (max-width: 600px)"]: {
    fontSize: "16px",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid",
    borderColor: theme.palette.secondary.main,
    color: COLORS.grey,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: "1px solid grey",
    fontSize: 14,
  },
}));

export const TableBorderNone = styled(TableCell)({
  borderBottom: "none",
});
