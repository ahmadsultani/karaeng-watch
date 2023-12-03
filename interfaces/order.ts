import { IProduct } from "@/interfaces/product";

export type TOrderStatus = "waiting" | "delivered" | "canceled" | "done";

export interface IOrder {
  id: string;
  status: TOrderStatus;
  isReviewed: boolean;
  products: IProduct[];
}
