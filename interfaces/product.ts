import { IBrand } from "./brand";
import { ICategory } from "./category";

export interface IProduct {
  name: string;
  price: number;
  gender?: "Male" | "Female";
  brand: IBrand;
  category: ICategory;
  waterRes?: number;
  typesId: string;
  stock: number;
  movementReference: string;
  braceletMaterial: string;
  caseMaterial: string;
  caseThickness: number;
  height: number;
  width: number;
  thumbnail: string;
  imgGallery: string[];
}
