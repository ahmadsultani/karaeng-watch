import { ICart } from "@/interfaces/cart";

export type TCartForm = Omit<
  ICart,
  "id" | "product" | "createdAt" | "updatedAt"
> & {
  productId: string;
};

export type TCartResponse = {
  cart: ICart[];
  totalPrice: number;
  totalSum: number;
};
