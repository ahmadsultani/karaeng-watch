export type TRole = "user" | "admin" | "super-admin";

export interface IUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string | null;
  role: TRole;
  emailVerified: boolean;
  address?: string;
  birthDate?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}
