import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "./service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DEFAULT_ERROR } from "@/constants/errors";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutateAsync: mutateCreateProduct } = useMutation({
    mutationKey: ["product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product created");
      router.push("/admin/product");
    },
    onError: (error) => {
      toast.error(error?.message || DEFAULT_ERROR);
    },
    onMutate: () => {
      toast.loading("Creating...");
    },
  });

  const { mutateAsync: mutateUpdateProduct } = useMutation({
    mutationKey: ["product"],
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product edited");
      router.push("/admin/product");
    },
    onError: (error) => {
      toast.error(error?.message || DEFAULT_ERROR);
    },
    onMutate: () => {
      toast.loading("Saving changes...");
    },
  });

  return {
    mutateCreateProduct,
    mutateUpdateProduct,
  };
};
