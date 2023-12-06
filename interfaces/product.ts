import { IBrand } from "./brand";

export type MovementType = "quartz" | "manual" | "automatic";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  gender?: "Male" | "Female" | "Unisex";
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
  thumbnail: string;
  imgGallery: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}
