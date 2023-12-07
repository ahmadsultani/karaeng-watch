"use client";

import { CartTable } from "./components/Table";
import { Container } from "./components/Card/styles";
import { Box, CircularProgress, TableBody, Typography } from "@mui/material";
import { CartTotal } from "./components/Card/CardTotal";
import { useQuery } from "@tanstack/react-query";
import { getAllCart } from "./service";
import { EmptyWrapper } from "@/components/Wrapper/styles";

export const Cart = () => {
  const {
    data: cart,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
  });

  return (
    <Container>
      {isLoadingCart ? (
        <EmptyWrapper>
          <CircularProgress />
        </EmptyWrapper>
      ) : isErrorCart ? (
        <EmptyWrapper>
          <Typography>{error.message}</Typography>
        </EmptyWrapper>
      ) : (
        <>
          <CartTable data={cart?.cart} />
          {cart?.cart && cart.cart.length > 0 && (
            <Box width="100%" display="flex" justifyContent="flex-end">
              <TableBody>
                <CartTotal totalSum={cart?.totalPrice || 0} />
              </TableBody>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
