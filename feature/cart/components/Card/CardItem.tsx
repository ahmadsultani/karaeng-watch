// CartItem.tsx
import React, { useState } from "react";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import { Box, TableRow } from "@mui/material";
import { StyledTableCell } from "./styles";
import * as CartCard from "./styles";
import { formatPrice } from "@/utils/formatter";
import { IProduct } from "@/interfaces/product";
import { Modal } from "@/components/Modal";

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
}) => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  return (
    <>
      <TableRow>
        <StyledTableCell>
          <CartCard.ProductNameContent>
            <Box width={48} height={48} position={"relative"}>
              <Image
                loader={() => product.imgGallery[0]}
                src={
                  (product?.imgGallery?.length && product.imgGallery[0]) || ""
                }
                alt={product.name}
                draggable={false}
                objectFit="contain"
                fill
              />
            </Box>
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
              onDecrease={
                quantity === 1 ? () => setIsOpenModalDelete(true) : onDecrease
              }
            />
          </CartCard.ProductContent>
        </StyledTableCell>
        <StyledTableCell align="right">
          <CartCard.ProductContent>
            {formatPrice(product.price * quantity)}
          </CartCard.ProductContent>
        </StyledTableCell>
      </TableRow>

      <Modal
        type="delete"
        isOpen={isOpenModalDelete}
        onClose={() => setIsOpenModalDelete(false)}
        title="Delete Product"
        onComplete={onDecrease}
      >
        Are you sure want to delete this product from cart?
      </Modal>
    </>
  );
};

export default CartItem;
