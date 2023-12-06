import { IProduct, MovementType } from "@/interfaces/product";

export type TProductParams = {
  type?: MovementType;
  gender?: "male" | "female";
  price_lte?: number;
  price_gte?: number;
  brandId?: string;
};

export type TProductForm = Omit<
  IProduct,
  "id" | "createdAt" | "updatedAt" | "brand"
> & {
  brandId: string;
};

export type TProductUpdateParams = {
  id: string;
  product: TProductForm;
};
