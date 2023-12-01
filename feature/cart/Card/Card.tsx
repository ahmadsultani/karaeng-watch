import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import QuantityControl from "../QuantityControl";
import Image from "next/image";
import { EmptyCart } from "./EmptyCart/EmptyCart";
import * as CartCard from "../styles";
import { COLORS } from "@/constants/colors";
import { Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid",
    borderColor: theme.palette.secondary.main,
    color: COLORS.grey,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: "1px solid grey",
    fontSize: 14,
  },
}));

const TableBorderNone = styled(TableCell)({
  borderBottom: "none",
});

interface Product {
  image: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

interface CardProps {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const Card: React.FC<CardProps> = ({
  cartProducts,
  setCartProducts,
}) => {
  const handleIncrease = (index: number) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1,
      };
      return updatedProducts;
    });
  };

  const handleDecrease = (index: number) => {
    setCartProducts((prevProducts) => {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const totalSum = cartProducts.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );

  return (
    <Box
      component={Paper}
      boxShadow="none"
      width="100%"
      sx={{ overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <CartCard.ProductContent>Product</CartCard.ProductContent>
            </StyledTableCell>
            <StyledTableCell align="right">
              <CartCard.ProductContent>Price</CartCard.ProductContent>
            </StyledTableCell>
            <StyledTableCell>
              <CartCard.ProductContent>Quantity</CartCard.ProductContent>
            </StyledTableCell>
            <StyledTableCell align="right">
              <CartCard.ProductContent>Total</CartCard.ProductContent>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts.length === 0 ? (
            <TableRow>
              <TableBorderNone colSpan={4}>
                <EmptyCart />
              </TableBorderNone>
            </TableRow>
          ) : (
            cartProducts.map((product, index) => (
              <TableRow key={index}>
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
                      onIncrease={() => handleIncrease(index)}
                      onDecrease={() => handleDecrease(index)}
                    />
                  </CartCard.ProductContent>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <CartCard.ProductContent>
                    {formatPrice(product.price * product.quantity)}
                  </CartCard.ProductContent>
                </StyledTableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableBody>
          {cartProducts.length > 0 && (
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
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
