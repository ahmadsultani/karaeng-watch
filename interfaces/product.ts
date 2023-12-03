import { IBrand } from "./brand";

export type MovementType = "quartz" | "manual" | "automatic";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  gender?: "Male" | "Female";
  brand: IBrand;
  waterRes?: number;
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
  createdAt: Date;
  updatedAt: Date;
}
