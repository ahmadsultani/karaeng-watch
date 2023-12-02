// CartItem.tsx
import React from "react";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import { TableRow } from "@mui/material";
import { StyledTableCell } from "./styles";
import * as CartCard from "./styles";
import { formatPrice } from "@/utils/formatter";

interface Product {
  image: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  product: Product;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  onIncrease,
  onDecrease,
}) => (
  <TableRow>
    <StyledTableCell>
      <CartCard.ProductNameContent>
        <Image
          src={product.image}
          alt={product.name}
          draggable={false}
          objectFit="contain"
          width={48}
          height={48}
        />
        <CartCard.ProductNameContentDetails>
          <p>{product.name}</p>
          <p>{product.brand}</p>
        </CartCard.ProductNameContentDetails>
      </CartCard.ProductNameContent>
    </StyledTableCell>
    <StyledTableCell align="right">
      <CartCard.ProductContent>
        {formatPrice(product.price)}
      </CartCard.ProductContent>
    </StyledTableCell>
    <StyledTableCell align="right">
      <CartCard.ProductContent>
        <QuantityControl
          quantity={product.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </CartCard.ProductContent>
    </StyledTableCell>
    <StyledTableCell align="right">
      <CartCard.ProductContent>
        {formatPrice(product.price * product.quantity)}
      </CartCard.ProductContent>
    </StyledTableCell>
  </TableRow>
);

export default CartItem;
