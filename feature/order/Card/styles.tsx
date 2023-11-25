import { COLORS } from "@/constants/colors";
import { theme } from "@/constants/theme";
import { styled, Box } from "@mui/material";

export const Item = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "24px",
  boxShadow: "0px 0px 1px 0px rgba(100, 100, 100, 0.5)",
  gap: "16px",
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
  },
});

export const ItemHeaderStatus = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: theme.palette.primary.main,
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
  },
  "& .productBrand": {
    color: theme.palette.secondary.main,
    fontWeight: 400,
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
  "& p": {
    color: COLORS.grey,
    fontWeight: 400,
  },
  "& h3": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
});

export const Button = styled(Box)({
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

export const ButtonDetails = styled(Box)({
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

export const ButtonReview = styled(Box)({
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

export const ButtonOrder = styled(Box)({
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
