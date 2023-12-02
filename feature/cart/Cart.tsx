"use client";

import { CartTable } from "./Table/Table";
import { Container } from "./Table/Card/styles";

export const Cart = () => {
  return (
    <Container>
      <CartTable setCartProducts={Cart} />
    </Container>
  );
};
