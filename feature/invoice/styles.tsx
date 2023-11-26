import { Box, styled } from "@mui/material";
import { theme } from "@/constants/theme";
import { COLORS } from "@/constants/colors";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: "48px",
  padding: "64px",
});

export const Details = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const DetailsUser = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "24px",
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

export const DetailsCartWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "36px",
});

export const DetailsCart = styled(Box)({
  display: "flex",
  flexDirection: "column",
  //space between
  justifyContent: "space-between",
  gap: "24px",
});

export const DetailsCartTitle = styled(Box)({
  display: "flex",
  "& p": {
    color: COLORS.grey,
    fontWeight: "bold",
  },
});

export const DetailsCartContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
});

export const Product = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
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

export const ProductContent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  width: "100%",
  paddingBottom: "8px",
  borderBottom: "1px solid",
  borderColor: COLORS.grey,
});

export const ProductName = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "left",
  },
});

export const ProductNameContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "left",
  },
});

export const ProductPrice = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
});

export const ProductQty = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
});

export const ProductTotal = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    alignSelf: "center",
  },
});

export const Total = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "8px",
  width: "100%",
  alignItems: "flex-end",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
});

export const TotalContent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  width: "50%",
  paddingBottom: "8px",
});

export const TotalContentTitle = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});

export const TotalContentValue = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});
