import React from "react";
import { Cart } from "./Cart";
import { CartContainer } from "./styles";

export const Delivered = () => {
  const productCartList = [
    {
      name: "PSR Digital Quartz",
      brand: "Hamilton",
      qty: 1,
      price: 43460000,
      status: "Delivered",
    },
    {
      name: "PSR Digital Quartz",
      brand: "Hamilton",
      qty: 2,
      price: 15210000,
      status: "Delivered",
    },
  ];

  return (
    <CartContainer>
      {productCartList.map((product, index) => (
        <Cart key={index} product={product} />
      ))}
    </CartContainer>
  );
};
