import { theme } from "@/constants/theme";
import { Box, styled } from "@mui/material";
import { COLORS } from "@/constants/colors";

export const OrderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "64px",
  backgroundColor: "white",
  ["@media (max-width: 768px)"]: {
    padding: "24px",
  },
});

export const CartContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  backgroundColor: "white",
  gap: "16px",
});

export const CartItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "24px",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
  gap: "16px",
});

export const CartItemHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const CartItemHeaderLogo = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  "& p": {
    marginLeft: "16px",
  },
});

export const CartItemHeaderStatus = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.primary.main,
});

export const CartContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
});

export const CartProduct = styled(Box)({
  display: "flex",
  width: "100%",
  gap: "16px",
  "& p": {
    color: theme.palette.primary.main,
  },
});

export const CartContentIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100px",
  backgroundColor: theme.palette.primary.main,
});

export const CartContentProduct = styled(Box)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
});

export const CartContentProductDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "fit-content",
  "& .productName": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  "& .productBrand": {
    color: theme.palette.secondary.main,
    fontWeight: 400,
  },
});

export const CartContentProductMore = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  gap: "16px",
  marginTop: "16px",
  "& .productMore": {
    color: COLORS.grey,
    fontWeight: 400,
  },
});

export const CartContentProductPrice = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
});

export const CartDetails = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const CartTotal = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  gap: "8px",
  "& p": {
    color: COLORS.grey,
    fontWeight: 400,
  },
  "& h3": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
});

export const CartButton = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "16px",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
});

export const CartButtonDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 0",
  border: "2px solid transparent",
  "&:hover": {
    cursor: "pointer",
  },
});

export const CartButtonReview = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 16px",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "4px",
  "&:hover": {
    cursor: "pointer",
  },
});

export const CartButtonOrder = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 16px",
  backgroundColor: "white",
  border: "2px solid",

  color: theme.palette.primary.main,
  borderRadius: "4px",
  "&:hover": {
    cursor: "pointer",
  },
});
