"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TBrandForm, createBrand } from ".";
import { BrandForm } from "./components/BrandForm";

export const BrandCreate = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<TBrandForm>();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["brand"],
    mutationFn: createBrand,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Brand created");
      router.push("/admin/brand");
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
      <BrandForm control={control} />
    </form>
  );
};

export default BrandCreate;
