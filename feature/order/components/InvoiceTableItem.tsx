// InvoiceTableItem.tsx
import React from "react";
import { TableRow, Typography } from "@mui/material";
import { StyledTableCell } from "./styles";
import * as CartCard from "./styles";
import { formatPrice } from "@/utils/formatter";
import { IProduct } from "@/interfaces/product";

interface InvoiceTableItemProps {
  product: IProduct;
  quantity: number;
}

export const InvoiceTableItem: React.FC<InvoiceTableItemProps> = ({
  quantity,
  product,
}) => (
  <TableRow>
    <StyledTableCell>
      <CartCard.ProductNameContent>
        <CartCard.ProductNameContentDetails>
          <p>{product.name}</p>
          <p>{product.brand.name}</p>
        </CartCard.ProductNameContentDetails>
      </CartCard.ProductNameContent>
    </StyledTableCell>
    <StyledTableCell>
      <CartCard.ProductContent>
        {formatPrice(product.price)}
      </CartCard.ProductContent>
    </StyledTableCell>
    <StyledTableCell>
      <CartCard.ProductContent>
        <Typography>{quantity}</Typography>
      </CartCard.ProductContent>
    </StyledTableCell>
    <StyledTableCell>
      <CartCard.ProductContent>
        {formatPrice(product.price * quantity)}
      </CartCard.ProductContent>
    </StyledTableCell>
  </TableRow>
);

export default InvoiceTableItem;
