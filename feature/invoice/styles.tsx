import { Box, TableCell, styled, tableCellClasses } from "@mui/material";
import { theme } from "@/constants/theme";
import { COLORS } from "@/constants/colors";

export const Container = styled(Box)({
  padding: "64px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  ["@media (max-width: 768px)"]: {
    padding: "24px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
  },
});

export const DetailsUser = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
});

export const DetailsUserWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  height: "100%",
});

export const DetailsUserTitle = styled(Box)({
  display: "flex",
  "& p": {
    color: COLORS.grey,
    fontWeight: "bold",
  },
});

export const DetailsUserContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
});

export const ProductTitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  width: "100%",
  paddingBottom: "8px",
  borderBottom: "2px solid",
  borderColor: theme.palette.secondary.main,
  "& p": {
    color: COLORS.grey,
    fontWeight: "bold",
  },
});

export const ProductNameContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
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

export const ProductContent = styled(Box)({
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
});

export const TotalPayment = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const MethodPayment = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "8px",
});

export const Payment = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  "& p": {
    fontWeight: 600,
  },
});

export const PaymentText = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const Total = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  gap: "8px",
});
