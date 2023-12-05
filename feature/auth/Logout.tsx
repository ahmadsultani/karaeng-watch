"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./service";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { IUser } from "@/interfaces/user";

export const Logout: React.FC = () => {
  const queryClient = useQueryClient();
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;

  const { mutateAsync } = useMutation({
    mutationFn: logout,
    retry: 0,
    onSuccess: () => {
      queryClient.setQueryData(["user", user.uid], null);
      Cookies.remove("user");
      toast.success("Logout succeed, see you!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  return redirect("/login");
};
