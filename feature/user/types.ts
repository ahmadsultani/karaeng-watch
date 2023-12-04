import { IUser } from "@/interfaces/user";

export type TUserParams = Partial<IUser> & {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  sortBy?: string;
};

export type TUserForm = Omit<
  IUser,
  "uid" | "createdAt" | "updatedAt" | "brand"
>;

export type TUserUpdateParams = {
  uid: string;
  user: TUserForm;
};
