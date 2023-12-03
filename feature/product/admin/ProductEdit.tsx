"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TProductForm, getOneProduct, updateProduct } from "..";
import { Form } from "./Form";

export const ProductEdit = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
    enabled: !!id,
  });

  const { control, handleSubmit } = useForm<TProductForm>({
    values: {
      name: data?.name || "",
      price: data?.price || 0,
      description: data?.description || "",
      braceletMaterial: data?.braceletMaterial || "",
      caseMaterial: data?.caseMaterial || "",
      caseThickness: data?.caseThickness || 0,
      brandId: data?.brand?.id || "",
      height: data?.height || 0,
      width: data?.width || 0,
      movementReference: data?.movementReference || "",
      types: data?.types || "automatic",
      waterResistance: data?.waterResistance || 0,
      powerReserve: data?.powerReserve || 0,
      rating: data?.rating || 0,
      stock: data?.stock || 0,
      thumbnail: data?.thumbnail || "",
      gender: data?.gender || "Male",
      imgGallery: data?.imgGallery || [],
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["product"],
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product edited");
      router.push("/admin/product");
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutateAsync({ id, product: data }))}
      noValidate
    >
      <Form control={control} type="edit" />
    </form>
  );
};

export default ProductEdit;
