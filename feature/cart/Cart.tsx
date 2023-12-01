"use client";

import * as CartCard from "./styles";
import { useState } from "react";
import { Card } from "./Card/Card";
import { cart } from "./fakeCartData";

const initialCart = cart;
export const Cart = () => {
  const [cartProducts, setCartProducts] = useState(initialCart);

  return (
    <CartCard.Container>
      <Card cartProducts={cartProducts} setCartProducts={setCartProducts} />
    </CartCard.Container>
  );
};
