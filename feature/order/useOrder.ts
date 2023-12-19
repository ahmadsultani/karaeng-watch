import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkout, updateOrderStatus } from "./service";
import { DEFAULT_ERROR } from "@/constants/errors";
import { useRouter } from "next/navigation";
import { TOrderStatus } from "@/interfaces/order";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutateAsync: mutateCheckout } = useMutation({
    mutationKey: ["order"],
    mutationFn: checkout,
    onMutate: () => {
      toast.loading("Creating your order...");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || DEFAULT_ERROR);
    },
    onSuccess: (id) => {
      toast.dismiss();
      toast.success("Thanks for your order!");
      router.push(`/order/${id}`);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "cart" ||
            query.queryKey[0] === "order" ||
            query.queryKey[0] === "product" ||
            query.queryKey[0] === "order-chart"
          );
        },
      });
    },
  });

  const { mutateAsync: mutateUpdateOrderStatus } = useMutation<
    void,
    Error,
    { id: string; status: TOrderStatus }
  >({
    mutationKey: ["order"],
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "order" || query.queryKey[0] === "order-chart"
          );
        },
      });
      toast.success("Order status updated");
    },
  });

  return {
    mutateCheckout,
    mutateUpdateOrderStatus,
  };
};
