"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TProductForm, createProduct } from "..";
import { Form } from "../components/Form";

export const ProductCreate = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<TProductForm>();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product created");
      router.push("/admin/product");
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
    onMutate: () => {
      toast.loading("Creating...");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutateAsync(data))} noValidate>
      <Form control={control} />
    </form>
  );
};

export default ProductCreate;
