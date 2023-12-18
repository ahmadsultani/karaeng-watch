"use client";

import { useForm } from "react-hook-form";
import { TProductForm, useProduct } from ".";
import { Form } from "./components/Form";

export const ProductCreate = () => {
  const { control, handleSubmit, setValue } = useForm<TProductForm>();

  const { mutateCreateProduct } = useProduct();

  return (
    <form
      onSubmit={handleSubmit((data) => mutateCreateProduct(data))}
      noValidate
    >
      <Form control={control} setValue={setValue} />
    </form>
  );
};

export default ProductCreate;
