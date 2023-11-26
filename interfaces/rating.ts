import { IUser } from "./user";

export interface IRating {
  user: IUser;
  rating: number;
  comment: string;
}
