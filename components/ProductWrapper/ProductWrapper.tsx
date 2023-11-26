"use client";

import { ProductBoxWrapper } from "./styles";

interface ProductWrapperProps {
  children: React.ReactNode;
}

export const ProductWrapper: React.FC<ProductWrapperProps> = ({ children }) => {
  return <ProductBoxWrapper>{children}</ProductBoxWrapper>;
};
