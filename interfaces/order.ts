import { IProduct } from "@/interfaces/product";
import { IUser } from "./user";

export type TOrderStatus = "waiting" | "delivered" | "canceled" | "done";

export interface IOrder {
  id: string;
  user: IUser;
  status: TOrderStatus;
  isReviewed: boolean;
  products: {
    product: IProduct;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  userID?: string;
}
