"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { TBrandForm, getOneBrand, updateBrand } from ".";
import { BrandForm } from "./components/BrandForm";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const BrandEdit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data } = useQuery({
    queryKey: ["brand", id],
    queryFn: () => getOneBrand(id),
    enabled: !!id,
  });

  const { control, handleSubmit, setValue } = useForm<TBrandForm>({
    defaultValues: {
      name: data?.name || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["brand"],
    mutationFn: updateBrand,
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Brand edited");
      router.push("/admin/brand");
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
    onMutate: () => {
      toast.loading("Saving changes...");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutateAsync({ id, brand: data }))}
      noValidate
    >
      <BrandForm
        control={control}
        type="edit"
        setValue={setValue}
        brand={data}
      />
    </form>
  );
};

export default BrandEdit;
