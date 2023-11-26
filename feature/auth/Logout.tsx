"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./service";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const Logout: React.FC = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: logout,
    retry: 0,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logout succeed, see you!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    mutateAsync();
  }, []);

  return redirect("/login");
};
