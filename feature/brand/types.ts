import { IBrand } from "@/interfaces/brand";

export type TBrandParams = Partial<IBrand> & {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  sortBy?: string;
};

export type TBrandForm = Omit<
  IBrand,
  "id" | "createdAt" | "updatedAt" | "brand"
>;

export type TBrandUpdateParams = {
  id: string;
  brand: TBrandForm;
};
