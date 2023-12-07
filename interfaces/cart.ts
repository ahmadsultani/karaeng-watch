import { IProduct } from "@/interfaces/product";

export interface ICart {
  id: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
