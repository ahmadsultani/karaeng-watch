import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import * as CartCard from "./Card/styles";
import { EmptyCart } from "./EmptyCart/EmptyCart";
import { CartItem } from "./Card/CardItem";
import { CartTotal } from "./Card/CardTotal";
import { cart } from "../fakeCartData";
import { IProduct } from "@/interfaces/product";

interface CartProps {
  setCartProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const CartTable: React.FC<CartProps> = () => {
  const [cartProducts, updateCartProducts] = React.useState(cart);

  const handleIncrease = (index: number) => {
    updateCartProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1,
      };
      return updatedProducts;
    });
  };

  const handleDecrease = (index: number) => {
    updateCartProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index] = {
          ...updatedProducts[index],
          quantity: updatedProducts[index].quantity - 1,
        };
      }
      return updatedProducts;
    });
  };

  const totalSum = cartProducts.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );

  return (
    <>
      <Box
        component={Paper}
        boxShadow="none"
        width="100%"
        sx={{ overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <CartCard.StyledTableCell>
                <CartCard.ProductContent>Product</CartCard.ProductContent>
              </CartCard.StyledTableCell>
              <CartCard.StyledTableCell align="right">
                <CartCard.ProductContent>Price</CartCard.ProductContent>
              </CartCard.StyledTableCell>
              <CartCard.StyledTableCell>
                <CartCard.ProductContent>Quantity</CartCard.ProductContent>
              </CartCard.StyledTableCell>
              <CartCard.StyledTableCell align="right">
                <CartCard.ProductContent>Total</CartCard.ProductContent>
              </CartCard.StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.length === 0 ? (
              <TableRow>
                <CartCard.TableBorderNone colSpan={4}>
                  <EmptyCart />
                </CartCard.TableBorderNone>
              </TableRow>
            ) : (
              cartProducts.map((product, index) => (
                <CartItem
                  key={index}
                  product={product}
                  onIncrease={() => handleIncrease(index)}
                  onDecrease={() => handleDecrease(index)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <TableBody>
          {cartProducts.length > 0 && <CartTotal totalSum={totalSum} />}
        </TableBody>
      </Box>
    </>
  );
};
