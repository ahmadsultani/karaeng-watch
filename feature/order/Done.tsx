import React from "react";
import { Cart } from "./Cart/Cart";
import { CartContainer } from "./styles";

export const Done = () => {
  const CartList = [
    {
      id: 1,
      status: "Done",
      review: true,
      order: true,
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
      status: "Done",
      review: true,
      order: true,
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
