import { TRole } from "@/interfaces/user";

export type TLoginForm = {
  email: string;
  password: string;
  role?: TRole;
};

export type TSignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

export type TForgotPasswordForm = {
  email: string;
};
