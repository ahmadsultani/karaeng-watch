"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { useProduct, TProductForm } from ".";
import { getOneProduct } from "./service";

import { Form } from "./components/Form";

export const ProductEdit = () => {
  const { id } = useParams() as { id: string };

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
    enabled: !!id,
  });

  const { mutateUpdateProduct } = useProduct();

  const { control, handleSubmit } = useForm<TProductForm>({
    defaultValues: {
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
      gender: data?.gender || "male",
      imgGallery: data?.imgGallery || [],
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutateUpdateProduct({ id, product: data }),
      )}
      noValidate
    >
      <Form control={control} type="edit" />
    </form>
  );
};

export default ProductEdit;
