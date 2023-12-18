import { IOrder } from "@/interfaces/order";

export type TOrderForm = Omit<IOrder, "id" | "createdAt" | "updatedAt">;
