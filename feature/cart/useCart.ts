import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "./service";

import { DEFAULT_ERROR } from "@/constants/errors";

import toast from "react-hot-toast";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateCart } = useMutation({
    mutationKey: ["cart"],
    mutationFn: addToCart,
    onMutate: () => {
      toast.loading("Adding to cart...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || DEFAULT_ERROR);
    },
  });

  return {
    mutateCart,
  };
};
