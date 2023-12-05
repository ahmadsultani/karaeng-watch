import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { login, signinWithGoogle, signup } from "./service";
import { getFirebaseErrorMessage } from "@/utils/getFirebaseErrorMessage";

import { IUser } from "@/interfaces/user";
import { TLoginForm, TSignupForm } from "./types";

import { DEFAULT_ERROR } from "@/constants/errors";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);

  const { mutateAsync: mutateLogin } = useMutation<
    IUser,
    FirebaseError,
    TLoginForm
  >({
    mutationFn: (data) => login(data, data.role),
    retry: 0,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.uid], data);
      Cookies.set("user", JSON.stringify(data));
      toast.dismiss();
      toast.success("Logged in successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(getFirebaseErrorMessage(error.code));
    },
    onMutate: () => {
      setIsLoadingLogin(true);
      toast.loading("Logging in");
    },
    onSettled: () => {
      setIsLoadingLogin(false);
    },
  });

  const { mutateAsync: mutateSignup } = useMutation<
    IUser,
    FirebaseError,
    TSignupForm
  >({
    mutationFn: signup,
    retry: 0,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.uid], data);
      Cookies.set("user", JSON.stringify(data));
      toast.dismiss();
      toast.success("Account created successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(getFirebaseErrorMessage(error.code));
    },
    onMutate: () => {
      setIsLoadingSignup(true);
      toast.loading("Signing Up");
    },
    onSettled: () => {
      setIsLoadingSignup(false);
    },
  });

  const handleSigninWithGoogle = async () => {
    try {
      const user = await signinWithGoogle();
      queryClient.setQueryData(["user", user.uid], user);
      toast.success("Logged in successfully");
      router.push("/");
    } catch (error) {
      toast.error(DEFAULT_ERROR);
    }
  };

  return {
    login: {
      isLoading: isLoadingLogin,
      mutateAsync: mutateLogin,
    },
    signup: {
      isLoading: isLoadingSignup,
      mutateAsync: mutateSignup,
    },
    handleSigninWithGoogle,
  };
};
