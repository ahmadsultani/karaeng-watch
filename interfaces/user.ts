export type TRole = "user" | "admin" | "super-admin";

export interface IUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string | null;
  role: TRole;
  createdAt: string;
  updatedAt: string;
}
