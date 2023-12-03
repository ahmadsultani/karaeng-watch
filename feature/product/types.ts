import { IProduct } from "@/interfaces/product";

export type TProductParams = Partial<IProduct> & {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  sortBy?: string;
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
