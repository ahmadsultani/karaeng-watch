// CartItem.tsx
import React from "react";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import { TableRow } from "@mui/material";
import { StyledTableCell } from "./styles";
import * as CartCard from "./styles";
import { formatPrice } from "@/utils/formatter";
import { IProduct } from "@/interfaces/product";

interface CartItemProps {
  product: IProduct;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  quantity,
  product,
  onIncrease,
  onDecrease,
}) => (
  <TableRow>
    <StyledTableCell>
      <CartCard.ProductNameContent>
        <Image
          src={product.thumbnail}
          alt={product.name}
          draggable={false}
          objectFit="contain"
          width={48}
          height={48}
        />
        <CartCard.ProductNameContentDetails>
          <p>{product.name}</p>
          <p>{product.brand.name}</p>
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
          quantity={quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </CartCard.ProductContent>
    </StyledTableCell>
    <StyledTableCell align="right">
      <CartCard.ProductContent>
        {formatPrice(product.price * quantity)}
      </CartCard.ProductContent>
    </StyledTableCell>
  </TableRow>
);

export default CartItem;
