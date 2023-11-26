import { COLORS } from "@/constants/colors";
import { theme } from "@/constants/theme";
import { styled, Box, Button } from "@mui/material";

export const Item = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "24px",
  boxShadow: "0px 0px 1px 0px rgba(100, 100, 100, 0.5)",
  gap: "16px",
  ["@media (max-width: 840px)"]: {
    padding: "24px",
    gap: "8px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
    gap: "4px",
  },
});

export const ItemHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const ItemHeaderLogo = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  "& p": {
    marginLeft: "16px",
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
      marginLeft: "8px",
    },
  },
});

export const ItemHeaderStatus = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.primary.main,
  "& .status": {
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
});

export const Content = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export const Product = styled(Box)({
  display: "flex",
  width: "100%",
  gap: "16px",
  "& p": {
    color: theme.palette.primary.main,
  },
});

export const ContentIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100px",
  backgroundColor: theme.palette.primary.main,
});

export const ContentProduct = styled(Box)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
});

export const ContentProductDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "fit-content",
  "& .productName": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
  "& .productBrand": {
    color: theme.palette.secondary.main,
    fontWeight: 400,
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
});

export const ContentProductMore = styled(Box)({
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
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
    ["@media (max-width: 480px)"]: {
      fontSize: "10px",
    },
  },
});

export const ContentProductPrice = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  "& p": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
});

export const Details = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const Total = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  gap: "8px",
  "& .total": {
    color: theme.palette.secondary.main,
    fontWeight: 400,
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
  "& .totalPrice": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    ["@media (max-width: 840px)"]: {
      fontSize: "12px",
    },
  },
});

export const ButtonGroup = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "16px",
  width: "100%",
});

export const ButtonDetail = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 0",
  color: "black",
  border: "2px solid transparent",
  ["@media (max-width: 840px)"]: {
    fontSize: "12px",
    padding: "4px 0",
  },
});

export const ButtonReview = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 16px",
  color: "white",
  ["@media (max-width: 840px)"]: {
    display: "none",
  },
});

export const ButtonOrder = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "8px 16px",
  backgroundColor: "white",
  color: theme.palette.primary.main,
  ["@media (max-width: 840px)"]: {
    display: "none",
  },
});
