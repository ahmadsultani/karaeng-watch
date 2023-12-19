import { IBrand } from "./brand";

export type MovementType = "quartz" | "manual" | "automatic";
export type TGender = "male" | "female" | "unisex";
export interface IProduct {
  id: string;
  name: string;
  price: number;
  gender: TGender;
  brand: IBrand;
  types: MovementType;
  rating: number;
  stock: number;
  movementReference: string;
  braceletMaterial: string;
  powerReserve: number;
  waterResistance: number;
  caseMaterial: string;
  caseThickness: number;
  height: number;
  width: number;
  imgGallery: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  sold: number;
}
