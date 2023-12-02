import React from "react";
import { TableRow } from "@mui/material";
import { TableBorderNone } from "./styles";
import * as CartCard from "./styles";
import { formatPrice } from "@/utils/formatter";

interface CartTotalProps {
  totalSum: number;
}

export const CartTotal: React.FC<CartTotalProps> = ({ totalSum }) => (
  <TableRow>
    <TableBorderNone colSpan={2}></TableBorderNone>
    <TableBorderNone colSpan={2}>
      <CartCard.TotalContent>
        <CartCard.Total>
          <p>Grand Total:</p>
          <p>{formatPrice(totalSum)}</p>
        </CartCard.Total>
        <CartCard.CheckoutButton>Checkout</CartCard.CheckoutButton>
      </CartCard.TotalContent>
    </TableBorderNone>
  </TableRow>
);
