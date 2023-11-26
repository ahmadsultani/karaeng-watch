import { Box, IconButton, Typography, styled } from "@mui/material";

export const ProductCardsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  width: "300px",
  backgroundColor: "white",
  boxShadow: "0px 0px 1px 0px rgba(100, 100, 100, 0.35)",
  cursor: "pointer",
  transition: "200ms ease-in-out",
  color: "black",
  "&:hover": {
    boxShadow: "0px 0px 6px 0px rgba(125, 125, 125, 0.5)",
  },
  ["@media (max-width: 1024px)"]: {
    width: "240px",
    gap: "8px",
    padding: "8px",
  },
  ["@media (max-width: 768px)"]: {
    width: "140px",
    gap: "4px",
  },
});

export const ProductCardText = styled(Typography)({
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  fontSize: "20px",
  textAlign: "center",
  WebkitBoxOrient: "vertical",

  ["@media (max-width: 1024px)"]: {
    fontSize: "16px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "12px",
  },
});

export const FavIcon = styled(IconButton)({
  padding: "8px",
  fontSize: "28px",

  ["@media (max-width: 1024px)"]: {
    padding: "4px",
    fontSize: "24px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "16px",
  },
});
