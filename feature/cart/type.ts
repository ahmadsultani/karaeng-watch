import { ICart } from "@/interfaces/cart";

export type TCartForm = Omit<
  ICart,
  "id" | "product" | "createdAt" | "updatedAt"
> & {
  productId: string;
};

export type TOrderResponse = {
  cart: ICart[];
  totalPrice: number;
  totalSum: number;
};
