import React from "react";
import { Cart } from "./Cart/Cart";
import { CartContainer } from "./styles";

export const Waiting = () => {
  const CartList = [
    {
      id: 1,
      status: "Waiting",
      review: false,
      order: false,
      product: [
        {
          name: "Cart 1 First Item",
          brand: "Hamilton",
          price: 43460000,
        },
        {
          name: "Second Item",
          brand: "Hamilton",
          price: 43460000,
        },
        {
          name: "Third Item",
          brand: "Hamilton",
          price: 43460000,
        },
      ],
    },
    {
      id: 2,
      status: "Waiting",
      review: false,
      order: false,
      product: [
        {
          name: "Cart 2 First Item",
          brand: "Hamilton",
          price: 43460000,
        },
        {
          name: "Second Item",
          brand: "Hamilton",
          price: 43460000,
        },
      ],
    },
  ];

  return (
    <CartContainer>
      {CartList.map((cart, index) => (
        <Cart key={index} cart={cart} />
      ))}
    </CartContainer>
  );
};
