import { Box, Typography } from "@mui/material";
import NoProduct from "@/public/icons/emptycart.svg";
import Image from "next/image";
import { AddProductButton } from "../Card/styles";
import { COLORS } from "@/constants/colors";

export const EmptyCart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "48px",
        gap: "24px",
      }}
    >
      <Typography
        fontSize={24}
        sx={{ textAlign: "center", color: COLORS.grey }}
      >
        Your cart is empty
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image src={NoProduct} alt="empty cart" />
      </Box>
      <AddProductButton href="/product">+ Start Shopping</AddProductButton>
    </Box>
  );
};
